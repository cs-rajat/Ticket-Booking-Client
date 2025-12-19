import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .post("/payment-success", { sessionId })
        .then((res) => {
          if (res.data.success) {
            setStatus("success");
          } else {
            setStatus("error");
          }
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
        });
    } else {
      setStatus("error");
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          {status === "loading" && (
            <span className="loading loading-spinner loading-lg text-primary"></span>
          )}
          {status === "success" && (
            <>
              <FaCheckCircle className="text-6xl text-success mb-4" />
              <h2 className="card-title text-2xl text-success">
                Payment Successful!
              </h2>
              <p>Your booking has been confirmed.</p>
              <div className="card-actions justify-end mt-6">
                <button
                  onClick={() => navigate("/dashboard/myBookings")}
                  className="btn btn-primary"
                >
                  Go to My Bookings
                </button>
              </div>
            </>
          )}
          {status === "error" && (
            <>
              <FaTimesCircle className="text-6xl text-error mb-4" />
              <h2 className="card-title text-2xl text-error">Payment Failed</h2>
              <p>Something went wrong with your payment verification.</p>
              <div className="card-actions justify-end mt-6">
                <button
                  onClick={() => navigate("/dashboard/myBookings")}
                  className="btn btn-primary"
                >
                  Back to Bookings
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
