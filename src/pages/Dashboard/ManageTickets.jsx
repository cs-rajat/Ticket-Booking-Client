import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/admin");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleApproveTicket = (ticket) => {
    axiosSecure
      .patch(`/tickets/status/${ticket._id}`, { status: "approved" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Ticket Approved!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleRejectTicket = (ticket) => {
    axiosSecure
      .patch(`/tickets/status/${ticket._id}`, { status: "rejected" })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Ticket Rejected!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleDeleteTicket = (ticket) => {
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
        axiosSecure.delete(`/tickets/${ticket._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Ticket has been deleted.",
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
        Manage Tickets
      </h2>
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl border border-base-300">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id} className="hover">
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={ticket.image} alt={ticket.title} />
                    </div>
                  </div>
                </td>
                <td>{ticket.title}</td>
                <td>
                  <div className="font-bold">{ticket.vendorName}</div>
                  <div className="text-sm opacity-50">{ticket.vendorEmail}</div>
                </td>
                <td>৳ {ticket.price}</td>
                <td>
                  <div
                    className={`badge ${
                      ticket.verificationStatus === "approved"
                        ? "badge-success"
                        : ticket.verificationStatus === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {ticket.verificationStatus || "pending"}
                  </div>
                </td>
                <td className="flex justify-center gap-2">
                  {ticket.verificationStatus !== "approved" && (
                    <button
                      onClick={() => handleApproveTicket(ticket)}
                      className="btn btn-sm btn-success"
                    >
                      Approve
                    </button>
                  )}
                  {ticket.verificationStatus !== "rejected" && (
                    <button
                      onClick={() => handleRejectTicket(ticket)}
                      className="btn btn-sm btn-error"
                    >
                      Reject
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteTicket(ticket)}
                    className="btn btn-sm btn-ghost text-red-600"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
