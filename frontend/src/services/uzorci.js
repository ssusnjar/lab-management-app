import api from './api';

export const getUzorci = () => api.get('/uzorci').then((r) => r.data);

export const getUzorak = (id) => api.get(`/uzorci/${id}`).then((r) => r.data);

export const createUzorak = (data) => api.post('/uzorci', data).then((r) => r.data);

export const updateUzorak = (id, data) => api.put(`/uzorci/${id}`, data).then((r) => r.data);

export const deleteUzorak = (id) => api.delete(`/uzorci/${id}`).then((r) => r.data);
