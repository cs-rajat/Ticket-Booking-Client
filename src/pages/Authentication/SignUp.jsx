import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const res = await axios.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const photoURL = res.data.data.display_url;
        createUser(data.email, data.password)
          .then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, photoURL)
              .then(() => {
                // create user entry in the database
                const userInfo = {
                  name: data.name,
                  email: data.email,
                };
                axiosPublic.post("/users", userInfo).then((res) => {
                  if (res.data.insertedId) {
                    console.log("user added to the database");
                    reset();
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "User created successfully.",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    navigate("/");
                  }
                });
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.message,
            });
          });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image upload failed",
      });
    }
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
          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full overflow-hidden">
        <div className="lg:w-1/2 bg-primary relative flex flex-col justify-center items-center text-primary-content p-10">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80)",
            }}
          ></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to TicketBari</h2>
            <p className="mb-6 text-lg">
              Join our community and start your journey today. Book tickets,
              explore destinations, and more.
            </p>
          </div>
        </div>

        <div className="lg:w-1/2 p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-center mb-6 text-primary">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Your Name"
                  className="input input-bordered w-full pl-10 focus:input-primary"
                />
              </div>
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">
                  Name is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Photo</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  {...register("image", { required: true })}
                  className="file-input file-input-bordered file-input-primary w-full"
                />
              </div>
              {errors.image && (
                <span className="text-red-500 text-xs mt-1">
                  Photo is required
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email@example.com"
                  className="input input-bordered w-full pl-10 focus:input-primary"
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs mt-1">
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
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[a-z])/,
                  })}
                  placeholder="********"
                  className="input input-bordered w-full pl-10 focus:input-primary"
                />
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be 6 characters
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be less than 20 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-xs mt-1">
                  Password must have one Uppercase and one lower case letter.
                </p>
              )}
            </div>

            <div className="form-control mt-6">
              <input
                className="btn btn-primary w-full text-lg font-bold"
                type="submit"
                value="Sign Up"
              />
            </div>
          </form>

          <div className="divider text-base-content/60">OR</div>

          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline w-full flex items-center gap-2"
          >
            <FaGoogle /> Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
