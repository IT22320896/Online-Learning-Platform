import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on page load
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          // Set authorization header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Get user profile
          const response = await axios.get(`${API_URL}/auth/profile`);
          setUser(response.data.user);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          // Clear invalid token
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      // Set authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true };
    } catch (error) {
      console.error("Register error:", error);
      setError(error.response?.data?.message || "Registration failed");
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);

      // Set authorization header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed");
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);

    // Clear authorization header
    delete axios.defaults.headers.common["Authorization"];
  };

  // Check if user has specific role
  const hasRole = (roles) => {
    if (!user) return false;

    if (Array.isArray(roles)) {
      return roles.includes(user.role);
    }

    return user.role === roles;
  };

  // Check if token is valid
  const isTokenValid = () => {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        hasRole,
        isTokenValid,
        isAuthenticated: !!user && isTokenValid(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
