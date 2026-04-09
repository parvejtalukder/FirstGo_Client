import React from 'react';
import { Link } from 'react-router';

const Failed = () => {
    return (
        <div className='flex flex-col justify-center items-center pt-20'>
            <p className="text-3xl text-red-600" >Bill failed to pay!</p>
            <Link to={"/dashboard/my-parcels"} className='btn btn-primary p-2'>Try again</Link>
        </div>
    );
};

export default Failed;