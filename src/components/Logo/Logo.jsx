import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div className='flex items-end justify-center'>
            <img src={logo} alt="ZapShift" />
            <h3 className='text-3xl font-bold -ms-2'>First Go</h3>
        </div>
    );
};

export default Logo;