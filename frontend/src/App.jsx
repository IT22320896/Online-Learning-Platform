import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CoursesList from "./pages/CoursesList";
import CourseDetails from "./pages/CourseDetails";
import InstructorDashboard from "./pages/InstructorDashboard";
import CreateCourse from "./pages/CreateCourse";
import EditCourse from "./pages/EditCourse";
import EnrolledCourses from "./pages/EnrolledCourses";
import CourseRecommendations from "./pages/CourseRecommendations";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/routes/PrivateRoute";
import GuestRoute from "./components/routes/GuestRoute";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen w-full">
          <Navbar />
          <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Guest routes - redirect to dashboard if already logged in */}
              <Route
                path="/login"
                element={
                  <GuestRoute>
                    <Login />
                  </GuestRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <GuestRoute>
                    <Register />
                  </GuestRoute>
                }
              />

              <Route path="/courses" element={<CoursesList />} />
              <Route path="/courses/:id" element={<CourseDetails />} />

              {/* Private routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/enrolled-courses"
                element={
                  <PrivateRoute>
                    <EnrolledCourses />
                  </PrivateRoute>
                }
              />
              <Route
                path="/recommendations"
                element={
                  <PrivateRoute>
                    <CourseRecommendations />
                  </PrivateRoute>
                }
              />
              <Route
                path="/instructor/dashboard"
                element={
                  <PrivateRoute allowedRoles={["instructor", "admin"]}>
                    <InstructorDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/instructor/create-course"
                element={
                  <PrivateRoute allowedRoles={["instructor", "admin"]}>
                    <CreateCourse />
                  </PrivateRoute>
                }
              />
              <Route
                path="/instructor/edit-course/:id"
                element={
                  <PrivateRoute allowedRoles={["instructor", "admin"]}>
                    <EditCourse />
                  </PrivateRoute>
                }
              />
              {/* Admin routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <PrivateRoute allowedRoles="admin">
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              {/* 404 Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          {/* Toast container for notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
