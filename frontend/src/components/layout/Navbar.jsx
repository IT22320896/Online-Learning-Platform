import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout, hasRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Handle logout and navigation
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navbarClasses = `${
    scrolled
      ? "bg-blue-800 shadow-lg"
      : "bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500"
  } text-white sticky top-0 z-50 transition-all duration-300`;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold flex items-center group">
            <span className="text-white group-hover:text-blue-200 transition-colors duration-300">
              Brain
            </span>
            <span className="text-blue-200 group-hover:text-white transition-colors duration-300">
              Spark
            </span>
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden focus:outline-none focus:ring-2 focus:ring-blue-300 rounded p-1 transition-transform duration-300 hover:scale-110"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/courses">Courses</NavLink>

            {/* Authenticated links */}
            {isAuthenticated ? (
              <>
                {/* Student links */}
                {hasRole("student") && (
                  <>
                    <NavLink to="/enrolled-courses">My Courses</NavLink>
                    <NavLink to="/recommendations">Recommendations</NavLink>
                  </>
                )}

                {/* Instructor links */}
                {hasRole("instructor") && (
                  <NavLink to="/instructor/dashboard">
                    Instructor Dashboard
                  </NavLink>
                )}

                {/* Admin links */}
                {hasRole("admin") && (
                  <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
                )}

                {/* User dropdown - Click based */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center hover:text-blue-200 transition duration-200 font-medium border border-blue-300/20 rounded-lg px-3 py-1.5 hover:border-blue-300 hover:bg-blue-700/50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    <span className="mr-1 text-white">{user?.name}</span>
                    <svg
                      className={`w-4 h-4 fill-current text-white transition-transform duration-300 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {dropdownOpen && (
                    <>
                      {/* Invisible overlay to detect clicks outside */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={closeDropdown}
                        aria-hidden="true"
                      ></div>
                      <div
                        className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-50 animate-fadeIn"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <Link
                          to="/dashboard"
                          className="group block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white font-medium rounded-md mx-1 transition-colors duration-200"
                          onClick={closeDropdown}
                          role="menuitem"
                        >
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 group-hover:text-white text-blue-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4z" />
                            </svg>
                            Profile
                          </div>
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            closeDropdown();
                          }}
                          className="group w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white font-medium rounded-md mx-1 transition-colors duration-200"
                          role="menuitem"
                        >
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 group-hover:text-white text-red-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Logout
                          </div>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Guest links */}
                <NavLink to="/login">Login</NavLink>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 hover:shadow-md transition duration-200 border border-transparent hover:border-blue-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500 animate-fadeIn">
            <MobileNavLink to="/" onClick={toggleMobileMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/courses" onClick={toggleMobileMenu}>
              Courses
            </MobileNavLink>

            {/* Authenticated links */}
            {isAuthenticated ? (
              <>
                {/* Student links */}
                {hasRole("student") && (
                  <>
                    <MobileNavLink
                      to="/enrolled-courses"
                      onClick={toggleMobileMenu}
                    >
                      My Courses
                    </MobileNavLink>
                    <MobileNavLink
                      to="/recommendations"
                      onClick={toggleMobileMenu}
                    >
                      Get Recommendations
                    </MobileNavLink>
                  </>
                )}

                {/* Instructor links */}
                {hasRole("instructor") && (
                  <MobileNavLink
                    to="/instructor/dashboard"
                    onClick={toggleMobileMenu}
                  >
                    Instructor Dashboard
                  </MobileNavLink>
                )}

                {/* Admin links */}
                {hasRole("admin") && (
                  <MobileNavLink
                    to="/admin/dashboard"
                    onClick={toggleMobileMenu}
                  >
                    Admin Dashboard
                  </MobileNavLink>
                )}

                <MobileNavLink to="/dashboard" onClick={toggleMobileMenu}>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4z" />
                    </svg>
                    Dashboard
                  </div>
                </MobileNavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMobileMenu();
                  }}
                  className="flex items-center w-full text-left py-3 hover:text-blue-200 hover:bg-blue-700/30 px-3 rounded-md transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest links */}
                <MobileNavLink to="/login" onClick={toggleMobileMenu}>
                  Login
                </MobileNavLink>
                <MobileNavLink to="/register" onClick={toggleMobileMenu}>
                  <span className="bg-white text-blue-600 py-1 px-2 rounded text-sm font-semibold ml-2">
                    Register
                  </span>
                </MobileNavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

// NavLink Component with active state styling
const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`relative hover:text-blue-200 transition duration-200 font-medium py-1 ${
        isActive ? "text-blue-200" : "text-white"
      }`}
    >
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200 rounded-full"></span>
      )}
    </Link>
  );
};

// Mobile NavLink Component
const MobileNavLink = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center py-3 px-3 rounded-md transition-all duration-200 ${
        isActive
          ? "bg-blue-700/30 text-blue-200 font-medium"
          : "hover:text-blue-200 hover:bg-blue-700/30"
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
