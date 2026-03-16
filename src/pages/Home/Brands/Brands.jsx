import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Amazon from '../../../assets/brands/amazon.png';
import Casio from '../../../assets/brands/casio.png';
import Moonstar from '../../../assets/brands/moonstar.png';
import Randstad from '../../../assets/brands/randstad.png';
import Star from '../../../assets/brands/star.png';
import 'swiper/css';

const Brands = () => {
  const logos = [Amazon, Casio, Amazon, Star, Randstad, Amazon, Moonstar, Randstad, Star];

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      loop={true}
    //   centeredSlides={true}
      grabCursor={true}
      autoplay={{
        delay: 0,          
        disableOnInteraction: false,
      }}
      speed={2000}          
      modules={[Autoplay]}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {logos.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt={`Logo ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;