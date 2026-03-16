import React from 'react';
import Banner from '../Banner/Banner';
import Marchant from '../Marchant/Marchant'
import Button from '../../../components/Button/Button';
import Arrow from '../../../components/Arrow/Arrow';
import HowItWorks from '../HowItWorks/HowItWorks';

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
            {/* Marchent  */}
            <Marchant></Marchant>
            {/* FAQ  */}
            <div className='flex justify-center items-center pt-10'>
                <Button BTN={FAQ}></Button> 
                <Arrow></Arrow>
            </div>
        </div>
    );
};

export default Home;