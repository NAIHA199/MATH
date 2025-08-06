import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import LessonPage from './pages/LessonPage';
import ExercisePage from './pages/ExercisePage';
import GamePage from './pages/GamePage';
import RewardPage from './pages/RewardPage';

// Import components
import Navbar from './components/common/Navbar';
import { getCurrentUser } from './utils/helpers';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = getCurrentUser();
  // Kiểm tra kỹ hơn giá trị user
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes - không cần đăng nhập */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes - cần đăng nhập */}
          <Route path="/" element={
            <Layout>
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            </Layout>
          } />
          
          <Route path="/dashboard" element={
            <Layout>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </Layout>
          } />
          
          <Route path="/lessons/:grade" element={
            <Layout>
              <ProtectedRoute>
                <LessonPage />
              </ProtectedRoute>
            </Layout>
          } />
          
          <Route path="/exercise/:lessonId" element={
            <Layout>
              <ProtectedRoute>
                <ExercisePage />
              </ProtectedRoute>
            </Layout>
          } />
          
          <Route path="/games" element={
            <Layout>
              <ProtectedRoute>
                <GamePage />
              </ProtectedRoute>
            </Layout>
          } />
          
          <Route path="/rewards" element={
            <Layout>
              <ProtectedRoute>
                <RewardPage />
              </ProtectedRoute>
            </Layout>
          } />
          
          {/* Redirect tất cả các route khác về trang chủ */}
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
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;