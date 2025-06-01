import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
      <h1 className="text-6xl font-extrabold text-red-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Page Not Found</h2>
      <p className="mb-8 text-gray-600 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Go to Homepage
      </Link>
    </section>
  );
};

export default NotFoundPage;
