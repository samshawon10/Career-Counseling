// Services.jsx
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import { Helmet } from 'react-helmet';

const Services = () => {
  const services = useLoaderData();

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-white">
      <Helmet>
        <title>Services | Career Counsel+</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-indigo-800 mb-8">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map(service => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;
