import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { DeleteIcon, EditIcon } from 'lucide-react';
import { IoRemoveCircle } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {

    const { user } = useAuth(); 
    const axios = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/parcels?email=${user?.email}`);
            return res.data;
        }
    });

    const handleParcelDelete = (id) => {
        console.log(id)
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            /// 
            axios.delete(`/parcels/${id}`)
            .then(res => {
                // console.log(res);
                if (res.data.deletedCount) {
                    refetch();
                    Swal.fire({
                        title: "Deleted",
                        text: "Your parcel is deleted!",
                        icon: "success"
                    })
                }
            })
          }
        });

    }

    const handlePayment = async (CurrParcel) => {

      const paymentInfo = {
        cost: CurrParcel.cost,
        parcelId: CurrParcel._id,
        senderEmail: CurrParcel.senderEmail,
        parcelName: CurrParcel.parcelName
      }

      const res = await axios.post("/do-payment", paymentInfo);
      window.location.assign(res.data.url);
      // console.log(res.data.url)

    }

    return (
        <div>
            <p>All of My Parcels {parcels.length}</p>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Weight (KG)</th>
                    <th>Cost (BDT)</th>
                    <th>Delivery Status</th>
                    <th>Tracking ID</th>
                    <th>Payment</th>
                    <th>CreatedAt</th>
                    {/* <th>Payment</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    parcels.map((parcel, idx) => (
                    <tr key={parcel._id}>
                        <th>{idx + 1}</th>
                        <td>{parcel.parcelName}</td>
                        <td>{parcel.parcelType}</td>
                        <td>{parcel.parcelWeight}</td>
                        <td>{parcel.cost} </td>
                        <td>{parcel.deliveryStatus}</td>
                        <td><Link className='text-blue-500' to={`/track-percel/${parcel.trackingId}`}>{parcel.trackingId}</Link></td>
                        <td>
                          {
                            parcel.paymentStatus === "pending"
                              ? <button onClick={() => handlePayment(parcel)} className="btn bg-red-400 p-2">Pay</button>
                              : <Link className="btn bg-green-400 p-2">Paid</Link>
                          }
                        </td>
                        <td>{parcel.createdAt} </td>
                        <td className='flex gap-0.5'>
                            <button className='btn btn-square text-green-700'><EditIcon></EditIcon></button>
                            <button onClick={() => handleParcelDelete(parcel._id)} className='btn btn-square text-red-600'><IoRemoveCircle></IoRemoveCircle></button>
                        </td>
                    </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
        </div>
    );
};

export default MyParcels;