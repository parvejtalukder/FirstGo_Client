import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignRiders = () => {

    const axios = useAxiosSecure();
    const riderRef = useRef();

    const { data: parcels = [] } = useQuery({
        queryKey: ["parcels", "pending-pickup"],
        queryFn: async () => {
            const res = await axios.get(`/parcels?deliveryStatus=pending-pickup`);
            return res.data;
        }
    })

    const handleAssing = (parcel) => {
        riderRef.current.showModal();
    }

    return (
        <div className='p-5 max-w-5xl mx-auto'>
            <h2 className='text-3xl font-bold'>Assign Riders ({parcels.length})</h2>
            <div>
                <div className="overflow-x-auto">
                  <table className="table">
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
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => 
                                <tr key={index} className="bg-base-200">
                                  <th>{index + 1}</th>  
                                  <th>{parcel.parcelName}</th>
                                  <th>{parcel.parcelWeight}</th>
                                  <th>{parcel.cost}</th>
                                  <td>{parcel.deliveryStatus}</td>
                                  <td>{parcel.senderDistrict}</td>
                                  <td>{parcel.createdAt}</td>
                                  {/* <td>Quality Control Specialist</td> */}
                                  <td><button onClick={() => handleAssing(parcel)} className='btn'>Assign</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                  </table>
                </div>
            <dialog ref={riderRef} className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action">
                  <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn">Close</button>
                  </form>
                </div>
              </div>
            </dialog>
            </div>
        </div>
    );
};

export default AssignRiders;