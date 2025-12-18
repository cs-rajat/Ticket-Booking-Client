import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content">
            <aside>
                <h2 className="text-3xl font-bold">TicketBari</h2>
                <p>Book bus, train, launch & flight tickets easily.<br />Providing reliable tech since 2025</p>
            </aside>
            <nav>
                <header className="footer-title">Quick Links</header>
                <a className="link link-hover">Home</a>
                <a className="link link-hover">All Tickets</a>
                <a className="link link-hover">Contact Us</a>
                <a className="link link-hover">About</a>
            </nav>
            <nav>
                <header className="footer-title">Contact Info</header>
                <a className="link link-hover">Email: support@ticketbari.com</a>
                <a className="link link-hover">Phone: +880 1234 567890</a>
                <div className="grid grid-flow-col gap-4">
                    <a><FaFacebook className="text-2xl" /></a>
                    <a><FaTwitter className="text-2xl" /></a>
                    <a><FaYoutube className="text-2xl" /></a>
                </div>
            </nav>
            <nav>
                <header className="footer-title">Payment Methods</header>
                <p>Stripe</p>
            </nav>
        </footer>
    );
};

export default Footer;
