import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaHandHoldingHeart, FaUsers, FaCogs } from 'react-icons/fa';
import { motion } from 'framer-motion';

import videoPath from '@/assets/videos/EcoVoz.mp4';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 text-center px-4"
      role="main"
      aria-live="polite"
    >
      {/* Título da página */}
      <header className="mb-8">
        <motion.h1
          className="text-4xl font-extrabold text-blue-600 dark:text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t('about.title', 'Sobre o EcoVoz')}
        </motion.h1>
      </header>

      {/* Descrição do projeto */}
      <section className="max-w-2xl mb-6 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
        <FaHandHoldingHeart className="text-3xl text-red-500 mx-auto mb-2" />
        <motion.p
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t(
            'about.description',
            'O EcoVoz é uma iniciativa inovadora criada pela equipe 12 durante o Hackathon Autismo Tech 2024. Nosso objetivo é oferecer uma solução tecnológica que possibilite às pessoas com deficiência de fala ou linguagem se comunicarem de maneira eficaz e inclusiva, utilizando inteligência artificial e tecnologia assistiva.',
          )}
        </motion.p>
      </section>

      {/* Lista de funcionalidades */}
      <section className="max-w-2xl mb-6 bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {t('about.features', 'Principais funcionalidades')}
        </h2>
        <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2">
          <li>
            -{' '}
            {t(
              'about.feature1',
              'Reconhecimento de voz avançado para pessoas com deficiência de fala.',
            )}
          </li>
          <li>
            -{' '}
            {t(
              'about.feature2',
              'Tradução em tempo real para mais de 100 idiomas.',
            )}
          </li>
          <li>
            -{' '}
            {t(
              'about.feature3',
              'Integração com dispositivos assistivos para comunicação alternativa.',
            )}
          </li>
          <li>
            -{' '}
            {t(
              'about.feature4',
              'Aplicativo móvel para acessibilidade em qualquer lugar.',
            )}
          </li>
          <li>
            -{' '}
            {t(
              'about.feature5',
              'Banco de dados de vozes para treinamento e melhoria contínua.',
            )}
          </li>
        </ul>
      </section>

      {/* Depoimentos */}
      <section className="mt-8 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          {t('about.testimonials.title', 'Depoimentos')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              text: t(
                'about.testimonials.testimony1.text',
                'EcoVoz transformou minha forma de interagir!',
              ),
              name: t('about.testimonials.testimony1.name', 'Joana'),
              icon: <FaUsers />,
            },
            {
              text: t(
                'about.testimonials.testimony2.text',
                'A tradução em tempo real é fantástica!',
              ),
              name: t('about.testimonials.testimony2.name', 'Carlos'),
              icon: <FaCogs />,
            },
            {
              text: t(
                'about.testimonials.testimony3.text',
                'A integração com meu dispositivo assistivo é perfeita!',
              ),
              name: t('about.testimonials.testimony3.name', 'Ana'),
              icon: <FaHandHoldingHeart />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="text-blue-600 dark:text-blue-400 text-3xl mb-4">
                {item.icon}
              </div>
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                {item.text}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                - {item.name}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Seção de vídeo */}
      <section className="mt-8 max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          {t('about.videoTitle', 'Veja como o EcoVoz funciona!')}
        </h2>
        <div className="rounded-lg shadow-lg overflow-hidden">
          <video
            className="w-full h-auto"
            controls
            aria-label={t(
              'about.videoAlt',
              'Demonstração do aplicativo EcoVoz',
            )}
          >
            <source src={videoPath} type="video/mp4" />
            {t('about.videoFallback', 'Seu navegador não suporta vídeos.')}
          </video>
        </div>
      </section>
    </main>
  );
};

export default About;
