import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
        {t('about.title', 'Sobre o EcoVoz')}
      </h1>
      <p className="text-lg text-gray-700 mt-4 max-w-2xl leading-relaxed">
        {t(
          'about.description',
          'O EcoVoz é uma iniciativa inovadora criada pela equipe 12 durante o Hackathon Autismo Tech 2024. Nosso objetivo é oferecer uma solução tecnológica que possibilite às pessoas com deficiência de fala ou linguagem se comunicarem de maneira eficaz e inclusiva, utilizando inteligência artificial e tecnologia assistiva.'
        )}
      </p>
      <p className="text-lg text-gray-700 mt-4 max-w-2xl leading-relaxed">
        {t(
          'about.features',
          'Principais funcionalidades do EcoVoz incluem:'
        )}
      </p>
      <ul className="text-left mt-4 text-gray-700 max-w-2xl space-y-2">
        <li>- {t('about.feature1', 'Reconhecimento de voz avançado para pessoas com deficiência de fala.')}</li>
        <li>- {t('about.feature2', 'Tradução em tempo real para mais de 100 idiomas.')}</li>
        <li>- {t('about.feature3', 'Integração com dispositivos assistivos para comunicação alternativa.')}</li>
        <li>- {t('about.feature4', 'Aplicativo móvel para acessibilidade em qualquer lugar.')}</li>
        <li>- {t('about.feature5', 'Banco de dados de vozes para treinamento e melhoria contínua.')}</li>
      </ul>
      <p className="text-lg text-gray-700 mt-4 max-w-2xl leading-relaxed">
        {t(
          'about.mission',
          'Nossa missão é promover a inclusão, aumentar a independência e melhorar a qualidade de vida das pessoas com deficiência de fala, utilizando tecnologia de ponta e parcerias estratégicas com organizações, empresas e instituições de saúde.'
        )}
      </p>
      <p className="text-lg text-gray-700 mt-4 max-w-2xl leading-relaxed">
        {t(
          'about.team',
          'Este projeto foi desenvolvido com paixão e dedicação pela equipe 12 no Hackathon Autismo Tech 2024, um evento que celebra a criatividade e o impacto positivo da tecnologia na inclusão social.'
        )}
      </p>
      <div className="mt-8">
        <img
          src="/assets/images/about-illustration.svg"
          alt={t('about.imageAlt', 'Ilustração sobre o EcoVoz')}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default About;
