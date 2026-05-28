import { Link } from 'react-router-dom';

function formatDate(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('hr-HR');
}

export default function NalogCard({ nalog }) {
  const brojUzoraka = nalog.uzorci?.length ?? 0;

  return (
    <Link to={`/nalozi/${nalog.id}`} className="card">
      <div className="card-header">
        <h3>{nalog.brojRadnogNaloga}</h3>
        <span className="badge">{brojUzoraka} uzoraka</span>
      </div>
      <dl className="card-body">
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
    </Link>
  );
}
