import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-center px-4"
      role="main"
    >
      {/* Título principal */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
          {t('about.title', 'Sobre o EcoVoz')}
        </h1>
      </header>

      {/* Descrição inicial */}
      <section className="max-w-2xl mb-6">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t(
            'about.description',
            'O EcoVoz é uma iniciativa inovadora criada pela equipe 12 durante o Hackathon Autismo Tech 2024. Nosso objetivo é oferecer uma solução tecnológica que possibilite às pessoas com deficiência de fala ou linguagem se comunicarem de maneira eficaz e inclusiva, utilizando inteligência artificial e tecnologia assistiva.'
          )}
        </p>
      </section>

      {/* Funcionalidades principais */}
      <section className="max-w-2xl mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {t('about.features', 'Principais funcionalidades')}
        </h2>
        <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2">
          <li>- {t('about.feature1', 'Reconhecimento de voz avançado para pessoas com deficiência de fala.')}</li>
          <li>- {t('about.feature2', 'Tradução em tempo real para mais de 100 idiomas.')}</li>
          <li>- {t('about.feature3', 'Integração com dispositivos assistivos para comunicação alternativa.')}</li>
          <li>- {t('about.feature4', 'Aplicativo móvel para acessibilidade em qualquer lugar.')}</li>
          <li>- {t('about.feature5', 'Banco de dados de vozes para treinamento e melhoria contínua.')}</li>
        </ul>
      </section>

      {/* Missão */}
      <section className="max-w-2xl mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {t('about.missionTitle', 'Nossa Missão')}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t(
            'about.mission',
            'Nossa missão é promover a inclusão, aumentar a independência e melhorar a qualidade de vida das pessoas com deficiência de fala, utilizando tecnologia de ponta e parcerias estratégicas com organizações, empresas e instituições de saúde.'
          )}
        </p>
      </section>

      {/* Equipe */}
      <section className="max-w-2xl mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {t('about.teamTitle', 'Equipe')}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t(
            'about.team',
            'Este projeto foi desenvolvido com paixão e dedicação pela equipe 12 no Hackathon Autismo Tech 2024, um evento que celebra a criatividade e o impacto positivo da tecnologia na inclusão social.'
          )}
        </p>
      </section>

      {/* Imagem */}
      <section className="mt-8">
        <img
          src="/assets/images/about-illustration.svg"
          alt={t('about.imageAlt', 'Ilustração sobre o EcoVoz')}
          className="max-w-full h-auto"
        />
      </section>
    </main>
  );
};

export default About;
