import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                })
            })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col md:flex-row-reverse">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" {...register("password", { required: true })} name="password" placeholder="password" className="input input-bordered" />
                            {errors.password && <span className="text-red-600">Password is required</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='my-4 text-center'>New Here? <Link className='text-orange-600 font-bold' to="/signup">Create an account</Link> </p>
                    <div className="divider">OR</div>
                    <div className="text-center pb-4">
                        <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                            <FaGoogle></FaGoogle>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
