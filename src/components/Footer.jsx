import { FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 bg-opacity-80 backdrop-blur-md dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:bg-opacity-70 shadow-inner text-gray-700 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Career Counsel+</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Career Counsel+ is your trusted partner for career development and education guidance. We empower individuals to grow, learn, and succeed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><a href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">About</a></li>
            <li><a href="/service" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Services</a></li>
            <li><a href="/blogs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Blog</a></li>
            <li><a href="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Contact Us</h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
            <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-indigo-600 dark:text-indigo-400"/> Mymensingh, Bangladesh</li>
            <li className="flex items-center gap-2"><FaPhoneAlt className="text-indigo-600 dark:text-indigo-400"/> +880 1234-567890</li>
            <li className="flex items-center gap-2"><FaEnvelope className="text-indigo-600 dark:text-indigo-400"/> info@careercounsel.com</li>
          </ul>
        </div>

        {/* Developer Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Developer</h3>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">Developed with ❤️ by <span className="font-semibold text-indigo-700 dark:text-indigo-400">Sam Shawon</span></p>
          <div className="flex space-x-4 text-xl">
            <a href="https://www.facebook.com/sam.shawon.akando" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 text-gray-600 dark:text-gray-400"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/in/shawon-akando/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 text-gray-600 dark:text-gray-400"><FaLinkedinIn /></a>
            <a href="https://github.com/samshawon10" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 text-gray-600 dark:text-gray-400"><FaGithub /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-xs py-4 text-gray-500 dark:text-gray-400 border-t border-indigo-200 dark:border-indigo-700">
        &copy; {year} Career Counsel+. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
