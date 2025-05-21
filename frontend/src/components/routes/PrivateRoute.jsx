import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Private Route Component
 * Renders children only if user is authenticated
 * If allowedRoles is provided, restricts access to users with those roles
 */
const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading, hasRole } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check role restrictions
  if (allowedRoles && !hasRole(allowedRoles)) {
    // Redirect to dashboard if role doesn't match
    return <Navigate to="/dashboard" />;
  }

  // If everything is okay, render the children
  return children;
};

export default PrivateRoute;
