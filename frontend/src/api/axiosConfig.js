import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // L'URL que Josias va utiliser
});

// Intercepteur pour ajouter le token automatiquement (Pilier 1)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // On commencera par là pour tester
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;