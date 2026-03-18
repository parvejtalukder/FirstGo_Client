import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Outlet } from 'react-router';
import AuthImage from '../../assets/authImage.png'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto my-7'>
            <Logo></Logo>
            <div className='flex'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                    <img src={AuthImage} alt="Authimage" />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;