import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import {
  FaBus,
  FaTrain,
  FaPlane,
  FaShip,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

const TicketDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [bookingQuantity, setBookingQuantity] = useState(1);

  useEffect(() => {
    axiosPublic
      .get(`/tickets/${id}`)
      .then((res) => {
        setTicket(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, axiosPublic]);

  useEffect(() => {
    if (ticket) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        // Combine date and time for accurate countdown
        // Assuming ticket.date is YYYY-MM-DD and ticket.time is HH:MM AM/PM
        // This might need adjustment based on exact format.
        // For now, using ticket.date as the base.
        const departureTime = new Date(ticket.date).getTime();

        // If ticket.time exists, try to parse it and add to date
        // This is a simplification. Ideally backend sends full ISO string.

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
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [ticket]);

  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "bus":
        return <FaBus className="text-4xl text-primary" />;
      case "train":
        return <FaTrain className="text-4xl text-primary" />;
      case "plane":
      case "flight":
        return <FaPlane className="text-4xl text-primary" />;
      case "launch":
      case "ship":
        return <FaShip className="text-4xl text-primary" />;
      default:
        return <FaBus className="text-4xl text-primary" />;
    }
  };

  const handleBookNow = () => {
    document.getElementById("booking_modal").showModal();
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (bookingQuantity > ticket.quantity) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: "Booking quantity cannot be greater than available seats.",
      });
      return;
    }

    const bookingData = {
      userEmail: user.email,
      userName: user.displayName,
      ticketId: ticket._id,
      price: ticket.price * bookingQuantity,
      quantity: parseInt(bookingQuantity),
      date: new Date(),
      status: "pending",
      from: ticket.from,
      to: ticket.to,
      busName: ticket.busName,
      title: ticket.title,
      image: ticket.image,
      time: ticket.time,
      journeyDate: ticket.date,
    };

    try {
      const res = await axiosSecure.post("/bookings", bookingData);
      if (res.data.insertedId) {
        document.getElementById("booking_modal").close();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Booking Successful!",
          text: "Your booking is pending approval.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myBookings");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ticket Not Found</h2>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left - Ticket Details */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl">
            <figure className="h-80 overflow-hidden">
              <img
                src={ticket.image || "https://via.placeholder.com/800x400"}
                alt={ticket.title || ticket.busName}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="flex items-center gap-3 mb-4">
                {getTransportIcon(ticket.transportType)}
                <div>
                  <h1 className="text-4xl font-bold text-primary">
                    {ticket.title || `${ticket.from} - ${ticket.to}`}
                  </h1>
                  <p className="text-base-content/70 text-lg">
                    {ticket.busName || ticket.companyName}
                  </p>
                </div>
              </div>

              {ticket.isAdvertised && (
                <div className="badge badge-secondary badge-lg mb-4">
                  Featured Ticket
                </div>
              )}

              <div className="divider"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm text-base-content/70">From</p>
                    <p className="text-lg font-semibold">{ticket.from}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm text-base-content/70">To</p>
                    <p className="text-lg font-semibold">{ticket.to}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm text-base-content/70">Journey Date</p>
                    <p className="text-lg font-semibold">
                      {new Date(ticket.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm text-base-content/70">
                      Departure Time
                    </p>
                    <p className="text-lg font-semibold">{ticket.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaUsers className="text-2xl text-primary" />
                  <div>
                    <p className="text-sm text-base-content/70">
                      Available Seats
                    </p>
                    <p className="text-lg font-semibold">
                      {ticket.quantity || ticket.seats} seats
                    </p>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {ticket.description && (
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">Description</h3>
                  <p className="text-base-content/70">{ticket.description}</p>
                </div>
              )}

              {ticket.perks && (
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-3">Perks & Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(ticket.perks) ? (
                      ticket.perks.map((perk, index) => (
                        <span
                          key={index}
                          className="badge badge-primary badge-lg"
                        >
                          {perk}
                        </span>
                      ))
                    ) : (
                      <span className="badge badge-primary badge-lg">
                        {ticket.perks}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right - Booking Summary */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl sticky top-24">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Booking Summary</h2>
              <div className="divider mt-0"></div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-base-content/70">Transport Type:</span>
                  <span className="font-semibold capitalize">
                    {ticket.transportType || "Bus"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Company:</span>
                  <span className="font-semibold">
                    {ticket.busName || ticket.companyName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Route:</span>
                  <span className="font-semibold">
                    {ticket.from} → {ticket.to}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Date:</span>
                  <span className="font-semibold">
                    {new Date(ticket.date).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">Time:</span>
                  <span className="font-semibold">{ticket.time}</span>
                </div>
              </div>

              <div className="divider"></div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">Total Price:</span>
                <span className="text-3xl font-bold text-primary">
                  ৳{ticket.price}
                </span>
              </div>

              <div className="mb-4 text-center">
                <p className="text-sm text-base-content/60 mb-1">
                  Time Remaining
                </p>
                <p
                  className={`text-xl font-mono font-bold ${
                    isExpired ? "text-red-500" : "text-green-600"
                  }`}
                >
                  {timeLeft}
                </p>
              </div>

              <button
                onClick={handleBookNow}
                disabled={isExpired || ticket.quantity === 0}
                className="btn btn-primary btn-lg w-full disabled:bg-base-300 disabled:text-base-content/40"
              >
                {isExpired
                  ? "Expired"
                  : ticket.quantity === 0
                  ? "Sold Out"
                  : "Book Now"}
              </button>

              <button
                onClick={() => navigate("/all-tickets")}
                className="btn btn-outline btn-primary w-full mt-2"
              >
                View More Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <dialog id="booking_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Confirm Booking</h3>
          <form onSubmit={handleBookingSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ticket Quantity</span>
              </label>
              <input
                type="number"
                min="1"
                max={ticket.quantity}
                value={bookingQuantity}
                onChange={(e) => setBookingQuantity(e.target.value)}
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <span className="label-text-alt text-base-content/60">
                  Available: {ticket.quantity}
                </span>
              </label>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text font-bold">Total Cost</span>
              </label>
              <p className="text-2xl font-bold text-primary">
                ৳ {ticket.price * bookingQuantity}
              </p>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("booking_modal").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default TicketDetails;
