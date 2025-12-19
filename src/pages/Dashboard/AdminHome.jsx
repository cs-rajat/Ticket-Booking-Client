import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

const AdminHome = () => {
  const { user } = useContext(AuthContext);

  const data = [
    { name: "Bus", tickets: 400, pv: 2400, amt: 2400 },
    { name: "Air", tickets: 300, pv: 1398, amt: 2210 },
    { name: "Train", tickets: 200, pv: 9800, amt: 2290 },
    { name: "Launch", tickets: 278, pv: 3908, amt: 2000 },
  ];

  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="w-full p-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        Admin Dashboard Overview
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
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
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
          <div className="stat-title">New Users</div>
          <div className="stat-value text-secondary">4,200</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
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
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-base-100 p-6 rounded-xl shadow-xl border border-base-300">
          <h3 className="text-xl font-bold mb-4 text-center">
            Ticket Sales by Category
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
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
                <Bar dataKey="tickets" fill="#F97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-base-100 p-6 rounded-xl shadow-xl border border-base-300">
          <h3 className="text-xl font-bold mb-4 text-center">
            User Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
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
                <p className="font-bold text-primary uppercase">Admin</p>
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

export default AdminHome;
