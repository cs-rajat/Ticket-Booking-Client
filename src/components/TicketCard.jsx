import { Link } from "react-router-dom";
import { FaBus, FaTrain, FaPlane, FaShip } from "react-icons/fa";

const TicketCard = ({ ticket }) => {
  const getTransportIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "bus":
        return <FaBus className="text-primary text-2xl" />;
      case "train":
        return <FaTrain className="text-primary text-2xl" />;
      case "plane":
      case "flight":
        return <FaPlane className="text-primary text-2xl" />;
      case "launch":
      case "ship":
        return <FaShip className="text-primary text-2xl" />;
      default:
        return <FaBus className="text-primary text-2xl" />;
    }
  };

  return (
    <div
      className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full border border-base-200"
      data-aos="fade-up"
    >
      <figure className="h-48 overflow-hidden">
        <img
          src={ticket.image || "https://via.placeholder.com/400x300"}
          alt={ticket.title || ticket.busName}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-2 mb-2">
          {getTransportIcon(ticket.transportType || "bus")}
          <span className="badge badge-primary badge-sm">
            {ticket.transportType || "Bus"}
          </span>
        </div>
        <h2 className="card-title text-lg">
          {ticket.title || `${ticket.from} - ${ticket.to}`}
          {ticket.isAdvertised && (
            <div className="badge badge-secondary">Featured</div>
          )}
        </h2>
        <p className="text-base-content/70">
          {ticket.busName || ticket.companyName}
        </p>
        <div className="divider my-2"></div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-base-content/70">Price:</span>
            <span className="text-2xl font-bold text-primary">
              ৳{ticket.price}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-base-content/70">Available:</span>
            <span className="font-semibold">
              {ticket.quantity || ticket.seats} seats
            </span>
          </div>
          {ticket.perks && (
            <div className="mt-2">
              <p className="text-sm text-base-content/70 font-semibold mb-1">
                Perks:
              </p>
              <div className="flex flex-wrap gap-1">
                {Array.isArray(ticket.perks) ? (
                  ticket.perks.slice(0, 3).map((perk, index) => (
                    <span key={index} className="badge badge-outline badge-sm">
                      {perk}
                    </span>
                  ))
                ) : (
                  <span className="badge badge-outline badge-sm">
                    {ticket.perks}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="card-actions justify-end mt-4">
          <Link
            to={`/ticket/${ticket._id}`}
            className="btn btn-primary btn-sm w-full"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
