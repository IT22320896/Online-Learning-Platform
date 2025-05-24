import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseCard from "../components/courses/CourseCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses?limit=4`);
        setFeaturedCourses(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load featured courses");
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  return (
    <div className="animate-fadeIn min-h-screen">=
      <section className="bg-gradient-to-r from-blue-800 to-indigo-800 py-20 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Unlock Your Potential with{" "}
            <span className="text-blue-200">Brain</span>Spark
          </h1>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Discover high-quality courses taught by industry experts. Enhance
            your skills and advance your career.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/courses"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-md font-semibold transition-all duration-300"
            >
              Explore Courses
            </Link>
            <Link
              to="/register"
              className="bg-transparent hover:bg-blue-800 border-2 border-white px-8 py-3 rounded-md font-semibold transition-all duration-300"
            >
              Join For Free
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                100+
              </div>
              <div className="text-gray-700 font-medium">
                Expert Instructors
              </div>
            </div>
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                500+
              </div>
              <div className="text-gray-700 font-medium">Quality Courses</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                10k+
              </div>
              <div className="text-gray-700 font-medium">Happy Students</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                24/7
              </div>
              <div className="text-gray-700 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Featured Courses
              </h2>
              <div className="w-32 h-1.5 bg-blue-600 rounded-full"></div>
            </div>
            <Link
              to="/courses"
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center group bg-white px-6 py-2 rounded-full shadow-sm hover:shadow transition-all duration-300"
            >
              View All
              <svg
                className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-red-700 bg-red-100 border border-red-200 rounded-lg text-center shadow-sm">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCourses.length > 0 ? (
                featuredCourses.map((course, index) => (
                  <div
                    key={course._id}
                    className="animate-fadeIn opacity-0"
                    style={{
                      animationDelay: `${index * 0.15}s`,
                      animationFillMode: "forwards",
                    }}
                  >
                    <CourseCard course={course} />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center p-8 bg-white rounded-xl shadow-md">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <p className="text-gray-600 text-lg">
                    No courses available at the moment.
                  </p>
                  <p className="text-gray-500 mt-2">
                    Please check back later for new courses.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Browse by Category
            </h2>
            <div className="w-32 h-1.5 bg-blue-600 rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of courses across different categories
              tailored to help you achieve your learning goals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <CategoryCard
              to="/courses?category=web-development"
              title="Web Development"
              description="Learn to build beautiful, responsive websites."
              color="blue"
              iconPath="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />

            <CategoryCard
              to="/courses?category=data-science"
              title="Data Science"
              description="Master data analysis, visualization, and machine learning."
              color="green"
              iconPath="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />

            <CategoryCard
              to="/courses?category=mobile-development"
              title="Mobile Development"
              description="Build apps for iOS and Android platforms."
              color="purple"
              iconPath="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
            />

            <CategoryCard
              to="/courses?category=design"
              title="Design"
              description="Master UI/UX, graphic design, and illustration."
              color="yellow"
              iconPath="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-indigo-700 to-purple-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to start learning?
          </h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already learning and growing with
            BrainSpark. Start your journey today!
          </p>
          <div className="space-x-6">
            <Link
              to="/register"
              className="bg-white text-indigo-700 hover:bg-blue-50 px-6 py-3 rounded-md font-semibold transition-all duration-300 inline-block"
            >
              Sign Up Now
            </Link>
            <Link
              to="/courses"
              className="bg-transparent hover:bg-indigo-600 border-2 border-white px-6 py-3 rounded-md font-semibold transition-all duration-300 inline-block"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ to, title, description, color, iconPath }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      hover: "group-hover:bg-blue-600",
      textHover: "group-hover:text-blue-700",
      cardHover: "hover:bg-blue-50",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      hover: "group-hover:bg-green-600",
      textHover: "group-hover:text-green-700",
      cardHover: "hover:bg-green-50",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      hover: "group-hover:bg-purple-600",
      textHover: "group-hover:text-purple-700",
      cardHover: "hover:bg-purple-50",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      hover: "group-hover:bg-yellow-600",
      textHover: "group-hover:text-yellow-700",
      cardHover: "hover:bg-yellow-50",
    },
  };

  const classes = colorClasses[color];

  return (
    <Link
      to={to}
      className={`bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl ${classes.cardHover} group`}
    >
      <div
        className={`${classes.bg} ${classes.text} h-18 w-18 rounded-full mx-auto flex items-center justify-center mb-6 ${classes.hover} group-hover:text-white transition-colors duration-300 p-4`}
      >
        <svg
          className="w-9 h-9"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={iconPath}
          ></path>
        </svg>
      </div>
      <h3 className={`text-xl font-semibold mb-3 ${classes.textHover}`}>
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

export default Home;
