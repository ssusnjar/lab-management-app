import api from './api';

export const getIspitivanja = () => api.get('/ispitivanja').then((r) => r.data);

export const getIspitivanje = (id) => api.get(`/ispitivanja/${id}`).then((r) => r.data);

export const createIspitivanje = (data) => api.post('/ispitivanja', data).then((r) => r.data);

export const updateIspitivanje = (id, data) => api.put(`/ispitivanja/${id}`, data).then((r) => r.data);

export const deleteIspitivanje = (id) => api.delete(`/ispitivanja/${id}`).then((r) => r.data);
