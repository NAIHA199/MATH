import React, { useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHome, 
  FaBook, 
  FaGamepad, 
  FaTrophy, 
  FaChartLine,
  FaUsers,
  FaClipboardList,
  FaTimes
} from 'react-icons/fa';
import AuthenticatedNavbar from './AuthenticatedNavbar';

const MainLayout = ({ user }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items theo user type
  const navigationItems = {
    student: [
      { path: '/student-dashboard', label: 'Trang chủ', icon: <FaHome />, color: 'from-purple-500 to-pink-500' },
      { path: '/lessons', label: 'Bài học', icon: <FaBook />, color: 'from-blue-500 to-cyan-500' },
      { path: '/games', label: 'Trò chơi', icon: <FaGamepad />, color: 'from-green-500 to-teal-500' },
      { path: '/rewards', label: 'Phần thưởng', icon: <FaTrophy />, color: 'from-yellow-500 to-orange-500' },
      { path: '/progress', label: 'Tiến độ', icon: <FaChartLine />, color: 'from-red-500 to-pink-500' },
    ],
    teacher: [
      { path: '/teacher-dashboard', label: 'Tổng quan', icon: <FaHome />, color: 'from-purple-500 to-pink-500' },
      { path: '/classes', label: 'Lớp học', icon: <FaUsers />, color: 'from-blue-500 to-cyan-500' },
      { path: '/assignments', label: 'Bài tập', icon: <FaClipboardList />, color: 'from-green-500 to-teal-500' },
      { path: '/students', label: 'Học sinh', icon: <FaUsers />, color: 'from-yellow-500 to-orange-500' },
      { path: '/reports', label: 'Báo cáo', icon: <FaChartLine />, color: 'from-red-500 to-pink-500' },
    ],
    parent: [
      { path: '/parent-dashboard', label: 'Tổng quan', icon: <FaHome />, color: 'from-purple-500 to-pink-500' },
      { path: '/children', label: 'Con em', icon: <FaUsers />, color: 'from-blue-500 to-cyan-500' },
      { path: '/progress', label: 'Tiến độ', icon: <FaChartLine />, color: 'from-green-500 to-teal-500' },
      { path: '/rewards', label: 'Thành tích', icon: <FaTrophy />, color: 'from-yellow-500 to-orange-500' },
    ]
  };

  const navItems = navigationItems[user?.userType] || navigationItems.student;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Space Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Authenticated Navbar */}
        <AuthenticatedNavbar 
          user={user} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Main Container */}
        <div className="flex">
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <>
                {/* Mobile Backdrop */}
                <motion.div
                  className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSidebarOpen(false)}
                />
                
                {/* Sidebar */}
                <motion.aside
                  className="fixed lg:relative left-0 top-0 h-screen w-64 bg-gray-900/90 backdrop-blur-md border-r border-gray-800 z-40 lg:z-auto"
                  initial={{ x: -300 }}
                  animate={{ x: 0 }}
                  exit={{ x: -300 }}
                >
                  {/* Mobile Close Button */}
                  <div className="lg:hidden p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="p-2 hover:bg-gray-800 rounded-lg"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/* Navigation */}
                  <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setSidebarOpen(false)}
                          className={`
                            flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                            ${isActive 
                              ? `bg-gradient-to-r ${item.color} text-white shadow-lg` 
                              : 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
                            }
                          `}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet context={{ user }} />
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;