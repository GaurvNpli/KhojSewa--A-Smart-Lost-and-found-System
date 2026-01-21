import { FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/khojsewa_logo.png";

const Footer = () => {
  return (
    <footer className="w-full bg-stone-900 text-white relative overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <a href="/" className="flex items-center space-x-2 group mb-6">
              <img src={logo} alt="KhojSewa" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
              <span className="text-xl font-display font-semibold text-white">KhojSewa</span>
            </a>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Nepal's premier platform to find and post lost items. Join our community and help return lost belongings.
            </p>
            {/* Social Media */}
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-amber-500 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all duration-300"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-amber-500 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all duration-300"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-amber-500 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all duration-300"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:support@khojsewa.com"
                className="w-10 h-10 rounded-full bg-stone-800 hover:bg-amber-500 flex items-center justify-center text-stone-400 hover:text-stone-900 transition-all duration-300"
              >
                <FaEnvelope className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-stone-600 rounded-full group-hover:bg-amber-400 transition-colors" />Home</a></li>
              <li><a href="/Search" className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-stone-600 rounded-full group-hover:bg-amber-400 transition-colors" />Find Item</a></li>
              <li><a href="/ItemFound" className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-stone-600 rounded-full group-hover:bg-amber-400 transition-colors" />Post Item</a></li>
              <li><a href="/about" className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-stone-600 rounded-full group-hover:bg-amber-400 transition-colors" />About Us</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Support</h3>
            <ul className="space-y-3">
              <li><a href="/#faq" className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-stone-600 rounded-full group-hover:bg-amber-400 transition-colors" />FAQ</a></li>
              <li><a href="/#contact" className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-stone-600 rounded-full group-hover:bg-amber-400 transition-colors" />Contact Us</a></li>
              <li><a href="/privacy" className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-stone-600 rounded-full group-hover:bg-amber-400 transition-colors" />Privacy Policy</a></li>
              <li><a href="/terms" className="text-stone-400 hover:text-amber-400 text-sm transition-colors duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-stone-600 rounded-full group-hover:bg-amber-400 transition-colors" />Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Stay Updated</h3>
            <p className="text-stone-400 text-sm mb-4">
              Subscribe to our newsletter for updates and tips.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-stone-800 border border-stone-700 text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-900 font-medium text-sm transition-all duration-300 hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} KhojSewa. All rights reserved.
          </p>
          <p className="text-stone-500 text-sm">
            Made with <span className="text-amber-500">♥</span> in Nepal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
