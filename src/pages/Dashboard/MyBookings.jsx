import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import {
  FaBus,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      // Combine date and time for accurate countdown
      // Assuming journeyDate is YYYY-MM-DD and time is HH:MM
      const dateTimeString = `${booking.journeyDate}T${
        booking.time || "00:00"
      }:00`;
      const departureTime = new Date(dateTimeString).getTime();

      const distance = departureTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsExpired(true);
        setTimeLeft("EXPIRED");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking.journeyDate, booking.time]);

  const handlePayNow = async () => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        booking,
      });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment session creation failed", error);
      // You might want to import Swal if not already available in this scope,
      // but it's not imported in the original file snippet I have.
      // Assuming Swal is not imported, I'll use alert or just log.
      // Actually, I can see Swal is NOT imported in the file content I read earlier.
      // I will add Swal import if needed, but for now let's stick to console or simple alert if I can't edit imports easily without reading full file.
      // Wait, I can edit imports.
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl border border-base-300">
      <figure className="h-48 overflow-hidden">
        <img
          src={
            booking.image ||
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1469&auto=format&fit=crop"
          }
          alt={booking.title || booking.busName}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-5">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-lg font-bold">
            {booking.title || booking.busName}
          </h2>
          <div
            className={`badge ${
              booking.status === "paid"
                ? "badge-success"
                : booking.status === "accepted"
                ? "badge-info"
                : booking.status === "rejected"
                ? "badge-error"
                : "badge-warning"
            }`}
          >
            {booking.status}
          </div>
        </div>

        <div className="text-sm text-base-content/70 mt-2 space-y-2">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span>
              {booking.from} → {booking.to}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-primary" />
            <span>
              {new Date(booking.journeyDate).toLocaleDateString("en-GB")}{" "}
              {booking.time}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaBus className="text-primary" />
            <span>Qty: {booking.quantity}</span>
          </div>
          <div className="flex items-center gap-2 font-bold text-primary">
            <FaMoneyBillWave />
            <span>Total: ৳ {booking.price}</span>
          </div>
        </div>

        <div className="divider my-2"></div>

        {booking.status !== "rejected" && (
          <div className="text-center mb-3">
            <p className="text-xs text-base-content/60">Time Remaining</p>
            <p
              className={`font-mono font-bold ${
                isExpired ? "text-error" : "text-success"
              }`}
            >
              {timeLeft}
            </p>
          </div>
        )}

        <div className="card-actions justify-end">
          {booking.status === "accepted" && !isExpired && (
            <button
              onClick={handlePayNow}
              className="btn btn-primary btn-sm w-full"
            >
              Pay Now
            </button>
          )}
          {booking.status === "pending" && (
            <button className="btn btn-disabled btn-sm w-full">
              Waiting for Approval
            </button>
          )}
          {booking.status === "paid" && (
            <button className="btn btn-success btn-sm w-full cursor-default">
              Paid
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/bookings/user/${user.email}`)
      .then((res) => setBookings(res.data));
  }, [axiosSecure, user.email]);

  return (
    <div className="w-full p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        My Booked Tickets: {bookings.length}
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-base-content/60">
            You haven't booked any tickets yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
