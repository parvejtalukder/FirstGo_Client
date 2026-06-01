import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import useAuth from '../../../../hooks/useAuth';

const COLORS = {
    delivered: "#22c55e",
    assigned: "#3b82f6",
    pending: "#f59e0b",
    cancelled: "#ef4444"
};

const Rider = () => {

    const axios = useAxiosSecure();
    const { user } = useAuth();

    const { data: parcels = [] } = useQuery({
        queryKey: ["rider-delivery", user?.email],
        queryFn: async () => {
            const res = await axios.get(
                `/parcels/rider/d-per-day?email=${user?.email}`
            );
            return res.data;
        }
    });

    // ✅ transform parcels → status summary
    const chartData = parcels.reduce((acc, item) => {
        const status = item.deliveryStatus;

        const existing = acc.find(i => i.name === status);

        if (existing) {
            existing.value += 1;
        } else {
            acc.push({
                name: status,
                value: 1
            });
        }

        return acc;
    }, []);

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
                <div className='grid grid-cols-2 w-full'>
                    {chartData.map((stats, index) => (
                        <div key={index} className="stat place-items-center">
                            <div className="stat-title text-2xl capitalize">
                                {stats.name}
                            </div>
                            <div className="stat-value">
                                {stats.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Rider;