import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
        {t('about.title')}
      </h1>
      <p className="text-lg text-gray-700 mt-4 max-w-2xl leading-relaxed">
        {t('about.description')}
      </p>
      <div className="mt-8">
        <img
          src="/assets/images/about-illustration.svg"
          alt={t('about.imageAlt')}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

export default About;
