import { Link, NavLink } from "react-router-dom";
import { FaBus, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/all-tickets"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "font-medium"
            }
          >
            All Tickets
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "font-medium"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 fixed z-10 bg-opacity-90 backdrop-blur-sm max-w-screen-xl shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2">
          <FaBus className="text-primary text-2xl" />
          <span className="font-bold text-2xl">
            Ticket<span className="text-primary">Bari</span>
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{navOptions}</ul>
      </div>
      <div className="navbar-end gap-2">
        {/* Theme Toggle */}
        <label className="swap swap-rotate btn btn-ghost btn-circle">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <FaSun className="swap-on fill-current w-6 h-6 text-warning" />
          <FaMoon className="swap-off fill-current w-6 h-6 text-base-content/70" />
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {user.photoURL ? (
                  <img alt="User Profile" src={user.photoURL} />
                ) : (
                  <FaUserCircle className="w-full h-full text-base-content/40" />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between font-bold text-primary">
                  {user.displayName || "User"}
                </a>
              </li>
              <li>
                <Link to="/dashboard">My Profile</Link>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
