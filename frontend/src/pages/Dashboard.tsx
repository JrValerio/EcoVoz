import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = () => {
    // Simular resposta da IA
    setResponse(`IA respondeu: Você disse "${input}"`);
    setInput('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Dashboard</h1>
      <div className="w-full max-w-md">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded focus:ring focus:ring-blue-200"
          placeholder="Digite sua mensagem..."
        />
        <button
          onClick={handleSend}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enviar
        </button>
      </div>
      {response && (
        <div className="mt-6 bg-gray-200 p-4 rounded shadow">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
