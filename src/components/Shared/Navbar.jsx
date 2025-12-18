import { Link, NavLink } from "react-router-dom";
import { FaBus } from "react-icons/fa";

const Navbar = () => {
    const user = null; // TODO: Replace with actual user state
    const logOut = () => {}; // TODO: Replace with actual logout function

    const navOptions = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/all-tickets">All Tickets</NavLink></li>
        {user && <li><NavLink to="/dashboard">Dashboard</NavLink></li>}
    </>

    return (
        <div className="navbar bg-base-100 fixed z-10 bg-opacity-30 max-w-screen-xl text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-black">
                        {navOptions}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
                    <FaBus /> TicketBari
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navOptions}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <div className="dropdown dropdown-end text-black">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="User Avatar" src={user?.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li>
                                    <Link to="/dashboard/profile" className="justify-between">
                                        My Profile
                                    </Link>
                                </li>
                                <li><button onClick={logOut}>Logout</button></li>
                            </ul>
                        </div>
                    </> : <>
                        <Link to="/login" className="btn">Login</Link>
                    </>
                }
            </div>
        </div>
    );
};

export default Navbar;
