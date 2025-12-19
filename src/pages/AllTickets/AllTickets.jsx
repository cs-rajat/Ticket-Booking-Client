import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TicketCard from "../../components/TicketCard";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
} from "react-icons/fa";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filter & Search States
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Suggestion States
  const [locations, setLocations] = useState({ from: [], to: [] });
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/tickets/locations").then((res) => {
      setLocations(res.data);
    });
  }, [axiosPublic]);

  useEffect(() => {
    setLoading(true);
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      from: searchFrom,
      to: searchTo,
      type: filterType,
      sort: sortOrder,
    };

    axiosPublic
      .get("/tickets", { params })
      .then((res) => {
        setTickets(res.data.tickets);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [axiosPublic, currentPage, searchFrom, searchTo, filterType, sortOrder]);

  const totalPages = Math.ceil(total / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleReset = () => {
    setSearchFrom("");
    setSearchTo("");
    setFilterType("");
    setSortOrder("");
    setCurrentPage(1);
  };

  return (
    <div className="max-w-screen-xl px-4 py-10 mx-auto">
      <h2 className="mb-10 text-4xl font-bold text-center text-primary">
        Available Tickets
      </h2>

      {/* Filters & Search Section */}
      <div className="p-6 mb-10 border shadow-lg bg-base-100 rounded-xl border-base-300">
        <div className="grid items-end grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* From Search */}
          <div className="relative form-control">
            <label className="label">
              <span className="font-semibold label-text">From</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Departure City"
                className="w-full pl-10 input input-bordered"
                value={searchFrom}
                onChange={(e) => {
                  setSearchFrom(e.target.value);
                  setShowFromSuggestions(true);
                }}
                onFocus={() => setShowFromSuggestions(true)}
                onBlur={() =>
                  setTimeout(() => setShowFromSuggestions(false), 200)
                }
              />
              <FaSearch className="absolute left-3 top-3.5 text-base-content/40" />
            </div>
            {showFromSuggestions && searchFrom && (
              <ul className="absolute left-0 z-50 w-full mt-1 overflow-y-auto border shadow-xl bg-base-100 rounded-box max-h-60 top-full border-base-200">
                {locations.from
                  .filter(
                    (loc) =>
                      loc &&
                      loc.toLowerCase().includes(searchFrom.toLowerCase())
                  )
                  .map((loc, index) => (
                    <li
                      key={index}
                      className="p-3 border-b cursor-pointer hover:bg-base-200 border-base-100 last:border-none"
                      onMouseDown={() => {
                        setSearchFrom(loc);
                        setShowFromSuggestions(false);
                      }}
                    >
                      {loc}
                    </li>
                  ))}
                {locations.from.filter(
                  (loc) =>
                    loc && loc.toLowerCase().includes(searchFrom.toLowerCase())
                ).length === 0 && (
                  <li className="p-3 text-sm text-base-content/50">
                    No matches found
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* To Search */}
          <div className="relative form-control">
            <label className="label">
              <span className="font-semibold label-text">To</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Destination City"
                className="w-full pl-10 input input-bordered"
                value={searchTo}
                onChange={(e) => {
                  setSearchTo(e.target.value);
                  setShowToSuggestions(true);
                }}
                onFocus={() => setShowToSuggestions(true)}
                onBlur={() =>
                  setTimeout(() => setShowToSuggestions(false), 200)
                }
              />
              <FaSearch className="absolute left-3 top-3.5 text-base-content/40" />
            </div>
            {showToSuggestions && searchTo && (
              <ul className="absolute left-0 z-50 w-full mt-1 overflow-y-auto border shadow-xl bg-base-100 rounded-box max-h-60 top-full border-base-200">
                {locations.to
                  .filter(
                    (loc) =>
                      loc && loc.toLowerCase().includes(searchTo.toLowerCase())
                  )
                  .map((loc, index) => (
                    <li
                      key={index}
                      className="p-3 border-b cursor-pointer hover:bg-base-200 border-base-100 last:border-none"
                      onMouseDown={() => {
                        setSearchTo(loc);
                        setShowToSuggestions(false);
                      }}
                    >
                      {loc}
                    </li>
                  ))}
                {locations.to.filter(
                  (loc) =>
                    loc && loc.toLowerCase().includes(searchTo.toLowerCase())
                ).length === 0 && (
                  <li className="p-3 text-sm text-base-content/50">
                    No matches found
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Transport Type Filter */}
          <div className="form-control">
            <label className="label">
              <span className="font-semibold label-text">Transport Type</span>
            </label>
            <select
              className="w-full select select-bordered"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Bus">Bus</option>
              <option value="Air">Air</option>
              <option value="Train">Train</option>
              <option value="Launch">Launch</option>
            </select>
          </div>

          {/* Sort Order */}
          <div className="form-control">
            <label className="label">
              <span className="font-semibold label-text">Sort by Price</span>
            </label>
            <select
              className="w-full select select-bordered"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Default</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="form-control">
            <button onClick={handleReset} className="w-full btn btn-neutral">
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : tickets.length === 0 ? (
        <div className="py-20 text-center">
          <h3 className="text-2xl font-bold text-base-content/60">
            No tickets found matching your criteria.
          </h3>
          <button onClick={handleReset} className="mt-4 btn btn-link">
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-12">
            <div className="join">
              <button
                className="join-item btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                «
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`join-item btn ${
                    currentPage === index + 1 ? "btn-primary" : ""
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="join-item btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllTickets;
