import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loader from '../../../utility/Loader/Loader';

const Payment = () => {
  const { parcelId } = useParams();
  const axios = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axios.get(`/parcels/${parcelId}`);
      return res.data;
    }
  });

  const handlePayment = async () => {

    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    } 

    const res = await axios.post('/do-payment', paymentInfo);
    // console.log(res.data);
    window.location.href = res.data.url;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Payment Details
        </h2>

        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Parcel:</span>
            <span>{parcel?.parcelName}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Type:</span>
            <span>{parcel?.parcelType}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Weight:</span>
            <span>{parcel?.parcelWeight} KG</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Cost:</span>
            <span className="text-lg font-semibold text-green-600">
              ৳ {parcel?.cost}
            </span>
          </div>
        </div>

        <button onClick={handlePayment} className="btn w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
