import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt, FaUserShield, FaUserTie, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleMakeUser = (user) => {
    axiosSecure.patch(`/users/user/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is a User Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMakeVendor = (user) => {
    axiosSecure.patch(`/users/vendor/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is a Vendor Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMarkFraud = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will hide all tickets from this vendor and prevent them from adding new ones.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, mark as fraud!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/fraud/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.name} marked as Fraud!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        Manage Users
      </h2>
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-xl border border-base-300">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.role === "admin"
                    ? "Admin"
                    : user.role === "vendor"
                    ? "Vendor"
                    : "User"}
                </td>
                <td className="text-center">
                  <div className="dropdown dropdown-left dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-sm btn-primary"
                    >
                      Manage Actions 👇
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 border border-base-300"
                    >
                      {user.role !== "admin" && (
                        <li>
                          <button
                            onClick={() => handleMakeAdmin(user)}
                            className="text-left"
                          >
                            <FaUserShield className="text-warning" /> Make Admin
                          </button>
                        </li>
                      )}
                      {user.role !== "vendor" && (
                        <li>
                          <button
                            onClick={() => handleMakeVendor(user)}
                            className="text-left"
                          >
                            <FaUserTie className="text-info" /> Make Vendor
                          </button>
                        </li>
                      )}
                      {(user.role === "admin" || user.role === "vendor") && (
                        <li>
                          <button
                            onClick={() => handleMakeUser(user)}
                            className="text-left"
                          >
                            <FaUser className="text-success" /> Make User
                          </button>
                        </li>
                      )}
                      {user.role === "vendor" && (
                        <li>
                          <button
                            onClick={() => handleMarkFraud(user)}
                            className="text-left text-error font-bold"
                          >
                            Mark as Fraud
                          </button>
                        </li>
                      )}
                      <li>
                        <button
                          onClick={() => handleDeleteUser(user)}
                          className="text-left text-error"
                        >
                          <FaTrashAlt /> Delete User
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
