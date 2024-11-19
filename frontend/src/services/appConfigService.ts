import api from './api';

export const fetchAppConfig = async () => {
  try {
    const response = await api.get('/config');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    throw new Error('Não foi possível carregar as configurações.');
  }
};
