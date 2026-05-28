export default function ErrorMessage({ message = 'Dogodila se greška.', onRetry }) {
  return (
    <div className="error">
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} type="button">
          Pokušaj ponovno
        </button>
      )}
    </div>
  );
}
