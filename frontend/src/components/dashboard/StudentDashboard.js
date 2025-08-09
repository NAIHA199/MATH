import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaRocket, 
  FaStar, 
  FaTrophy, 
  FaBook,
  FaGamepad,
  FaFire
} from 'react-icons/fa';

const StudentDashboard = ({ user }) => {
  const navigate = useNavigate();

  // Mock data
  const stats = {
    totalStars: 1250,
    currentStreak: 7,
    lessonsCompleted: 23,
    level: 8
  };

  const quickActions = [
    {
      title: 'Tiếp tục học',
      icon: <FaBook />,
      color: 'from-blue-500 to-cyan-500',
      path: '/lessons'
    },
    {
      title: 'Chơi game',
      icon: <FaGamepad />,
      color: 'from-green-500 to-teal-500',
      path: '/games'
    },
    {
      title: 'Xem phần thưởng',
      icon: <FaTrophy />,
      color: 'from-yellow-500 to-orange-500',
      path: '/rewards'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">
          Chào mừng trở lại, {user?.username}! 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Hãy cùng khám phá vũ trụ toán học hôm nay!
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-2">
            <FaStar className="text-3xl text-yellow-400" />
            <span className="text-sm text-gray-400">Tổng sao</span>
          </div>
          <p className="text-3xl font-bold text-yellow-400">{stats.totalStars}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-2">
            <FaFire className="text-3xl text-orange-400" />
            <span className="text-sm text-gray-400">Chuỗi ngày</span>
          </div>
          <p className="text-3xl font-bold text-orange-400">{stats.currentStreak} ngày</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-2">
            <FaBook className="text-3xl text-blue-400" />
            <span className="text-sm text-gray-400">Bài học</span>
          </div>
          <p className="text-3xl font-bold text-blue-400">{stats.lessonsCompleted}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700"
        >
          <div className="flex items-center justify-between mb-2">
            <FaRocket className="text-3xl text-purple-400" />
            <span className="text-sm text-gray-400">Cấp độ</span>
          </div>
          <p className="text-3xl font-bold text-purple-400">Level {stats.level}</p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Bắt đầu nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onClick={() => navigate(action.path)}
              className={`
                relative overflow-hidden rounded-2xl p-6 text-left
                bg-gradient-to-br ${action.color}
                hover:scale-105 transition-transform
              `}
            >
              <div className="text-4xl mb-3 text-white/90">{action.icon}</div>
              <h3 className="text-xl font-bold text-white">{action.title}</h3>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;