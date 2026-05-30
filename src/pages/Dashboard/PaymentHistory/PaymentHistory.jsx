import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistory = () => {

    const { user } = useAuth();
    const axios = useAxiosSecure();
    const { data: payments = []} = useQuery({
        queryKey: ['payments', user.email],
        queryFn:  async () => {
            const res = await axios.get(`/payments?email=${user.email}`)
            return res.data;
        }
    })

    return (
        <div>
            <p>Payment Hisotry</p>
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Parcel Name</th>
                    <th>Transaction Id</th>
                    <th>Tracking Id</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    payments.map((payment, idx) => (
                    <tr key={payment._id}>
                        <th>{idx + 1}</th>
                        <td>{payment.parcelName}</td>
                        <td>{payment.transactionId}</td>
                        <td>{payment.trackingId || "FGO-12345678"}</td>
                        <td>{payment.amount} ({payment.currency})</td>
                        <td>{payment.paidAt}</td>
                    </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
        </div>
    );
};

export default PaymentHistory;