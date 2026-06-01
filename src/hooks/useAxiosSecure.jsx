import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL: "https://first-go-server.onrender.com/"
})

const useAxiosSecure = () => {

    const { user, logOut } = useAuth();
    const goTo = useNavigate();

    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config;
        })

        const resInterceptor = axiosSecure.interceptors.response.use((res) => {
            return res;
        }, (error) => {
            console.log(error);

            const statusCode = error.status;
            
            if (statusCode === 401 || statusCode === 403) {
                logOut()
                .then(() => {
                    goTo("/login")
                })
            }

            return Promise.reject(error);
        })

        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }

    } ,[user, logOut, goTo])

    return axiosSecure;
};

export default useAxiosSecure;