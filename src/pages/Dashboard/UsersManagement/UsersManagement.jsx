import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { HiUserPlus, HiUserMinus } from "react-icons/hi2";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const UsersManagement = () => {

    const axiosSec = useAxiosSecure();
    const [txt, setTxt] = useState("");

    const { refetch, data: users = [] } = useQuery({
        queryKey: ["users", txt],
        queryFn: async () => {
            const res = await axiosSec.get(`/users?search=${txt}`);
            return res.data;
        }
    })

    const handleMakeUser = async (user) => {
        const roleBook = { role: 'admin' };
        const result = await Swal.fire({
                title: "Are you sure?",
                text: `Add admin access for ${user.displayName}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#6b7280",
                confirmButtonText: "Yes, Make Admin",
                cancelButtonText: "Cancel",
            });
        if (!result.isConfirmed) return;   
        axiosSec.patch(`/users/${user._id}`, roleBook)
        .then((res) => {
            if (res.data.modifiedCount) {
                refetch();
                console.log(res.data);
                Swal.fire({
                    title: `${user.displayName} is Admin Now!`,
                    position: "center",
                    timer: 1000,
                    showConfirmButton: true,
                    icon: "success",
                })
            }
        })
    }

    const handleRemoveAdmin = async (user) => {
        const roleBook = { role: 'user' };
        const result = await Swal.fire({
                title: "Are you sure?",
                text: `Remove admin access from ${user.displayName}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#6b7280",
                confirmButtonText: "Yes, Remove Admin",
                cancelButtonText: "Cancel",
            });
        if (!result.isConfirmed) return;    
        axiosSec.patch(`/users/${user._id}/role`, roleBook)
        .then((res) => {
            if (res.data.modifiedCount) {
                refetch();
                console.log(res.data);
                Swal.fire({
                    title: `${user.displayName} is Not Admin Now!`,
                    position: "center",
                    timer: 1000,
                    showConfirmButton: false,
                    // show
                    icon: "success",
                })
            }
        })
    }

    console.log(txt);

    return (
        <div className='p-5 max-w-6xl mx-auto'>
            <div className='flex justify-between items-center'>
            <h2 className='text-4xl'>Manage Users ({users.length})</h2>
            <label className="input items-center">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input onChange={(e) => setTxt(e.target.value)} type="search" required placeholder="Search Users" />
            </label></div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User ID</th>
                    <th>Role Toggle</th>
                    {/* <th>Favorite Color</th> */}
                    {/* <th></th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user, idx) =>                   
                    <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={user.photoURL}
                              alt={user.displayName} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.displayName}</div>
                          <div className="text-sm opacity-50 font-bold">{user.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                        {
                            user.email
                        }
                    </td>
                    <td>
                       <div>
                         <div className="font-bold">{user._id}</div>
                         {/* <div className="text-sm opacity-50 font-bold">{user.role}</div> */}
                       </div>
                    </td>
                    <td className='flex justify-between items-center'>
                        {
                            user.role === 'admin' ?
                            <button onClick={() => handleRemoveAdmin(user)} className='btn btn-dash'><HiUserMinus className="text-xl text-error" /></button>
                            : <button onClick={() => handleMakeUser(user)} className='btn btn-dash'><HiUserPlus className="text-xl text-success" /></button>
                        }
                    </td>
                    {/* <td>{photoUR}</td> */}
                  </tr>)
                  }
                </tbody>
              </table>
            </div>
        </div>
    );
};

export default UsersManagement;