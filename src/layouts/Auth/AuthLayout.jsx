import React from 'react';
import Logo from '../../components/Logo/Logo';
import { Link, Outlet } from 'react-router';
import AuthImage from '../../assets/authImage.png';
import SocialLogin from './SocialLogin/SocialLogin';

const AuthLayout = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center px-4 py-6'>

            <Link to="/" className='mb-6'>
                <Logo />
            </Link>

            <div className='w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden'>

                <div className='w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center'>
                    
                    <div className="w-full max-w-sm">
                        <Outlet />
                        <SocialLogin />
                    </div>

                </div>

                <div className='hidden md:flex w-1/2 bg-neutral items-center justify-center p-6 md:p-10'>
                    <img src={AuthImage} alt="Authimage" className='max-w-full h-auto' />
                </div>

            </div>

        </div>
    );
};

export default AuthLayout;