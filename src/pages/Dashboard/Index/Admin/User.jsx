import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router";

const COLORS = {
  delivered: "#22c55e",
  assigned: "#3b82f6",
  pending: "#f59e0b",
  cancelled: "#ef4444",
};

const User = () => {
  const axios = useAxiosSecure();
  const { user } = useAuth();

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const total = parcels.length;

  const delivered = parcels.filter(
    (parcel) => parcel.deliveryStatus === "delivered"
  ).length;

  const assigned = parcels.filter(
    (parcel) => parcel.deliveryStatus === "assigned"
  ).length;

  const pending = parcels.filter(
    (parcel) => parcel.deliveryStatus === "pending"
  ).length;

  const cancelled = parcels.filter(
    (parcel) => parcel.deliveryStatus === "cancelled"
  ).length;

  const chartData = [
    { name: "delivered", value: delivered },
    { name: "assigned", value: assigned },
    { name: "pending", value: pending },
    { name: "cancelled", value: cancelled },
  ];

  return (
    <div className="p-6 space-y-8">

      {/* Welcome */}
      <div>
        <h2 className="text-3xl font-bold">
          Welcome Back 
        </h2>
        <p className="text-gray-500">
          Track your parcel activities and delivery progress.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Total Parcels</div>
          <div className="stat-value">{total}</div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Delivered</div>
          <div className="stat-value text-success">
            {delivered}
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Assigned</div>
          <div className="stat-value text-info">
            {assigned}
          </div>
        </div>

        <div className="stat bg-base-100 shadow rounded-box">
          <div className="stat-title">Pending</div>
          <div className="stat-value text-warning">
            {pending}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-base-100 shadow rounded-box p-6">
        <h3 className="text-xl font-semibold mb-5">
          Parcel Status Overview
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[entry.name]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Parcels */}
      <div className="bg-base-100 shadow rounded-box p-6">
        <h3 className="text-xl font-semibold mb-4">
          Recent Parcels
        </h3>

        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Receiver</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {parcels.slice(0, 5).map((parcel) => (
                <tr key={parcel._id}>
                  <td><Link className="text-blue-400" to={`/track-percel/${parcel.trackingId}`} >{parcel.trackingId}</Link></td>
                  <td>{parcel.receiverName}</td>
                  <td>
                    <span className="badge badge-outline capitalize">
                      {parcel.deliveryStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
};

export default User;