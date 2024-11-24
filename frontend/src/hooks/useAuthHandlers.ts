import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import useAuth from '../hooks/useAuth';
import { handleGoogleLogin } from '../utils/googleAuth';
import { setUser } from '../redux/slices/userSlice';

// Interface para a resposta do backend
interface BackendResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    // ... outras propriedades do usuário
  };
}

// Interface para erros do backend
interface ApiErrorResponse {
  message: string;
}

export const useAuthHandlers = () => {
  const dispatch = useDispatch();
  const { login } = useAuth();
  const navigate = useNavigate();

  /**
   * Manipula o sucesso do login com o Google.
   * Envia as credenciais do Google para o backend, salva o token e redireciona.
   * @param credential Credencial retornada pelo Google.
   */
  const handleGoogleLoginSuccess = async (
    credential: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setLoading(true);
    try {
      const backendResponse = await handleGoogleLogin(credential);

      // Validação da resposta do backend
      if (backendResponse && backendResponse.token && backendResponse.user) {
        localStorage.setItem('authToken', backendResponse.token);
        localStorage.setItem('user', JSON.stringify(backendResponse.user));
        dispatch(setUser(backendResponse.user));
        toast.success('Login com Google realizado com sucesso!');
        navigate('/dashboard');
      } else {
        throw new Error('Resposta inválida do servidor.');
      }
    } catch (error: unknown) {
      console.error('[ERROR] Erro no Google Login:', error);

      // Tratamento de erros do Axios
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response) {
          toast.error(axiosError.response.data.message || 'Erro ao realizar login com o Google.');
        } else if (axiosError.request) {
          toast.error('Erro de rede. Verifique sua conexão.');
        } else {
          toast.error('Erro ao configurar a requisição. Tente novamente mais tarde.');
        }
      } else {
        toast.error('Erro desconhecido ao realizar login com o Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Manipula o envio do formulário de login.
   * Realiza a autenticação do usuário com email e senha e redireciona.
   * @param email Email do usuário.
   * @param password Senha do usuário.
   * @param setLoading Callback para controlar o estado de carregamento.
   */
  const handleSubmit = async (
    email: string,
    password: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error: unknown) {
      console.error('[ERROR] Erro no login:', error);

      // Tratamento de erros do Axios
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;
        if (axiosError.response) {
          toast.error(axiosError.response.data.message || 'Erro ao realizar login.');
        } else if (axiosError.request) {
          toast.error('Erro de rede. Verifique sua conexão.');
        } else {
          toast.error('Erro ao configurar a requisição. Tente novamente mais tarde.');
        }
      } else {
        toast.error('Erro desconhecido ao realizar login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleGoogleLoginSuccess, handleSubmit };
};
