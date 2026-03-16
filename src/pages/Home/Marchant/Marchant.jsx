import React from 'react';
import Merchanta from '../../../assets/location-merchant.png'
import Button from '../../../components/Button/Button';

const Marchant = () => {

    const BeMerchant = {
        url: "became-merchant",
        name: "Became a Merchant",
        bg: "bg-primary"
    }

    const EarnWithZip = {
        url: "earn-with-zap",
        name: "Earn With ZapShift",
        bg: "bg-white"
    }

    return (
        <div className='bg-secondary px-6 py-10 md:px-12 lg:px-20 lg:py-16 rounded-3xl flex flex-col lg:flex-row items-center gap-10'>
            
            {/* Text Section */}
            <div className='w-full lg:w-3/5 flex flex-col gap-4 text-center lg:text-left'>
                <h2 className='font-bold text-2xl md:text-3xl lg:text-4xl text-white'>
                    Merchant and Customer Satisfaction is Our First Priority
                </h2>

                <p className='text-gray-200 text-sm md:text-base text-justify lg:text-left'>
                    We offer the lowest delivery charge with the highest value along with 100% safety of your product.
                    Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                </p>

                <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                    <Button BTN={BeMerchant}></Button>
                    <Button BTN={EarnWithZip}></Button>
                </div>
            </div>

            {/* Image Section */}
            <div className='w-full lg:w-2/5 flex justify-center'>
                <img
                    src={Merchanta}
                    alt="Merchant"
                    className='w-full max-w-sm md:max-w-md lg:max-w-full'
                />
            </div>

        </div>
    );
};

export default Marchant;