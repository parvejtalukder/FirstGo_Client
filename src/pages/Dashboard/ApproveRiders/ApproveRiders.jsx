import { useQuery } from '@tanstack/react-query';
import React, { } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye, FaStreetView, FaUserCheck } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import { GrFormView } from "react-icons/gr";

const ApproveRiders = () => {

    const axiosSec = useAxiosSecure();
    // const riderRef = useRef();

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ["riders", "pending"],
        queryFn: async () => {
            const res = await axiosSec.get("/riders");
            return res.data;
        }
    });

    const updateRiderStatus = (rider, status) => {
      const updateRider = { status: status, email: rider.email };
      axiosSec.patch(`/riders/${rider._id}`, updateRider)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `Rider has been ${status}!`,
            icon: "success",
            timer: 1000,
            position: "center",
            showConfirmButton: false,
            // timerProgressBar: 
          })
        }
      })
    }

    const handleApprove = (rider) => {
      updateRiderStatus(rider, "approved");
    }

    const handleReject = (rider) => {
      updateRiderStatus(rider, "rejected");
    }

    // const handleDelete = (rider) => {

    // }

    return (
        <div className='p-10'>
            <h2>Riders Waiting for Approval ({riders.length}) </h2>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Work</th>
                    <th>District</th>
                    <th>D. Licence</th>
                    {/* <th>NID</th> */}
                    <th>Bike ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        riders.map(rider => <tr className="bg-base-200">
                    <th>{rider._id}</th>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>{
                      <p className={`${rider.status === 'pending' || rider.status === 'rejected' ? 'text-red-500 font-bold' : 'text-green-900 font-bold'}`}>{`${rider.status}`}</p>
                      }</td>
                    <td>{rider.workStatus || "N/A"}</td>
                    <td>{rider.district}</td>
                    <td>{rider.licence}</td>
                    {/* <td>{rider.nid}</td> */}
                    <td>{rider.bike}</td>
                    <td className='flex justify-around items-center'>
                      <button 
                      // onClick={ () => handleApprove(rider)} 
                      className='btn bg-green-500'><FaEye></FaEye></button>
                      <button 
                      onClick={ () => handleApprove(rider)} 
                      className='btn bg-green-500'><FaUserCheck></FaUserCheck></button>
                      <button 
                      onClick={ () => handleReject(rider)} 
                      className='btn bg-yellow-500'><FaUserTimes></FaUserTimes></button>
                    </td>
                  </tr> )
                    }
                </tbody>
              </table>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
        </div>
    );
};

export default ApproveRiders;