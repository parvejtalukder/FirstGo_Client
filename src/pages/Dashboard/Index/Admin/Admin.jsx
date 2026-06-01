import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = {
    delivered: "#22c55e",
    assigned: "#3b82f6",
    pending: "#f59e0b",
    cancelled: "#ef4444"
};

const Admin = () => {

    const axios = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ["delivery-stats"],
        queryFn: async () => {
            const res = await axios.get("/parcels/delivery/status");
            return res.data;
        }
    });

    const chartData = parcels.map(item => ({
        name: item._id,
        value: item.count
    }));

    return (
        <div className='max-w-5xl mx-auto p-10 flex flex-col items-center gap-10'>

            {/* PIE CHART */}
            <div className="w-full flex justify-center">
                <PieChart width={400} height={400}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={130}
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[entry.name] || "#8884d8"}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>

            {/* STATS CARDS */}
            <div className="stats shadow w-full">
                <div className='grid grid-cols-2'>
                {parcels.map((stats, index) => (
                    <div key={index} className="stat place-items-center">
                        <div className="stat-title text-2xl capitalize">
                            {stats._id}
                        </div>
                        <div className="stat-value">
                            {stats.count}
                        </div>
                    </div>
                ))}
                </div>
            </div>

        </div>
    );
};

export default Admin;