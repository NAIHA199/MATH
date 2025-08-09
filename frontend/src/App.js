import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthenticatedHomePage from './pages/AuthenticatedHomePage';
import Dashboard from './pages/Dashboard';
import LessonPage from './pages/LessonPage';
import GamePage from './pages/GamePage';
import RewardPage from './pages/RewardPage';
import ExercisePage from './pages/ExercisePage';

// Import utils
import { getCurrentUser } from './utils/helpers';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const user = getCurrentUser();
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />
          
          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          
          {/* Protected routes - Main authenticated home */}
          <Route path="/home" element={
            <ProtectedRoute>
              <AuthenticatedHomePage />
            </ProtectedRoute>
          } />
          
          {/* Legacy dashboard redirects */}
          <Route path="/dashboard" element={<Navigate to="/home" replace />} />
          <Route path="/student-dashboard" element={<Navigate to="/home" replace />} />
          <Route path="/teacher-dashboard" element={<Navigate to="/home" replace />} />
          <Route path="/parent-dashboard" element={<Navigate to="/home" replace />} />
          
          {/* Student features */}
          <Route path="/lessons" element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          } />
          
          <Route path="/games" element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          } />
          
          <Route path="/rewards" element={
            <ProtectedRoute>
              <RewardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/progress" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-3xl">Trang Tiến độ (Đang phát triển)</h1>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/exercises" element={
            <ProtectedRoute>
              <ExercisePage />
            </ProtectedRoute>
          } />
          
          {/* Teacher specific routes */}
          <Route path="/classes" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-3xl">Quản lý lớp học (Đang phát triển)</h1>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/assignments" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-3xl">Quản lý bài tập (Đang phát triển)</h1>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/students" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-3xl">Quản lý học sinh (Đang phát triển)</h1>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-3xl">Báo cáo (Đang phát triển)</h1>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Parent specific routes */}
          <Route path="/children" element={
            <ProtectedRoute>
              <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-3xl">Quản lý con em (Đang phát triển)</h1>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </Router>
  );
}

export default App;