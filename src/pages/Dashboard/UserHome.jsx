import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const UserHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full p-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        User Dashboard Overview
      </h2>

      {/* Stats Cards for User */}
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
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Bookings</div>
          <div className="stat-value text-primary">12</div>
          <div className="stat-desc">Lifetime bookings</div>
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Upcoming Trips</div>
          <div className="stat-value text-secondary">2</div>
          <div className="stat-desc">Next trip in 3 days</div>
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Spent</div>
          <div className="stat-value">৳ 8,500</div>
          <div className="stat-desc">Last month</div>
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
                <p className="font-bold text-primary uppercase">User</p>
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

export default UserHome;
