import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";
import AllTickets from "../pages/AllTickets/AllTickets";
import Dashboard from "../pages/Dashboard/Dashboard";
import Payment from "../pages/Payment/Payment";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PrivateRoute from "./PrivateRoute";
import MyBookings from "../pages/Dashboard/MyBookings";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import UserHome from "../pages/Dashboard/UserHome";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import VendorHome from "../pages/Dashboard/VendorHome";
import AddTicket from "../pages/Dashboard/AddTicket";
import MyAddedTickets from "../pages/Dashboard/MyAddedTickets";
import UpdateTicket from "../pages/Dashboard/UpdateTicket";
import RequestedBookings from "../pages/Dashboard/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/RevenueOverview";
import AdminHome from "../pages/Dashboard/AdminHome";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageTickets from "../pages/Dashboard/ManageTickets";
import AdvertiseTickets from "../pages/Dashboard/AdvertiseTickets";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "all-tickets",
        element: (
          <PrivateRoute>
            <AllTickets></AllTickets>
          </PrivateRoute>
        ),
      },
      {
        path: "ticket/:id",
        element: (
          <PrivateRoute>
            <TicketDetails></TicketDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "myBookings",
        element: <MyBookings></MyBookings>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      // Vendor Routes
      {
        path: "vendorHome",
        element: <VendorHome></VendorHome>,
      },
      {
        path: "addTicket",
        element: <AddTicket></AddTicket>,
      },
      {
        path: "myAddedTickets",
        element: <MyAddedTickets></MyAddedTickets>,
      },
      {
        path: "updateTicket/:id",
        element: <UpdateTicket></UpdateTicket>,
      },
      {
        path: "requestedBookings",
        element: <RequestedBookings></RequestedBookings>,
      },
      {
        path: "revenueOverview",
        element: <RevenueOverview></RevenueOverview>,
      },
      // Admin Routes
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "manageTickets",
        element: <ManageTickets></ManageTickets>,
      },
      {
        path: "advertiseTickets",
        element: <AdvertiseTickets></AdvertiseTickets>,
      },
    ],
  },
]);
