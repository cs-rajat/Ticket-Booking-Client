import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const VendorHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalSales: 0,
    newBookings: 0,
    totalRevenue: 0,
    chartData: [],
  });

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/vendor-stats/${user.email}`).then((res) => {
        setStats(res.data);
      });
    }
  }, [user?.email, axiosSecure]);

  const { totalSales, newBookings, totalRevenue, chartData } = stats;

  return (
    <div className="w-full p-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        Vendor Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat bg-base-100 shadow-xl rounded-xl border border-base-300">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Sales</div>
          <div className="stat-value text-primary">{totalSales}</div>
          <div className="stat-desc">Tickets Sold</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-xl border border-base-300">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">New Bookings</div>
          <div className="stat-value text-secondary">{newBookings}</div>
          <div className="stat-desc">Total Bookings</div>
        </div>

        <div className="stat bg-base-100 shadow-xl rounded-xl border border-base-300">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">৳ {totalRevenue}</div>
          <div className="stat-desc">Paid Bookings</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-base-100 p-6 rounded-xl shadow-xl border border-base-300">
          <h3 className="text-xl font-bold mb-4 text-center">
            Monthly Revenue
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow-xl border border-base-300">
          <h3 className="text-xl font-bold mb-4 text-center">Ticket Sales</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body items-center text-center">
          <div className="avatar mb-4">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
              />
            </div>
          </div>
          <h2 className="card-title text-2xl">{user?.displayName}</h2>
          <p className="text-base-content/70">{user?.email}</p>
          <div className="divider"></div>
          <div className="w-full text-left">
            <h3 className="text-lg font-semibold mb-4">Account Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm text-base-content/60">Role</p>
                <p className="font-bold text-primary uppercase">Vendor</p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm text-base-content/60">User ID</p>
                <p className="font-mono text-sm truncate" title={user?.uid}>
                  {user?.uid}
                </p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm text-base-content/60">Last Login</p>
                <p className="font-medium">{user?.metadata?.lastSignInTime}</p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm text-base-content/60">Account Created</p>
                <p className="font-medium">{user?.metadata?.creationTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHome;
