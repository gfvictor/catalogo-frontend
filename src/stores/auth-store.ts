import { defineStore } from 'pinia';
import axios, { AxiosError } from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string;
  errorMessage: string | null;
}
export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null as User | null,
    token: localStorage.getItem('token') || '',
    errorMessage: '' as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUsername: (state) => state.user?.username,
  },

  actions: {

    async register(username: string, email: string, password: string): Promise<boolean> {
      try {

        const response = await axios.post('/user/register', { username, email, password });
        this.user = response.data.user;
        this.token = response.data.authorization.token;

        localStorage.setItem('token', this.token);
        return true;

      } catch (err) {

        const axiosError = err as AxiosError<{ message: string }>
        this.errorMessage = axiosError.response?.data?.message || 'Erro ao tentar registrar.';
        return false;
      }
    },

    async login(username: string, password: string): Promise<boolean> {
      try {

        const response = await axios.post('/user/login', { username, password });
        this.user = response.data.user;
        this.token = response.data.authorization.token;

        localStorage.setItem('token', this.token);
        return true;

      } catch (err) {

        const axiosError = err as AxiosError<{ message: string }>;
        this.errorMessage = axiosError.response?.data?.message || 'Erro ao realizar o login.';
        return false;
      }
    },
  }
})