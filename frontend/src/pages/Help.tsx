import React from 'react';
import { FaQuestionCircle, FaEnvelope, FaBook, FaPhoneAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

/**
 * Componente que renderiza a página de Ajuda e Suporte.
 * Exibe informações de contato, FAQs e links para recursos úteis.
 */
const Help: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className="text-3xl font-bold text-center mb-6">Ajuda e Suporte</h1>

      {/* Seção de Perguntas Frequentes (FAQ) */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaQuestionCircle aria-hidden="true" /> 
          Perguntas Frequentes (FAQ)
        </h2>
        <div className="space-y-4">
          {/* Pergunta 1 */}
          <details className="border p-4 rounded">
            <summary className="font-medium cursor-pointer">
              Como faço para recuperar minha senha?
            </summary>
            <p className="mt-2">
              Você pode recuperar sua senha clicando no link "Esqueceu sua senha?" na página de login.
              Insira seu email cadastrado e siga as instruções enviadas para o seu email.
            </p>
          </details>

          {/* Pergunta 2 */}
          <details className="border p-4 rounded">
            <summary className="font-medium cursor-pointer">
              Onde posso editar meus dados pessoais?
            </summary>
            <p className="mt-2">
              Você pode editar suas informações pessoais acessando a página de perfil. Clique no seu
              nome no menu superior e selecione "Perfil".
            </p>
          </details>

          {/* Pergunta 3 */}
          <details className="border p-4 rounded">
            <summary className="font-medium cursor-pointer">
              Como entro em contato com o suporte técnico?
            </summary>
            <p className="mt-2">
              Você pode nos contatar diretamente pelo formulário nesta página ou pelo email de suporte
              listado abaixo.
            </p>
          </details>
        </div>
      </section>

      {/* Seção de Contato */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaEnvelope aria-hidden="true" /> 
          Entre em Contato
        </h2>
        <p className="mb-4">
          Precisa de mais ajuda? Entre em contato conosco pelos canais abaixo.
        </p>
        <ul className="space-y-2">
          {/* Email de contato */}
          <li className="flex items-center gap-2">
            <FaEnvelope aria-hidden="true" />
            <a href="mailto:support@ecovoz.com" className="text-blue-600 hover:underline">
              support@ecovoz.com
            </a>
          </li>
          {/* Telefone de contato */}
          <li className="flex items-center gap-2">
            <FaPhoneAlt aria-hidden="true" />
            <span>+55 11 99999-9999</span>
          </li>
        </ul>
      </section>

      {/* Seção de Recursos Úteis */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaBook aria-hidden="true" /> 
          Recursos Úteis
        </h2>
        <ul className="space-y-2">
          {/* Link para a documentação */}
          <li>
            <a
              href="/docs"
              className="text-blue-600 hover:underline"
              aria-label="Acessar a documentação da aplicação"
            >
              Documentação da Aplicação
            </a>
          </li>
          {/* Link para tutoriais */}
          <li>
            <a
              href="/tutorials"
              className="text-blue-600 hover:underline"
              aria-label="Acessar tutoriais e guias"
            >
              Tutoriais e Guias
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Help;