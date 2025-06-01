import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Thumbs,
  Autoplay,
  Keyboard,
  EffectFade,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200',
    title: 'Web Development',
    description: 'Modern websites built with the latest tech stack.',
    link: '/services/web-development',
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1720287601920-ee8c503af775?w=1200',
    title: 'App Development',
    description: 'Innovative mobile apps for Android and iOS platforms.',
    link: '/services/app-development',
  },
  {
    image: 'https://images.unsplash.com/photo-1642132652935-d750e2014719?w=1200',
    title: 'Cloud Infrastructure',
    description: 'Reliable and scalable cloud solutions for your business.',
    link: '/services/cloud',
  },
  {
    image: 'https://images.unsplash.com/photo-1642132652860-471b4228023e?w=1200',
    title: 'Cyber Security',
    description: 'Ensure data safety with enterprise-grade security.',
    link: '/services/security',
  },
  {
    image: 'https://images.unsplash.com/photo-1648134859211-4a1b57575f4e?w=1200',
    title: 'AI & Machine Learning',
    description: 'Leverage AI to automate and enhance operations.',
    link: '/services/ai',
  },
];

const Slider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  let mainSwiper;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Main Swiper */}
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Thumbs,
          Autoplay,
          Keyboard,
          EffectFade,
        ]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        keyboard={{ enabled: true }}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        onSwiper={(swiper) => (mainSwiper = swiper)}
        onMouseEnter={() => mainSwiper?.autoplay?.stop()}
        onMouseLeave={() => mainSwiper?.autoplay?.start()}
        className="rounded-2xl"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg h-[400px] md:h-[500px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent dark:from-gray-900/80 dark:via-gray-800/60"></div>

              {/* Text with staggered animation */}
              <div className="absolute bottom-10 left-6 z-10 text-white space-y-3">
                <h2 className="text-3xl font-bold opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all delay-100 duration-700">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all delay-200 duration-700 max-w-md">
                  {slide.description}
                </p>
                <a
                  href={slide.link}
                  className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm shadow-md opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all delay-300 duration-700"
                >
                  Learn More
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
        spaceBetween={10}
        slidesPerView={5}
        watchSlidesProgress
        className="mt-6"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={slide.image}
              alt={`Thumb ${idx + 1}`}
              className="h-20 w-full object-cover rounded-lg cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
