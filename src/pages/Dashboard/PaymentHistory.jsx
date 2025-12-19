import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get(`/bookings/user/${user.email}`).then((res) => {
      // Filter only paid bookings for transaction history
      const paidBookings = res.data.filter(
        (booking) => booking.status === "paid"
      );
      setPayments(paidBookings);
    });
  }, [axiosSecure, user.email]);

  return (
    <div className="w-full p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        Transaction History
      </h2>
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-300">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Ticket Title</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-base-content/60"
                >
                  No transaction history found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr key={payment._id}>
                  <th>{index + 1}</th>
                  <td className="font-mono text-xs md:text-sm">
                    {payment.transactionId}
                  </td>
                  <td>
                    {payment.title || payment.busName} ({payment.from} -{" "}
                    {payment.to})
                  </td>
                  <td className="font-bold text-green-600">
                    ৳ {payment.price}
                  </td>
                  <td>
                    {new Date(payment.date).toLocaleDateString("en-GB")}{" "}
                    {new Date(payment.date).toLocaleTimeString()}
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

export default PaymentHistory;
