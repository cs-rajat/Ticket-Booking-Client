import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const location = useLocation();
  const { ticket, bookingId } = location.state || {};
  const price = ticket?.price || 0;

  return (
    <div className="max-w-screen-md mx-auto py-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-10 text-primary">
        Payment
      </h2>
      <div className="card bg-base-100 shadow-xl p-8">
        <h3 className="text-xl font-semibold mb-4">
          Booking for: {ticket?.from} to {ticket?.to}
        </h3>
        <p className="text-lg mb-6">
          Please pay <span className="font-bold text-primary">৳ {price}</span>{" "}
          to confirm your ticket.
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm ticket={ticket} price={price} bookingId={bookingId} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
