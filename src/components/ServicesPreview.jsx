import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const ServicesPreview = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/data/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data.slice(0, 3))); // show first 3 services
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Motion.div
            key={service.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            <ServiceCard service={service} />
          </Motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/service"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
        >
          See All Services
        </Link>
      </div>
    </div>
  );
};

export default ServicesPreview;
