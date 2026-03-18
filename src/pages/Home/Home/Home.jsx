import React from 'react';
import Banner from '../Banner/Banner';
import Marchant from '../Marchant/Marchant'
import Button from '../../../components/Button/Button';
import Arrow from '../../../components/Arrow/Arrow';
import HowItWorks from '../HowItWorks/HowItWorks';
import Brands from '../Brands/Brands';
import Review from '../Review/Review';

const reviewPromise = fetch("/review.json")
        .then(res => res.json())

const Home = () => {

    const FAQ = {
        url: "faq",
        name: "More FAQ",
        bg: "bg-primary"
    }


    return (
        <div className='my-10'>
            {/* Banner  */}
            <Banner></Banner>
            {/* How It Works  */}
            <HowItWorks></HowItWorks>
            {/* Brands  */}
            <div className='pb-10'>
                <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-900 text-center lg:text-center pb-3'>Our Partners</h2>
                <Brands></Brands>
            </div>
            {/* Marchent  */}
            <Marchant></Marchant>
            {/* Review  */}
            <Review reviewPromise={reviewPromise}></Review>
            {/* FAQ  */}
            <div className='flex justify-center items-center pt-10'>
                <Button BTN={FAQ}></Button> 
                <Arrow></Arrow>
            </div>
        </div>
    );
};

export default Home;