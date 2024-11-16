import React from 'react';

const About: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-blue-600">About EcoVoz</h1>
      <p className="text-lg text-gray-700 mt-4 max-w-2xl">
        EcoVoz is a platform designed to improve accessibility and facilitate
        communication for individuals with special needs. We aim to empower
        everyone with the tools they need to express themselves and connect with
        others.
      </p>
    </div>
  );
};

export default About;
