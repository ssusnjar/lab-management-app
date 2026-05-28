import api from './api';

export const getNalozi = () => api.get('/nalozi').then((r) => r.data);

export const getNalog = (id) => api.get(`/nalozi/${id}`).then((r) => r.data);

export const createNalog = (data) => api.post('/nalozi', data).then((r) => r.data);

export const updateNalog = (id, data) => api.put(`/nalozi/${id}`, data).then((r) => r.data);

export const deleteNalog = (id) => api.delete(`/nalozi/${id}`).then((r) => r.data);
