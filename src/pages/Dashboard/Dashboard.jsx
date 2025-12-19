import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useVendor from "../../hooks/useVendor";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaTicketAlt,
  FaWallet,
  FaCalendarAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isVendor] = useVendor();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col p-4 md:p-8 bg-base-200 min-h-screen">
        {/* Page content here */}
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary">
            Welcome to Dashboard, {user?.displayName}
          </h2>
          <Outlet></Outlet>
        </div>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden mt-4 w-fit mx-auto"
        >
          Open Menu
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {isAdmin ? (
            <>
              <li className="mb-2">
                <NavLink to="/dashboard/adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/manageUsers">
                  <FaUsers /> Manage Users
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/manageTickets">
                  <FaTicketAlt /> Manage Tickets
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/advertiseTickets">
                  <FaTicketAlt /> Advertise Tickets
                </NavLink>
              </li>
            </>
          ) : isVendor ? (
            <>
              <li className="mb-2">
                <NavLink to="/dashboard/vendorHome">
                  <FaHome /> Vendor Profile
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/addTicket">
                  <FaTicketAlt /> Add Ticket
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/myAddedTickets">
                  <FaTicketAlt /> My Added Tickets
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/requestedBookings">
                  <FaCalendarAlt /> Requested Bookings
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/revenueOverview">
                  <FaWallet /> Revenue Overview
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="mb-2">
                <NavLink to="/dashboard/userHome">
                  <FaHome /> User Profile
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/myBookings">
                  <FaCalendarAlt /> My Booked Tickets
                </NavLink>
              </li>
              <li className="mb-2">
                <NavLink to="/dashboard/paymentHistory">
                  <FaWallet /> Transaction History
                </NavLink>
              </li>
            </>
          )}
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/all-tickets">
              <FaTicketAlt /> All Tickets
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
