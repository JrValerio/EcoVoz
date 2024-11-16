import React from 'react';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
  };

  return (
    <div className="contact-container">
      <h1>Contato</h1>
      <p>Entre em contato conosco preenchendo o formulário abaixo:</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="mensagem">Mensagem:</label>
          <textarea id="mensagem" name="mensagem" required />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
export default Contact;
