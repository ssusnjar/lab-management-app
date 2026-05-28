export default function Loader({ text = 'Učitavanje...' }) {
  return (
    <div className="loader">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
}
