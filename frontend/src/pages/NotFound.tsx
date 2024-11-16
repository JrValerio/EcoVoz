import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-lg text-gray-700 mt-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
