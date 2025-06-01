import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { Star } from 'lucide-react';


const ServiceCard = ({ service }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    id,
    image,
    serviceName,
    category,
    pricing,
    counselor,
    rating,
  } = service;

  const handleLearnMore = () => {
    if (!user) {
      navigate('/login', { state: { from: `/service/${id}` } });
    } else {
      navigate(`/service/${id}`);
    }
  };

  const colorThemes = {
    "Career Counseling Sessions": 'bg-indigo-50 border-indigo-300',
    "Resume Review": 'bg-green-50 border-green-300',
    "Mock Interview Prep": 'bg-yellow-50 border-yellow-300',
    "Job Search Strategy": 'bg-cyan-50 border-cyan-300',
    "Scholarship Guidance": 'bg-pink-50 border-pink-300',
    "LinkedIn Profile Optimization": 'bg-blue-50 border-blue-300',
    "Networking Skills Workshop": 'bg-purple-50 border-purple-300',
    "Soft Skills Training": 'bg-orange-50 border-orange-300',
    default: 'bg-gray-100 border-gray-300'
  };

  const bgClass = colorThemes[serviceName] || colorThemes.default;

  return (
    <div
      className={`relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out border ${bgClass} cursor-pointer`}
      onClick={handleLearnMore}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleLearnMore(); }}
    >

      <img
        src={image}
        alt={serviceName}
        className="w-full h-48 object-cover"
        loading="lazy"
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{serviceName}</h3>
        <p className="text-sm text-gray-600">{category}</p>
        <p className="text-lg font-semibold text-indigo-600 mt-1">{pricing}</p>
        <p className="text-sm text-gray-700 mt-2">
          <span className="font-semibold">Counselor:</span> {counselor}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center text-yellow-400 text-sm font-semibold">
            <Star className="w-5 h-5 mr-1 fill-yellow-400 stroke-yellow-400" />
            <span>{rating || "4.8"}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLearnMore();
            }}
            className="relative px-6 py-2 font-semibold text-white rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300 shadow-lg"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
