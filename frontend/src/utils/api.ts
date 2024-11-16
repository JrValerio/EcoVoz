import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Base URL da API definida no .env
});

export const fetchData = async (endpoint: string): Promise<any> => {
  const response = await api.get(endpoint);
  return response.data;
};

export const postData = async (endpoint: string, data: any): Promise<any> => {
  const response = await api.post(endpoint, data);
  return response.data;
};

export default api;
