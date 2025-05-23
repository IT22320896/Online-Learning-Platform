import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, hasRole } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses/${id}`);
        setCourse(response.data.data);

        // Check if user is enrolled
        if (user && user.enrolledCourses) {
          setEnrolled(user.enrolledCourses.some((c) => c._id === id));
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Failed to load course details");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      setEnrolling(true);

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      await axios.post(`${API_URL}/courses/${id}/enroll`, {}, config);

      setEnrolled(true);
      setEnrolling(false);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      setError("Failed to enroll in course");
      setEnrolling(false);
    }
  };

  const isInstructor = course && user && course.instructor._id === user._id;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-red-700 bg-red-100 rounded-lg text-center">
        {error}
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Course not found
        </h2>
        <Link to="/courses" className="btn-primary">
          Browse Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <nav className="text-sm mb-4">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
              <svg
                className="w-3 h-3 mx-2 fill-current text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li className="flex items-center">
              <Link to="/courses" className="text-blue-600 hover:text-blue-800">
                Courses
              </Link>
              <svg
                className="w-3 h-3 mx-2 fill-current text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li className="text-gray-600">{course.title}</li>
          </ol>
        </nav>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src={
                  course.thumbnail ||
                  "https://via.placeholder.com/350x250?text=Course+Image"
                }
                alt={course.title}
                className="h-48 w-full object-cover md:w-64"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    course.level === "beginner"
                      ? "bg-green-100 text-green-800"
                      : course.level === "intermediate"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </span>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {course.duration} minutes
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {course.title}
              </h1>

              <div className="flex items-center mb-4">
                <div className="mr-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(course.rating?.average || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {course.rating?.average.toFixed(1) || "0.0"} (
                  {course.rating?.count || 0} reviews)
                </span>
              </div>

              <p className="text-gray-600 mb-6">{course.description}</p>

              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-gray-700">
                    {course.instructor?.name
                      ? course.instructor.name.charAt(0)
                      : "?"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">Instructor</p>
                  <p className="text-gray-700">
                    {course.instructor?.name || "Unknown"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {isInstructor ? (
                  <Link
                    to={`/instructor/edit-course/${course._id}`}
                    className="btn-primary"
                  >
                    Edit Course
                  </Link>
                ) : enrolled ? (
                  <button className="btn-secondary" disabled>
                    Enrolled
                  </button>
                ) : (
                  <button
                    onClick={handleEnroll}
                    disabled={enrolling || !hasRole("student")}
                    className="btn-primary flex justify-center items-center"
                  >
                    {enrolling ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enrolling...
                      </>
                    ) : (
                      "Enroll Now"
                    )}
                  </button>
                )}

                <button className="btn-secondary flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Course Content
            </h2>
            <div className="prose max-w-none">
              {course.content ? (
                <div dangerouslySetInnerHTML={{ __html: course.content }} />
              ) : (
                <p className="text-gray-600">
                  No content available for this course.
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Course Details
            </h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{course.duration} minutes</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Level:</span>
                <span className="font-medium">
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{course.category}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Students:</span>
                <span className="font-medium">
                  {course.enrolled?.length || 0}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="font-medium">
                  {new Date(course.createdAt).toLocaleDateString()}
                </span>
              </li>
            </ul>
          </div>

          {course.tags && course.tags.length > 0 && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
