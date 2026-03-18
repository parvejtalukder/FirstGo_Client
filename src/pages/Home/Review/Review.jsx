import React, { useState, useEffect } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
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
        <div className='my-10'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-900 text-center lg:text-center pb-5'>Reviews</h2>
        <Swiper
        // className="my-20"
            effect={'coverflow'}
            loop={true}
            autoplay={{
                delay: 1500,          
                disableOnInteraction: false,
            }}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={4}
            // autoplay={true}
            coverflowEffect={{
                rotate: 50,
                stretch: '50%',
                depth: 100,
                scale: 0.75,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            // className="m-10"
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
        </div>
    );
};

export default Review;