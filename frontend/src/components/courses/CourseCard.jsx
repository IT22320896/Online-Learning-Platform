import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  const {
    _id,
    title,
    description,
    instructor,
    thumbnail,
    level,
    category,
    price,
  } = course;

  const getLevelBadgeColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          border: "border-green-200",
        };
      case "intermediate":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          border: "border-blue-200",
        };
      case "advanced":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          border: "border-red-200",
        };
      default:
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          border: "border-purple-200",
        };
    }
  };

  // Generate random rating for demo
  const rating = (Math.random() * 2 + 3).toFixed(1); // Between 3.0 and 5.0
  const ratingCount = Math.floor(Math.random() * 500) + 50; // Between 50 and 550

  const levelColors = getLevelBadgeColor(level);
  const randomDate = new Date(
    Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
  );
  const formattedDate = randomDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100 overflow-hidden flex flex-col h-full">
      <div className="relative overflow-hidden">
        <Link to={`/courses/${_id}`} aria-label={`View details for ${title}`}>
          <img
            src={
              thumbnail ||
              "https://via.placeholder.com/350x200?text=Course+Image"
            }
            alt={title}
            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <span className="text-sm font-medium flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              View course details
            </span>
          </div>
        </Link>
        <div className="absolute top-3 right-3">
          <span
            className={`${levelColors.bg} ${levelColors.text} px-2.5 py-1 rounded-full text-xs font-medium border ${levelColors.border}`}
          >
            {level}
          </span>
        </div>
        {price === 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-medium">
              Free
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            {category}
          </span>
          <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded">
            <svg
              className="w-4 h-4 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm font-semibold text-gray-800">
              {rating}
            </span>
            <span className="mx-1 text-xs text-gray-500">({ratingCount})</span>
          </div>
        </div>

        <Link to={`/courses/${_id}`} className="group-hover:underline">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 min-h-[3.5rem]">
            {title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem] flex-grow">
          {description}
        </p>

        <div className="mt-auto">
          <div className="border-t border-gray-100 pt-4 mt-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center mr-2 shadow-sm">
                  <span className="text-sm font-medium">
                    {instructor?.name
                      ? instructor.name.charAt(0).toUpperCase()
                      : "?"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700 font-medium truncate max-w-[120px]">
                    {instructor?.name || "Unknown Instructor"}
                  </span>
                  <span className="text-xs text-gray-500">
                    Updated {formattedDate}
                  </span>
                </div>
              </div>
              {price > 0 && (
                <div className="text-lg font-bold text-blue-600">
                  ${price.toFixed(2)}
                </div>
              )}
            </div>
          </div>

          <Link
            to={`/courses/${_id}`}
            className="mt-4 w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-300 transform hover:translate-y-[-2px] hover:shadow-md"
            aria-label={`View course: ${title}`}
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
