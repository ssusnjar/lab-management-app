import { useState } from 'react';
import { createUzorak } from '../services/uzorci';

const initialState = {
  laboratorijskaOznaka: '',
  lokacija: '',
};

export default function AddUzorakForm({ nalogId, onCreated }) {
  const [values, setValues] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const laboratorijskaOznaka = values.laboratorijskaOznaka.trim();
    const lokacija = values.lokacija.trim();

    if (!laboratorijskaOznaka || !lokacija) {
      setError('Sva polja su obavezna.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await createUzorak({
        laboratorijskaOznaka,
        lokacija,
        nalogId,
      });
      setValues(initialState);
      onCreated?.();
    } catch (err) {
      console.error(err);
      const apiMessage = err?.response?.data?.error;
      setError(apiMessage || 'Greška pri spremanju uzorka.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h3>Dodaj novi uzorak</h3>

      <div className="form-row">
        <label htmlFor="laboratorijskaOznaka">Laboratorijska oznaka</label>
        <input
          id="laboratorijskaOznaka"
          name="laboratorijskaOznaka"
          type="text"
          value={values.laboratorijskaOznaka}
          onChange={handleChange}
          placeholder="npr. LAB-001"
          disabled={submitting}
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="lokacija">Lokacija</label>
        <input
          id="lokacija"
          name="lokacija"
          type="text"
          value={values.lokacija}
          onChange={handleChange}
          placeholder="npr. Skladište A"
          disabled={submitting}
          required
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Spremam...' : 'Dodaj uzorak'}
      </button>
    </form>
  );
}
