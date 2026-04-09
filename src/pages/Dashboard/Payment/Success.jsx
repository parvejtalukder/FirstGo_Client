// import axios from 'axios';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Success = () => {

    const [searchPrm] = useSearchParams();
    const session_id = searchPrm.get("session_id")
    const axios = useAxiosSecure();

    useEffect(() => {

        if (session_id) {
            axios.patch(`/payment-success?session_id=${session_id}`)
            .then(res => {
                console.log(res.data);
            })
            setTimeout(() => {
                window.location.assign("/dashboard/my-parcels");    
            },[2000])
        } else {
            window.location.assign("/dashboard/my-parcels");
        }

    }, [session_id, axios])

    return (
        <div className='text-center flex justify-center items-center pt-20'>
            <h2 className='text-3xl'>Bill Paid!</h2>
        </div>
    );
};

export default Success;