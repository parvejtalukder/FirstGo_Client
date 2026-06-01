import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBoxOpen, FaHandshake, FaInbox, FaInfo, FaTrash, FaTruckPickup } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosReturnLeft } from "react-icons/io";





const AssignedTasks = () => {
    const { user } = useAuth();
    const axios = useAxiosSecure();

    const { data: parcels = [], isLoading, refetch } = useQuery({
        queryKey: ['parcels', 'assigned', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axios.get(
                `/parcels/rider?riderEmail=${user.email}&deliveryStatus=assigned`
            );
            return res.data;
        },
    });

    const handleAceeptTask = (parcel) => {
        const parcelInfo = {
            deliveryStatus: "rider-arriving",
            ridertrackingId: parcel.trackingId,
        }
        axios.patch(`/parcels/${parcel._id}/status`, parcelInfo)
        .then(res => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    title: "Task Received!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
        })
    }

    const handlePickedUpTask = (parcel) => {
        const parcelInfo = {
            deliveryStatus: "picked-up",
            ridertrackingId: parcel.trackingId,
        }
        axios.patch(`/parcels/${parcel._id}/status`, parcelInfo)
        .then(res => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    title: "Parcel Picked Up!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
        })
    }

    const handleDeliveredTask = (parcel) => {
        const parcelInfo = {
            deliveryStatus: "delivered",
            ridertrackingId: parcel.trackingId,
        }
        axios.patch(`/parcels/${parcel._id}/status?riderEmail=${parcel.riderEmail}`, parcelInfo)
        .then(res => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    title: "Parcel Delevered!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
        })
    }

    const handleReturnedTask = (parcel) => {
        const parcelInfo = {
            deliveryStatus: "returned",
            ridertrackingId: parcel.trackingId,
        }
        axios.patch(`/parcels/${parcel._id}/status`, parcelInfo)
        .then(res => {
            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    title: "Parcel Returned!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
        })
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-5">
            <h2 className="text-3xl font-bold mb-6">
                Tasks Assigned To Me ({parcels.length})
            </h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>Name</th>
                            <th>Reciever name</th>
                            <th>Weight</th>
                            <th>Cost</th>
                            <th>Delivery Status</th>
                            <th>Pickup District</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.length > 0 ? (
                            parcels.map((parcel, index) => (
                                <tr key={parcel._id}>
                                    <th>{index + 1}</th>
                                    <td>{parcel.parcelName}</td>
                                    <td>{parcel.receiverName}</td>
                                    <td>{parcel.parcelWeight}</td>
                                    <td>৳ {parcel.cost}</td>
                                    <td>
                                        <span className="badge p-5 text-wrap badge-info">
                                            {parcel.deliveryStatus}
                                        </span>
                                    </td>
                                    <td>{parcel.senderDistrict}</td>
                                    <td>
                                        {new Date(
                                            parcel.createdAt
                                        ).toLocaleString()}
                                    </td>
                                    <td className='flex gap-2 items-center'>
                                        {parcel.deliveryStatus === 'assigned' && (
                                            <>
                                                <button
                                                    onClick={() => handleAceeptTask(parcel)}
                                                    className='btn btn-ghost bg-blue-100 text-green-700'
                                                >
                                                    <FaHandshake /> Accept
                                                </button>
                                        
                                                <button className='btn btn-ghost bg-red-100 text-red-500'>
                                                    <FaTrash /> Reject
                                                </button>
                                            </>
                                        )}

                                        {parcel.deliveryStatus === 'rider-arriving' && (
                                            <button
                                                onClick={() => handlePickedUpTask(parcel)}
                                                className='btn btn-ghost bg-blue-100 text-green-700'
                                            >
                                                <FaTruckPickup /> Picked Up
                                            </button>
                                        )}

                                        {parcel.deliveryStatus === 'picked-up' && (
                                            <>
                                                <button
                                                    onClick={() => handleDeliveredTask(parcel)}
                                                    className='btn btn-ghost bg-green-100 text-green-700'
                                                >
                                                    <FaCircleCheck /> Delivered
                                                </button>
                                        
                                                <button
                                                    onClick={() => handleReturnedTask(parcel)}
                                                    className='btn btn-ghost bg-red-100 text-red-500'
                                                >
                                                    <IoIosReturnLeft /> Returned
                                                </button>
                                            </>
                                        )}

                                        {parcel.deliveryStatus === 'delivered' && (
                                            <>
                                                <button
                                                    // onClick={() => handleDeliveredTask(parcel)}
                                                    className='btn btn-ghost bg-green-100 text-green-700'
                                                >
                                                    <FaCircleCheck /> Completed
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="text-center py-10 text-gray-500"
                                >
                                    No assigned parcels found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedTasks;