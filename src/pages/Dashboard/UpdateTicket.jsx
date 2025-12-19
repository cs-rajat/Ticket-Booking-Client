import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await axiosSecure.get(`/tickets/${id}`);
        const ticket = res.data;
        setValue("title", ticket.title);
        setValue("from", ticket.from);
        setValue("to", ticket.to);
        setValue("transportType", ticket.transportType);
        setValue("price", ticket.price);
        setValue("quantity", ticket.quantity);
        setValue("date", ticket.date);
        setValue("time", ticket.time);
        setValue("perks", ticket.perks || []);
        // Image is not pre-filled in file input, but we can keep the old one if not changed
      } catch (error) {
        console.error("Failed to fetch ticket details", error);
      }
    };
    fetchTicket();
  }, [id, axiosSecure, setValue]);

  const onSubmit = async (data) => {
    const ticketData = {
      title: data.title,
      from: data.from,
      to: data.to,
      transportType: data.transportType,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      date: data.date,
      time: data.time,
      perks: data.perks,
    };
    // Only update image if a new one is selected (logic would be needed here, but for now let's assume image update is separate or handled differently if we want to keep old image)
    // For simplicity in this update, we might skip image re-upload if not changed, or require it.
    // Given the previous AddTicket logic, let's stick to the fields requested.

    try {
      const res = await axiosSecure.patch(`/tickets/${id}`, ticketData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ticket updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/myAddedTickets");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-4xl font-bold mb-8 text-center text-primary">
        Update Ticket
      </h2>
      <div className="bg-base-100 p-8 rounded-xl shadow-xl border border-base-300">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ticket Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Ticket Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter ticket title"
                className="input input-bordered w-full"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-error text-sm mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* From (Location) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  From (Location)
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter departure location"
                className="input input-bordered w-full"
                {...register("from", { required: "From location is required" })}
              />
              {errors.from && (
                <span className="text-error text-sm mt-1">
                  {errors.from.message}
                </span>
              )}
            </div>

            {/* To (Location) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">To (Location)</span>
              </label>
              <input
                type="text"
                placeholder="Enter destination"
                className="input input-bordered w-full"
                {...register("to", { required: "To location is required" })}
              />
              {errors.to && (
                <span className="text-error text-sm mt-1">
                  {errors.to.message}
                </span>
              )}
            </div>

            {/* Transport Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Transport Type</span>
              </label>
              <select
                className="select select-bordered w-full"
                {...register("transportType", {
                  required: "Transport type is required",
                })}
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="Bus">Bus</option>
                <option value="Train">Train</option>
                <option value="Flight">Flight</option>
                <option value="Ship">Ship</option>
              </select>
              {errors.transportType && (
                <span className="text-error text-sm mt-1">
                  {errors.transportType.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Price</span>
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Enter price"
                className="input input-bordered w-full"
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
              />
              {errors.price && (
                <span className="text-error text-sm mt-1">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Quantity</span>
              </label>
              <input
                type="number"
                placeholder="Enter quantity"
                className="input input-bordered w-full"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: 1,
                })}
              />
              {errors.quantity && (
                <span className="text-error text-sm mt-1">
                  {errors.quantity.message}
                </span>
              )}
            </div>

            {/* Departure Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Departure Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <span className="text-error text-sm mt-1">
                  {errors.date.message}
                </span>
              )}
            </div>

            {/* Departure Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Departure Time</span>
              </label>
              <input
                type="time"
                className="input input-bordered w-full"
                {...register("time", { required: "Time is required" })}
              />
              {errors.time && (
                <span className="text-error text-sm mt-1">
                  {errors.time.message}
                </span>
              )}
            </div>
          </div>

          {/* Perks */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Perks</span>
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  value="AC"
                  className="checkbox checkbox-primary"
                  {...register("perks")}
                />
                <span className="label-text">AC</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  value="WiFi"
                  className="checkbox checkbox-primary"
                  {...register("perks")}
                />
                <span className="label-text">WiFi</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  value="Food"
                  className="checkbox checkbox-primary"
                  {...register("perks")}
                />
                <span className="label-text">Food</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  value="Blanket"
                  className="checkbox checkbox-primary"
                  {...register("perks")}
                />
                <span className="label-text">Blanket</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  value="Water"
                  className="checkbox checkbox-primary"
                  {...register("perks")}
                />
                <span className="label-text">Water</span>
              </label>
            </div>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full md:w-auto md:px-8 mx-auto"
            >
              Update Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTicket;
