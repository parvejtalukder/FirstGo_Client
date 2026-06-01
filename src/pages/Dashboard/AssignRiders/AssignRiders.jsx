import { QueryClient, useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRiders = () => {

    const axios = useAxiosSecure();
    const riderRef = useRef();
    const [selectedParcel, setSelectedParcel] = useState(null);

    const { data: parcels = [], refetch: parcelRefetch } = useQuery({
        queryKey: ["parcels", "pending-pickup"],
        queryFn: async () => {
            const res = await axios.get(`/parcels?deliveryStatus=pending-pickup`);
            return res.data;
        }
    })

    const { data: riders = [] } = useQuery({
      queryKey: ["riders", selectedParcel?.senderDistrict, 'available'],
      enabled: !!selectedParcel,
      queryFn: async () => {
        const res = await axios.get(`/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`);
        return res.data;
      }
    })

    const handleAssing = (parcel) => {
      setSelectedParcel(parcel);
      riderRef.current.showModal();
    }

    const handleRider = (rider) => {
      console.log(rider);
      console.log(selectedParcel);
      const riderInfo = { 
        riderId: rider._id,
        riderEmail: rider.email,
        riderName: rider.name,
        parcelId: selectedParcel._id,
      ridertrackingId: selectedParcel.trackingId,
       }
      axios.patch(`/parcels/${selectedParcel._id}`, riderInfo)
      .then(res => {
        console.log("CALLED")
        console.log(res);
        if (res.data.modifiedCount) {
          riderRef.current.close();
          parcelRefetch();
          Swal.fire({
            position: "top-right",
            title: "Rider Assigned!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          })
        }
      })
      .catch(err => {
        Swal.fire({
            position: "top-right",
            title: "Rider Assigning Issued!",
            text: err,
            icon: "warning",
            timer: 2000,
            showConfirmButton: false,
        })
      })
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
                                  <td><button onClick={() => handleAssing(parcel)} className='btn'>Find Riders</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                  </table>
                </div>
                <dialog ref={riderRef} className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box max-w-3xl">
                    <h3 className="font-bold text-lg mb-4">
                      Riders ({riders.length})
                    </h3>  
                    <div className="overflow-x-auto">
                      <table className="table table-zebra w-full">
                        <thead>
                          <tr>
                            <th>SL.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {riders.map((rider, index) => (
                            <tr key={rider._id || index}>
                              <td>{index + 1}</td>
                              <td>{rider.name}</td>
                              <td>{rider.email}</td>
                              <td>
                                <button onClick={() => handleRider(rider)} className='btn btn-info' >Assign</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-action">
                      <form method="dialog">
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