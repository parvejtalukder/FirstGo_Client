import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ApproveRiders = () => {

    const axiosSec = useAxiosSecure();

    const { data: riders = [] } = useQuery({
        queryKey: ["riders", "pending"],
        queryFn: async () => {
            const res = await axiosSec.get("/riders");
            return res.data;
        }
    });

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
                    <th>Area</th>
                    <th>D. Licence</th>
                    <th>NID</th>
                    <th>BIKE ID</th>
                  </tr>
                </thead>
                <tbody>
                    {
                        riders.map(rider => <tr className="bg-base-200">
                    <th>{rider._id}</th>
                    <td>{rider.name}</td>
                    <td>{rider.email}</td>
                    <td>{rider.address}, {rider.district}</td>
                    <td>{rider.licence}</td>
                    <td>{rider.nid}</td>
                    <td>{rider.bike}</td>
                  </tr> )
                    }
                </tbody>
              </table>
            </div>
        </div>
    );
};

export default ApproveRiders;