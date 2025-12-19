import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestedBookings = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axiosSecure.get(`/bookings/vendor/${user.email}`);
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email, axiosSecure]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/bookings/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        fetchBookings();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Booking ${status} successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Failed to update status", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        Requested Bookings
      </h2>
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>#</th>
              <th>User Name/Email</th>
              <th>Ticket Title</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-base-content/60"
                >
                  No requested bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-bold">{booking.userName}</div>
                    <div className="text-sm opacity-50">
                      {booking.userEmail}
                    </div>
                  </td>
                  <td>{booking.title || booking.busName}</td>
                  <td>{booking.quantity}</td>
                  <td className="font-bold">৳ {booking.price}</td>
                  <td>
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
                  </td>
                  <td className="flex justify-center gap-2">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusUpdate(booking._id, "accepted")
                          }
                          className="btn btn-sm btn-success"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(booking._id, "rejected")
                          }
                          className="btn btn-sm btn-error"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {booking.status !== "pending" && (
                      <span className="text-base-content/60 text-sm italic">
                        {booking.status === "paid"
                          ? "Payment Completed"
                          : "Action Taken"}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;
