import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion as Motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const testimonials = [
  {
    id: 1,
    quote:
      "Career Counsel+ gave me the clarity I needed to choose the right career path. Highly recommend their services!",
    name: "Jessica L.",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 2,
    quote:
      "Thanks to Career Counsel+, I landed a job that truly matches my passion. Their support made all the difference.",
    name: "David R.",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    quote:
      "Career Counsel+ helped me discover strengths I hadn’t realized before. Their personalized guidance was invaluable.",
    name: "Anita K.",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    quote:
      "I was stuck in my career until I found Career Counsel+. Their coaching motivated me to move forward with confidence.",
    name: "Mark T.",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 5,
    quote:
      "Professional, insightful, and encouraging — Career Counsel+ was exactly what I needed for my career decisions.",
    name: "Emily P.",
    photo: "https://randomuser.me/api/portraits/women/25.jpg",
  },
];

// Framer Motion fade/scale animation
const fadeInZoom = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Testimonials = () => {
  const swiperRef = useRef(null);

  return (
    <section className="flex items-center justify-center min-h-screen w-full p-6 bg-gradient-to-br from-indigo-100 via-white to-purple-100 text-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-8 text-indigo-700">
          What Clients Say About Career Counsel+
        </h2>
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          effect="fade"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop
          style={{ paddingBottom: '3rem' }}
        >
          {testimonials.map(({ id, quote, name, photo }) => (
            <SwiperSlide key={id} className="flex justify-center">
              <Motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInZoom}
                className="bg-white rounded-lg shadow-lg p-6 max-w-md text-lg text-gray-700 mx-auto flex flex-col items-center"
              >
                <img
                  src={photo}
                  alt={`Photo of ${name}`}
                  className="w-20 h-20 rounded-full mb-4 ring-4 ring-indigo-600 object-cover"
                  loading="lazy"
                />
                <p className="mb-4">“{quote}”</p>
                <footer className="font-semibold text-indigo-700">— {name}</footer>
              </Motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
