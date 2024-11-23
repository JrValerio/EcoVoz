import React, { useState } from 'react';
import axios from 'axios';

/**
 * Componente que renderiza o Dashboard da aplicação.
 * Permite que o usuário envie mensagens para uma API de IA e exibe a resposta.
 */
const Dashboard: React.FC = () => {
  // Estados para controlar a entrada do usuário, a resposta da API e o estado de carregamento
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Manipula o envio da mensagem para a API de IA.
   * Faz uma requisição POST para a API com a mensagem do usuário e exibe a resposta.
   * Em caso de erro, exibe uma mensagem de erro.
   */
  const handleSend = async () => {
    if (!input.trim()) {
      setResponse('Por favor, digite uma mensagem antes de enviar.');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const { data } = await axios.post('/api/ai', { message: input });
      setResponse(data.response || 'A IA não enviou uma resposta.');
    } catch (error: unknown) {
      setResponse('Erro ao conectar com a IA. Tente novamente.');
      console.error('Error in handleSend:', error);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Dashboard</h1>
      <div className="w-full max-w-md">
        {/* Área de entrada de texto */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded focus:ring focus:ring-blue-200"
          placeholder="Digite sua mensagem..."
          rows={4}
          aria-label="Entrada de mensagem para IA"
        />
        {/* Botão para enviar a mensagem */}
        <button
          onClick={handleSend}
          className={`mt-4 w-full px-4 py-2 rounded shadow ${
            loading
              ? 'bg-blue-400 cursor-wait'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
      {/* Exibe a resposta da IA, se houver */}
      {response && (
        <div
          className="mt-6 bg-gray-200 p-4 rounded shadow w-full max-w-md text-center text-gray-700"
          aria-live="polite"
        >
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;