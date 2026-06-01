import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const DeliveredTasks = () => {

    const { user } = useAuth();
    const axios = useAxiosSecure();

    const { data : parcels = [], } = useQuery({
        queryKey: ["parcels", "delivered", user.email],
        queryFn: async () => {
            const res = await axios.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=delivered`);
            return res.data;
        }
    })

    const calculatePayout = (parcel) => {
        if (parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost*0.09;
        } else {
            return parcel.cost*0.6;
        }
    }

    return (
        <div className='p-5 max-w-6xl mx-auto'>
            <h2 className='font-bold text-3xl pb-2'>Completed Tasks ({parcels.length})</h2>
            <div>
                <div className="overflow-x-auto">
                  <table className="table bg-green-500">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Name</th>
                        <th>Weight</th>
                        <th>Cost</th>
                        <th>Delivery Status</th>
                        <th>Pickup District</th>
                        <th>Created At</th>
                        <th>Earning</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => 
                                <tr key={index} className="bg-green-200">
                                  <th>{index + 1}</th>  
                                  <th>{parcel.parcelName}</th>
                                  <th>{parcel.parcelWeight}</th>
                                  <th>{parcel.cost}</th>
                                  <td>{parcel.deliveryStatus}</td>
                                  <td>{parcel.senderDistrict}</td>
                                  <td>{parcel.createdAt}</td>
                                  <td> {
                                    calculatePayout(parcel)
                                    } </td>
                                    <td><button 
                                    className='btn shadow bg-green-100'
                                    >
                                        Cashout
                                    </button></td>
                                  {/* <td>Quality Control Specialist</td> */}
                                  {/* <td><button className='btn'>Find Riders</button></td> */}
                                </tr>
                            )
                        }
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
    );
};

export default DeliveredTasks;