import React, { useState, useEffect } from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from './Card';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const Review = ({ reviewPromise }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        reviewPromise.then(data => setReviews(data));
    }, [reviewPromise]);

    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={4}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
            breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
        >
            {reviews.map((one) => (
                <SwiperSlide key={one.id}>
                    <Card one={one} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Review;