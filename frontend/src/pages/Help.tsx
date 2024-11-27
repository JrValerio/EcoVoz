import React from 'react';
import { FaQuestionCircle, FaEnvelope, FaBook, FaPhoneAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Help: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className="text-3xl font-bold text-center mb-6">{t('help.title')}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaQuestionCircle aria-hidden="true" /> 
          {t('help.faq.title')}
        </h2>
        <div className="space-y-4">
          <details className="border p-4 rounded">
            <summary className="font-medium cursor-pointer">{t('help.faq.q1')}</summary>
            <p className="mt-2">{t('help.faq.a1')}</p>
          </details>
          <details className="border p-4 rounded">
            <summary className="font-medium cursor-pointer">{t('help.faq.q2')}</summary>
            <p className="mt-2">{t('help.faq.a2')}</p>
          </details>
          <details className="border p-4 rounded">
            <summary className="font-medium cursor-pointer">{t('help.faq.q3')}</summary>
            <p className="mt-2">{t('help.faq.a3')}</p>
          </details>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaEnvelope aria-hidden="true" /> 
          {t('help.contact.title')}
        </h2>
        <p className="mb-4">{t('help.contact.description')}</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <FaEnvelope aria-hidden="true" />
            <a href="mailto:support@ecovoz.com" className="text-blue-600 hover:underline">
              {t('help.contact.email')}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <FaPhoneAlt aria-hidden="true" />
            <span>{t('help.contact.phone')}</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <FaBook aria-hidden="true" /> 
          {t('help.resources.title')}
        </h2>
        <ul className="space-y-2">
          <li>
            <a href="/docs" className="text-blue-600 hover:underline">
              {t('help.resources.docs')}
            </a>
          </li>
          <li>
            <a href="/tutorials" className="text-blue-600 hover:underline">
              {t('help.resources.tutorials')}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Help;
