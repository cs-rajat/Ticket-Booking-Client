import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tickets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["approved-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/admin");
      return res.data.filter(
        (ticket) => ticket.verificationStatus === "approved"
      );
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleAdvertiseToggle = async (ticket) => {
    const newStatus = !ticket.advertised;

    try {
      const res = await axiosSecure.patch(`/tickets/advertise/${ticket._id}`, {
        advertised: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: newStatus
            ? "Ticket Advertised!"
            : "Ticket Removed from Advertisement",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res.data.message) {
        Swal.fire({
          icon: "error",
          title: "Limit Reached",
          text: res.data.message,
        });
      }
    } catch (error) {
      console.error(error);
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
        Advertise Tickets
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
              <th className="text-center">Advertise</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-base-content/60"
                >
                  No approved tickets found.
                </td>
              </tr>
            ) : (
              tickets.map((ticket, index) => (
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
                    <div className="text-sm opacity-50">
                      {ticket.vendorEmail}
                    </div>
                  </td>
                  <td>৳ {ticket.price}</td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={ticket.advertised || false}
                      onChange={() => handleAdvertiseToggle(ticket)}
                    />
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

export default AdvertiseTickets;
