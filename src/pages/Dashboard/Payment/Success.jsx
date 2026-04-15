// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Success = () => {

    const [searchPrm] = useSearchParams();
    const session_id = searchPrm.get("session_id")
    const axios = useAxiosSecure();
    const [paymentInfo, setPaymentInfo] = useState({});

    useEffect(() => {

        if (session_id) {
            axios.patch(`/payment-success?session_id=${session_id}`)
            .then(res => {
                // console.log(res.data);
                setPaymentInfo({
                    transactionId: res.data.transactionId,
                    trackingId: res.data.trackingId 
                })
            })
            // setTimeout(() => {
            //     window.location.assign("/dashboard/my-parcels");    
            // },[2000])
        } else {
            // setTimeout(() => {
            //     window.location.assign("/dashboard/my-parcels");    
            // },[2000])
            // window.location.assign("/dashboard/my-parcels");
        }

    }, [session_id, axios])

    return (
        <div className='text-center flex flex-col justify-center items-center pt-20'>
            <h2 className='text-3xl'>Bill Paid!</h2>
            <p>Your transaction Id <span>{paymentInfo.transactionId}</span></p>
            <p>Your Parcel Tracking Id <span>{paymentInfo.trackingId}</span></p>
            <Link to={"/dashboard/my-parcels"} className='btn btn-accent p-2'>Go My Parcels</Link>
        </div>
    );
};

export default Success;