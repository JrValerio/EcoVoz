import React, { useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) {
      setResponse('Por favor, digite uma mensagem antes de enviar.');
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const { data } = await axios.post('/api/ai', { message: input }); // Faz a chamada para a API
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
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded focus:ring focus:ring-blue-200"
          placeholder="Digite sua mensagem..."
          rows={4}
          aria-label="Entrada de mensagem para IA"
        />
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
