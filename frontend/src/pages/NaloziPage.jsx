import { useCallback, useEffect, useState } from 'react';
import { getNalozi } from '../services/nalozi';
import NalogCard from '../components/NalogCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function NaloziPage() {
  const [nalozi, setNalozi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNalozi();
      setNalozi(data);
    } catch (err) {
      console.error(err);
      setError('Ne mogu dohvatiti naloge. Provjeri je li backend pokrenut.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loader text="Učitavanje naloga..." />;
  if (error) return <ErrorMessage message={error} onRetry={load} />;

  return (
    <section>
      <div className="page-header">
        <h1>Nalozi</h1>
        <p className="muted">Ukupno: {nalozi.length}</p>
      </div>

      {nalozi.length === 0 ? (
        <p className="empty">Još nema unesenih naloga.</p>
      ) : (
        <div className="grid">
          {nalozi.map((n) => (
            <NalogCard key={n.id} nalog={n} />
          ))}
        </div>
      )}
    </section>
  );
}
