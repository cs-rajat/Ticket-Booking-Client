import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ ticket, price, bookingId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: price })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // save the payment in the database
        const payment = {
          email: user.email,
          price: price,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert. use moment js to
          bookingId: bookingId,
          ticketId: ticket._id,
          quantity: ticket.quantity,
          status: "succeeded",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res.data);
        if (res.data?.paymentResult?.insertedId || res.data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for the payment",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/myBookings");
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-primary btn-sm mt-4 w-full"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-error mt-2">{error}</p>
      {transactionId && (
        <p className="text-success"> Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
