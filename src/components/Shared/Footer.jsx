import { FaFacebook, FaYoutube, FaBus } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="flex flex-col md:flex-row justify-between p-10 max-w-screen-xl mx-auto gap-10">
        <aside className="max-w-xs">
          <div className="flex items-center gap-2 text-2xl font-bold mb-2">
            <FaBus className="text-primary" />
            <span>
              Ticket<span className="text-primary">Bari</span>
            </span>
          </div>
          <p>
            Book bus, train, launch & flight tickets easily.
            <br />
            Providing reliable tech since 2025
          </p>
        </aside>
        <nav className="flex flex-col gap-2">
          <header className="footer-title">Quick Links</header>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">All Tickets</a>
          <a className="link link-hover">Contact Us</a>
          <a className="link link-hover">About</a>
        </nav>
        <nav className="flex flex-col gap-2">
          <header className="footer-title">Contact Info</header>
          <a className="link link-hover">Email: support@ticketbari.com</a>
          <a className="link link-hover">Phone: +880 1234 567890</a>
          <div className="grid grid-flow-col gap-4 mt-2">
            <a className="cursor-pointer hover:text-primary transition-colors">
              <FaFacebook className="text-2xl" />
            </a>
            <a className="cursor-pointer hover:text-primary transition-colors">
              <FaXTwitter className="text-2xl" />
            </a>
            <a className="cursor-pointer hover:text-primary transition-colors">
              <FaYoutube className="text-2xl" />
            </a>
          </div>
        </nav>
        <nav className="flex flex-col gap-2">
          <header className="footer-title">Payment Methods</header>
          <p className="text-lg font-semibold">Stripe</p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
            alt="Stripe"
            className="w-20 bg-base-100 p-1 rounded"
          />
        </nav>
      </div>
      <div className="footer footer-center p-4 bg-neutral-focus text-neutral-content border-t border-neutral-content/20">
        <aside>
          <p>Copyright © 2025 - All right reserved by TicketBari Ltd</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
