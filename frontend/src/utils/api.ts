import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL, // Base URL da API definida no .env
});
export const fetchData = async (endpoint: string): Promise<unknown> => {
  const response = await api.get(endpoint);
  return response.data;
};

export const postData = async (endpoint: string, data: unknown): Promise<unknown> => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export default api;
