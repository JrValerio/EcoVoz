import React from 'react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Contato</h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700"
          >
            Assunto
          </label>
          <input
            type="text"
            id="subject"
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Mensagem
          </label>
          <textarea
            id="message"
            className="mt-1 p-2 border border-gray-300 rounded w-full focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contact;
