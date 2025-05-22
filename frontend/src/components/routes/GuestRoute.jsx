import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Guest Route Component
 * Only allows non-authenticated users to view the page
 * Redirects authenticated users to dashboard
 */
const GuestRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  // If not authenticated, render the children
  return children;
};

export default GuestRoute;
