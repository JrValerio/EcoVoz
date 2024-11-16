import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to EcoVoz</h1>
      <p className="text-lg text-gray-700 mt-4">
        Your platform for accessibility and communication.
      </p>
      <div className="mt-6">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
