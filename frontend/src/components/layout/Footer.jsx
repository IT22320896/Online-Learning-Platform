import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-white pt-16 pb-8 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Decorative wave at the top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden transform rotate-180 -translate-y-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-12 text-gray-50"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold flex items-center group">
              <span className="text-white group-hover:text-blue-300 transition-colors duration-300">
                Brain
              </span>
              <span className="text-blue-400 group-hover:text-white transition-colors duration-300">
                Spark
              </span>
            </Link>
            <p className="mt-4 text-gray-300 leading-relaxed">
              Empowering education through technology. Access quality courses
              from anywhere in the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-5 flex items-center">
              <span className="w-8 h-1 bg-blue-500 inline-block mr-2 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/courses" text="Courses" />
              <FooterLink to="/login" text="Login" />
              <FooterLink to="/register" text="Register" />
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-5 flex items-center">
              <span className="w-8 h-1 bg-blue-500 inline-block mr-2 rounded-full"></span>
              Categories
            </h3>
            <ul className="space-y-3">
              <FooterLink
                to="/courses?category=web-development"
                text="Web Development"
              />
              <FooterLink
                to="/courses?category=data-science"
                text="Data Science"
              />
              <FooterLink
                to="/courses?category=mobile-development"
                text="Mobile Development"
              />
              <FooterLink to="/courses?category=design" text="Design" />
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-5 flex items-center">
              <span className="w-8 h-1 bg-blue-500 inline-block mr-2 rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start group">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span className="group-hover:text-white transition-colors duration-300">
                  123 Education St, Learning City
                </span>
              </li>
              <li className="flex items-start group">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <a
                  href="mailto:contact@brainspark.com"
                  className="group-hover:text-white transition-colors duration-300 hover:underline"
                >
                  contact@brainspark.com
                </a>
              </li>
              <li className="flex items-start group">
                <svg
                  className="w-5 h-5 mr-3 mt-0.5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <a
                  href="tel:+94771234567"
                  className="group-hover:text-white transition-colors duration-300 hover:underline"
                >
                  +94771234567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            &copy; {currentYear} BrainSpark. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-6 md:mt-0">
            <SocialIcon
              href="#"
              ariaLabel="Facebook"
              path="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
            />

            <SocialIcon
              href="#"
              ariaLabel="Twitter"
              path="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.09-.193-7.715-2.157-10.141-5.126-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548z"
            />

            <SocialIcon
              href="#"
              ariaLabel="Instagram"
              path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            />

            <SocialIcon
              href="#"
              ariaLabel="YouTube"
              path="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

// Reusable Footer Link component
const FooterLink = ({ to, text }) => {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group"
      >
        <svg
          className="w-4 h-4 mr-2 text-blue-400 transform group-hover:translate-x-1 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
        {text}
      </Link>
    </li>
  );
};

// Reusable Social Icon component
const SocialIcon = ({ href, ariaLabel, path }) => {
  return (
    <a
      href={href}
      className="text-gray-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-110"
      aria-label={ariaLabel}
    >
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} />
      </svg>
    </a>
  );
};

export default Footer;
