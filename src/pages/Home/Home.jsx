import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {
  FaBus,
  FaPlane,
  FaTrain,
  FaShip,
  FaSearch,
  FaStar,
  FaShieldAlt,
  FaClock,
  FaHeadset,
  FaMapMarkerAlt,
} from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TicketCard from "../../components/TicketCard";
import { AuthContext } from "../../providers/AuthProvider";

const Home = () => {
  const [advertisedTickets, setAdvertisedTickets] = useState([]);
  const [latestTickets, setLatestTickets] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Fetch all tickets
    axiosPublic.get("/tickets").then((res) => {
      // Handle both array (legacy) and object (new) response formats
      const allTickets = Array.isArray(res.data) ? res.data : res.data.tickets;

      // Filter advertised tickets (admin chosen) - exactly 6
      const advertised = allTickets.filter((t) => t.advertised).slice(0, 6);
      setAdvertisedTickets(advertised);

      // Latest tickets (6-8 recent tickets)
      const latest = allTickets
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 8);
      setLatestTickets(latest);
    });
  }, [axiosPublic]);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section with Swiper */}
      <div className="relative h-[600px]">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full"
        >
          <SwiperSlide>
            <div
              className="hero h-full"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1469&auto=format&fit=crop)",
              }}
            >
              <div className="hero-overlay bg-black bg-opacity-50"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-lg" data-aos="fade-up">
                  <h1 className="mb-5 text-5xl font-bold leading-tight">
                    Explore the World with{" "}
                    <span className="text-primary">TicketBari</span>
                  </h1>
                  <p className="mb-5 text-lg">
                    Seamless booking for Bus, Train, Launch, and Flights. Your
                    journey begins here.
                  </p>
                  <Link
                    to="/all-tickets"
                    className="btn btn-primary btn-lg border-none"
                  >
                    Book Your Ticket
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="hero h-full"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1474&auto=format&fit=crop)",
              }}
            >
              <div className="hero-overlay bg-black bg-opacity-50"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-lg" data-aos="fade-up">
                  <h1 className="mb-5 text-5xl font-bold leading-tight">
                    Fly High with Best Deals
                  </h1>
                  <p className="mb-5 text-lg">
                    Get the best prices on domestic and international flights.
                  </p>
                  <Link
                    to="/all-tickets"
                    className="btn btn-primary btn-lg border-none"
                  >
                    Book Flight
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="hero h-full"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1684&auto=format&fit=crop)",
              }}
            >
              <div className="hero-overlay bg-black bg-opacity-50"></div>
              <div className="hero-content text-center text-neutral-content">
                <div className="max-w-lg" data-aos="fade-up">
                  <h1 className="mb-5 text-5xl font-bold leading-tight">
                    Comfortable Train Journeys
                  </h1>
                  <p className="mb-5 text-lg">
                    Experience the scenic beauty of the country by train.
                  </p>
                  <Link
                    to="/all-tickets"
                    className="btn btn-primary btn-lg border-none"
                  >
                    Book Train
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Search Widget Overlay */}
        <div
          className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-11/12 max-w-4xl bg-base-100 shadow-2xl rounded-xl p-6 z-20 hidden md:block"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="grid grid-cols-4 gap-4 items-end">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">From</span>
              </label>
              <input
                type="text"
                placeholder="City"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">To</span>
              </label>
              <input
                type="text"
                placeholder="City"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Date</span>
              </label>
              <input type="date" className="input input-bordered w-full" />
            </div>
            <button className="btn btn-primary h-12 mt-auto">
              <FaSearch className="mr-2" /> Search
            </button>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div className="mt-24 mb-16 px-4 max-w-screen-xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-4xl font-bold mb-2">Our Services</h2>
          <p className="text-base-content/60">
            Choose your preferred mode of transport
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <FaBus className="text-4xl text-primary" />,
              title: "Bus Ticket",
              desc: "Affordable & Comfortable",
            },
            {
              icon: <FaPlane className="text-4xl text-info" />,
              title: "Air Ticket",
              desc: "Fastest Way to Travel",
            },
            {
              icon: <FaTrain className="text-4xl text-warning" />,
              title: "Train Ticket",
              desc: "Scenic & Safe Journey",
            },
            {
              icon: <FaShip className="text-4xl text-accent" />,
              title: "Launch Ticket",
              desc: "Relaxing River Cruise",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-200 cursor-pointer group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="card-body items-center text-center">
                <div className="p-4 rounded-full bg-base-200 group-hover:bg-primary/10 transition-colors">
                  {service.icon}
                </div>
                <h3 className="card-title mt-2">{service.title}</h3>
                <p className="text-sm text-base-content/60">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advertisement Section - Admin Featured Tickets */}
      {user && advertisedTickets.length > 0 && (
        <div className="py-16 bg-base-200 px-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-12" data-aos="fade-up">
              <div className="badge badge-primary badge-lg mb-2">Featured</div>
              <h2 className="text-4xl font-bold mb-3">
                Admin's Choice - Exclusive Offers
              </h2>
              <p className="text-base-content/60">
                Handpicked tickets with the best deals for you
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {advertisedTickets.map((ticket) => (
                <TicketCard key={ticket._id} ticket={ticket} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Latest Tickets Section */}
      {user && (
        <div className="py-16 bg-base-100 px-4">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-12" data-aos="fade-up">
              <div className="badge badge-secondary badge-lg mb-2">New</div>
              <h2 className="text-4xl font-bold mb-3">Latest Tickets</h2>
              <p className="text-base-content/60">
                Recently added tickets to popular destinations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestTickets.map((ticket) => (
                <TicketCard key={ticket._id} ticket={ticket} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/all-tickets" className="btn btn-primary btn-lg px-10">
                View All Tickets
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Popular Routes Section */}
      <div className="py-16 px-4 bg-base-200">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-4xl font-bold mb-3">Popular Routes</h2>
            <p className="text-base-content/60">Most traveled destinations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { from: "Dhaka", to: "Chittagong", price: 1200, trips: 450 },
              { from: "Dhaka", to: "Sylhet", price: 900, trips: 380 },
              { from: "Dhaka", to: "Cox's Bazar", price: 1500, trips: 520 },
              { from: "Chittagong", to: "Dhaka", price: 1200, trips: 410 },
            ].map((route, idx) => (
              <div
                key={idx}
                className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="card-body">
                  <div className="flex items-center justify-between mb-3">
                    <FaMapMarkerAlt className="text-primary text-3xl" />
                    <span className="badge badge-success badge-sm">
                      {route.trips}+ trips
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">
                    {route.from} <span className="text-primary">→</span>{" "}
                    {route.to}
                  </h3>
                  <div className="divider my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-base-content/60">
                      Starting from
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ৳{route.price}
                    </span>
                  </div>
                  <Link
                    to="/all-tickets"
                    className="btn btn-primary btn-sm mt-2"
                  >
                    View Tickets
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 px-4 max-w-screen-xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl font-bold">Why Choose TicketBari?</h2>
          <p className="text-base-content/60 mt-2">
            We provide the best service in the country
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div
            className="text-center p-6 rounded-xl hover:bg-base-200 transition-colors"
            data-aos="fade-up"
          >
            <FaShieldAlt className="text-5xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
            <p className="text-base-content/60">
              100% secure payment with Stripe and other gateways.
            </p>
          </div>
          <div
            className="text-center p-6 rounded-xl hover:bg-base-200 transition-colors"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FaClock className="text-5xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Fast Booking</h3>
            <p className="text-base-content/60">
              Book your tickets in just a few clicks, anytime, anywhere.
            </p>
          </div>
          <div
            className="text-center p-6 rounded-xl hover:bg-base-200 transition-colors"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaHeadset className="text-5xl text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-base-content/60">
              Our support team is ready to help you round the clock.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-primary text-primary-content py-16 px-4">
        <div className="max-w-screen-md mx-auto text-center" data-aos="zoom-in">
          <h2 className="text-4xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="mb-8 opacity-90">
            Get the latest updates, exclusive offers, and travel tips directly
            to your inbox.
          </p>
          <div className="join w-full max-w-md">
            <input
              className="input input-bordered join-item w-full text-base-content"
              placeholder="Enter your email"
            />
            <button className="btn btn-secondary join-item">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
