import axios, { AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const api: AxiosInstance = axios.create({
  baseURL: 'import.meta.env.API_URL',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config)=> {
  const token: string|null = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config
});

export default api;
