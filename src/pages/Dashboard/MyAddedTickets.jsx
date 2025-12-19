import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyAddedTickets = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["my-tickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/vendor/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tickets/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your ticket has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        My Added Tickets
      </h2>

      {tickets.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-base-content/60">
            You haven't added any tickets yet.
          </p>
          <Link to="/dashboard/addTicket" className="btn btn-primary mt-4">
            Add Ticket
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket._id}
              className="card bg-base-100 shadow-xl border border-base-300"
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title justify-between">
                  {ticket.title}
                  <div className="badge badge-secondary">{ticket.type}</div>
                </h2>
                <p className="text-sm text-base-content/60 line-clamp-2">
                  {ticket.description}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xl font-bold text-primary">
                    ৳{ticket.price}
                  </span>
                  <span className="text-sm text-base-content/60">
                    Qty: {ticket.quantity}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-sm text-base-content/70">
                    Date: {new Date(ticket.date).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-sm font-semibold">Status: </span>
                  <span
                    className={`badge ${
                      ticket.verificationStatus === "approved"
                        ? "badge-success"
                        : ticket.verificationStatus === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {ticket.verificationStatus || "pending"}
                  </span>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/dashboard/updateTicket/${ticket._id}`}
                    className={`btn btn-sm btn-info ${
                      ticket.verificationStatus === "rejected"
                        ? "btn-disabled"
                        : ""
                    }`}
                  >
                    <FaEdit /> Update
                  </Link>
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    className={`btn btn-sm btn-error ${
                      ticket.verificationStatus === "rejected"
                        ? "btn-disabled"
                        : ""
                    }`}
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
