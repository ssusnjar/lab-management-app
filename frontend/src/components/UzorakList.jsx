export default function UzorakList({ uzorci }) {
  if (!uzorci || uzorci.length === 0) {
    return <p className="empty">Nalog još nema uzoraka.</p>;
  }

  return (
    <ul className="simple-list">
      {uzorci.map((u) => (
        <li key={u.id} className="uzorak-item">
          <div>
            <strong>{u.laboratorijskaOznaka}</strong>
            <span className="muted"> · {u.lokacija}</span>
          </div>
          {u.ispitivanje ? (
            <span className="badge badge-success">Ispitano</span>
          ) : (
            <span className="badge">Bez ispitivanja</span>
          )}
        </li>
      ))}
    </ul>
  );
}
