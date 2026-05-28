import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getNalog } from '../services/nalozi';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import UzorakList from '../components/UzorakList';
import AddUzorakForm from '../components/AddUzorakForm';

function formatDate(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('hr-HR');
}

export default function NalogDetailPage() {
  const { id } = useParams();
  const nalogId = Number(id);
  const [nalog, setNalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNalog(nalogId);
      setNalog(data);
    } catch (err) {
      console.error(err);
      setError('Ne mogu dohvatiti nalog.');
    } finally {
      setLoading(false);
    }
  }, [nalogId]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;
  if (!nalog) return null;

  return (
    <section>
      <Link to="/" className="back-link">
        ← Natrag na naloge
      </Link>

      <div className="page-header">
        <h1>Nalog {nalog.brojRadnogNaloga}</h1>
      </div>

      <dl className="detail-list">
        <div>
          <dt>Naručitelj</dt>
          <dd>{nalog.narucitelj}</dd>
        </div>
        <div>
          <dt>Gradilište</dt>
          <dd>{nalog.gradiliste}</dd>
        </div>
        <div>
          <dt>Datum</dt>
          <dd>{formatDate(nalog.datum)}</dd>
        </div>
      </dl>

      <div className="section-header">
        <h2>Uzorci</h2>
        <span className="muted">{nalog.uzorci?.length ?? 0}</span>
      </div>

      <UzorakList uzorci={nalog.uzorci} />

      <AddUzorakForm nalogId={nalogId} onCreated={load} />
    </section>
  );
}
