import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <div className="absolute rotate-12 rounded-full bg-blue-100 px-2 text-sm text-blue-800">
        Page Not Found
      </div>
      <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Oops! You seem lost.
      </h2>
      <p className="mt-6 text-base leading-7 text-gray-600 max-w-lg">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
        <Link to="/courses" className="btn-secondary">
          Explore courses
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
