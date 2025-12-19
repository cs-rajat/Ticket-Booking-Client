import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="card lg:card-side bg-base-100 shadow-2xl max-w-4xl w-full overflow-hidden rounded-2xl">
        {/* Left Side - Image/Gradient */}
        <div className="lg:w-1/2 bg-primary relative flex flex-col justify-center items-center text-primary-content p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
            <p className="text-lg mb-8">
              Access your dashboard, manage bookings, and explore new
              destinations with TicketBari.
            </p>
            <div className="hidden lg:block">
              {/* You can add an illustration here if you have one */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-32 h-32 mx-auto opacity-80"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-base-content">Login</h2>
            <p className="text-base-content/60 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-base-content/50" />
                </div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10 focus:input-primary"
                />
              </div>
              {errors.email && (
                <span className="text-error text-sm mt-1">
                  Email is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-base-content/50" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-10 pr-10 focus:input-primary"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50 hover:text-primary cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-sm mt-1">
                  Password is required
                </span>
              )}
              <label className="label justify-end">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-primary"
                >
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary w-full text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Login
              </button>
            </div>
          </form>

          <div className="divider text-base-content/60 my-6">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-base-200 transition-colors"
          >
            <FaGoogle className="text-error" />
            <span>Login with Google</span>
          </button>

          <p className="text-center mt-6 text-base-content/70">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-bold link link-hover"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
