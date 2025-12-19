import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaImage,
  FaTicketAlt,
} from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddTicket = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    // Upload image to ImgBB
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const ticketData = {
        title: data.title,
        from: data.from,
        to: data.to,
        transportType: data.transportType,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity),
        date: new Date(data.date).toISOString().split("T")[0],
        time: data.time,
        perks: data.perks, // Array of selected perks
        image: res.data.data.display_url,
        vendorName: user?.displayName,
        vendorEmail: user?.email,
        status: "pending", // Verification status
        verificationStatus: "pending", // Explicitly naming it verificationStatus as per requirements
      };

      try {
        const dbRes = await axiosSecure.post("/tickets", ticketData);
        if (dbRes.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Ticket added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-base-200 p-4 md:p-8">
      <style>{`
        .react-datepicker-wrapper {
          width: 100%;
        }
        .react-datepicker__input-container input {
          width: 100%;
          padding-left: 2.5rem; /* Space for icon */
        }
        /* Dark mode overrides for DatePicker */
        :root[data-theme="dark"] .react-datepicker {
          background-color: #1d232a;
          color: #a6adbb;
          border-color: #374151;
        }
        :root[data-theme="dark"] .react-datepicker__header {
          background-color: #191e24;
          border-bottom-color: #374151;
        }
        :root[data-theme="dark"] .react-datepicker__current-month,
        :root[data-theme="dark"] .react-datepicker__day-name,
        :root[data-theme="dark"] .react-datepicker__day {
          color: #a6adbb;
        }
        :root[data-theme="dark"] .react-datepicker__day:hover {
          background-color: #374151;
        }
        :root[data-theme="dark"] .react-datepicker__day--selected {
          background-color: #661AE6; /* Primary color */
          color: white;
        }
      `}</style>

      <div className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-primary p-6 text-primary-content text-center">
          <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
            <FaTicketAlt /> Add New Ticket
          </h2>
          <p className="opacity-80 mt-2">
            Fill in the details to create a new ticket listing
          </p>
        </div>

        <div className="p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
          >
            {/* Title Section */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-base">
                  Ticket Title
                </span>
              </label>
              <input
                type="text"
                placeholder="e.g. Luxury Bus to Cox's Bazar"
                className="input input-bordered w-full focus:input-primary"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-error text-sm mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From (Location) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">From</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaMapMarkerAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="Departure City"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    {...register("from", {
                      required: "From location is required",
                    })}
                  />
                </div>
                {errors.from && (
                  <span className="text-error text-sm mt-1">
                    {errors.from.message}
                  </span>
                )}
              </div>

              {/* To (Location) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">To</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaMapMarkerAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="Destination City"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    {...register("to", { required: "To location is required" })}
                  />
                </div>
                {errors.to && (
                  <span className="text-error text-sm mt-1">
                    {errors.to.message}
                  </span>
                )}
              </div>

              {/* Transport Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Transport Type
                  </span>
                </label>
                <select
                  className="select select-bordered w-full focus:select-primary"
                  {...register("transportType", {
                    required: "Transport type is required",
                  })}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select Transport Type
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
                  <span className="label-text font-semibold">
                    Price (per unit)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaDollarSign />
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    {...register("price", {
                      required: "Price is required",
                      min: 0,
                    })}
                  />
                </div>
                {errors.price && (
                  <span className="text-error text-sm mt-1">
                    {errors.price.message}
                  </span>
                )}
              </div>

              {/* Quantity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Total Seats</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaUsers />
                  </div>
                  <input
                    type="number"
                    placeholder="Available Seats"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: { value: 1, message: "At least 1 seat is required" },
                    })}
                  />
                </div>
                {errors.quantity && (
                  <span className="text-error text-sm mt-1">
                    {errors.quantity.message}
                  </span>
                )}
              </div>

              {/* Departure Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Departure Date
                  </span>
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 z-10">
                    <FaCalendarAlt />
                  </div>
                  <Controller
                    control={control}
                    name="date"
                    rules={{ required: "Date is required" }}
                    render={({ field }) => (
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        dateFormat="dd/MM/yyyy"
                        className="input input-bordered w-full pl-10 focus:input-primary"
                        placeholderText="dd/mm/yyyy"
                        wrapperClassName="w-full"
                      />
                    )}
                  />
                </div>
                {errors.date && (
                  <span className="text-error text-sm mt-1">
                    {errors.date.message}
                  </span>
                )}
              </div>

              {/* Departure Time */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Departure Time
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaClock />
                  </div>
                  <input
                    type="time"
                    className="input input-bordered w-full pl-10 focus:input-primary"
                    {...register("time", { required: "Time is required" })}
                  />
                </div>
                {errors.time && (
                  <span className="text-error text-sm mt-1">
                    {errors.time.message}
                  </span>
                )}
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Ticket Image</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <FaImage />
                  </div>
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full pl-10 focus:file-input-primary"
                    {...register("image", { required: "Image is required" })}
                  />
                </div>
                {errors.image && (
                  <span className="text-error text-sm mt-1">
                    {errors.image.message}
                  </span>
                )}
              </div>
            </div>

            {/* Perks */}
            <div className="form-control bg-base-200 p-4 rounded-lg">
              <label className="label pb-2">
                <span className="label-text font-bold text-lg">
                  Included Perks
                </span>
              </label>
              <div className="flex flex-wrap gap-4">
                {["AC", "WiFi", "Food", "Blanket", "Water"].map((perk) => (
                  <label
                    key={perk}
                    className="cursor-pointer label border border-base-300 rounded-lg px-4 py-2 bg-base-100 hover:bg-base-200 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10"
                  >
                    <input
                      type="checkbox"
                      value={perk}
                      className="checkbox checkbox-primary checkbox-sm mr-2"
                      {...register("perks")}
                    />
                    <span className="label-text font-medium">{perk}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Readonly Vendor Info */}
            <div className="divider">Vendor Information</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Vendor Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full bg-base-200 text-base-content/70 cursor-not-allowed"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Vendor Email</span>
                </label>
                <input
                  type="text"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-base-200 text-base-content/70 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="form-control mt-8">
              <button
                type="submit"
                className="btn btn-primary w-full text-lg font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Add Ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTicket;
