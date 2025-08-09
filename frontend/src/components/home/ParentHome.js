import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaChild, 
  FaChartLine, 
  FaTrophy,
  FaCalendar,
  FaBell,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';

const ParentHome = ({ user }) => {
  const navigate = useNavigate();

  // Children data
  const children = [
    {
      id: 1,
      name: 'Minh Anh',
      grade: 'Lớp 3',
      avatar: '👧',
      level: 8,
      stars: 850,
      streak: 5,
      lastActive: '2 giờ trước',
      todayProgress: 75
    },
    {
      id: 2,
      name: 'Minh Khôi',
      grade: 'Lớp 5',
      avatar: '👦',
      level: 12,
      stars: 1250,
      streak: 7,
      lastActive: '30 phút trước',
      todayProgress: 100
    }
  ];

  // Recent achievements
  const recentAchievements = [
    { id: 1, child: 'Minh Khôi', achievement: 'Hoàn thành chương Phân số', icon: '🏆', time: 'Hôm nay' },
    { id: 2, child: 'Minh Anh', achievement: 'Chuỗi 5 ngày học liên tiếp', icon: '🔥', time: 'Hôm qua' },
    { id: 3, child: 'Minh Khôi', achievement: 'Top 10 bảng xếp hạng tuần', icon: '🥇', time: '2 ngày trước' }
  ];

  // Learning insights
  const insights = [
    { type: 'success', message: 'Minh Khôi đã tiến bộ 25% trong phép chia tuần này' },
    { type: 'warning', message: 'Minh Anh cần luyện tập thêm phần phép nhân 2 chữ số' },
    { type: 'info', message: 'Cả hai con đều duy trì chuỗi học tập tốt!' }
  ];

  return (
    <div className="min-h-screen px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Xin chào, {user?.username}! 👨‍👩‍👧‍👦
              </h1>
              <p className="text-gray-400 text-lg">
                Theo dõi hành trình học tập của con bạn
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-500/20 rounded-full cursor-pointer"
            >
              <FaBell className="text-purple-400" />
              <span className="text-purple-400 font-semibold">3 thông báo mới</span>
            </motion.div>
          </div>
        </motion.section>

        {/* Children Overview */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4">Tổng quan con em</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {children.map((child) => (
              <motion.div
                key={child.id}
                className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer"
                onClick={() => navigate(`/children/${child.id}`)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{child.avatar}</div>
                    <div>
                      <h3 className="text-xl font-bold">{child.name}</h3>
                      <p className="text-gray-400">{child.grade} - Level {child.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <FaStar />
                      <span className="font-bold">{child.stars}</span>
                    </div>
                    <p className="text-sm text-gray-400">Hoạt động {child.lastActive}</p>
                  </div>
                </div>

                {/* Today's Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Tiến độ hôm nay</span>
                    <span className="text-sm font-semibold">{child.todayProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        child.todayProgress === 100 
                          ? 'bg-gradient-to-r from-green-400 to-emerald-400' 
                          : 'bg-gradient-to-r from-purple-400 to-pink-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${child.todayProgress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-orange-400">{child.streak}</p>
                    <p className="text-xs text-gray-400">Ngày liên tiếp</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-400">23</p>
                    <p className="text-xs text-gray-400">Bài đã học</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-2xl font-bold text-green-400">92%</p>
                    <p className="text-xs text-gray-400">Độ chính xác</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Insights & Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Learning Insights */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800"
            >
              <h3 className="text-xl font-bold mb-4">Phân tích học tập</h3>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl flex items-start gap-3 ${
                      insight.type === 'success' ? 'bg-green-500/10 border border-green-500/30' :
                      insight.type === 'warning' ? 'bg-yellow-500/10 border border-yellow-500/30' :
                      'bg-blue-500/10 border border-blue-500/30'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {insight.type === 'success' ? <FaCheckCircle className="text-green-400 text-xl mt-0.5" /> :
                     insight.type === 'warning' ? <FaExclamationCircle className="text-yellow-400 text-xl mt-0.5" /> :
                     <FaBell className="text-blue-400 text-xl mt-0.5" />}
                    <p className="text-sm">{insight.message}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Tiến độ tuần này</h3>
                <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                  Xem chi tiết →
                </button>
              </div>
              
              {/* Simple progress visualization */}
              <div className="space-y-4">
                {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, index) => (
                  <div key={day} className="flex items-center gap-4">
                    <span className="text-sm text-gray-400 w-8">{day}</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-6 relative overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-end pr-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.random() * 60 + 40}%` }}
                        transition={{ duration: 1, delay: 0.1 * index }}
                      >
                        <span className="text-xs font-semibold">
                          {Math.floor(Math.random() * 5 + 3)} bài
                        </span>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Achievements & Schedule */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30"
            >
              <h3 className="text-xl font-bold mb-4">Thành tích gần đây</h3>
              <div className="space-y-3">
                {recentAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        <span className="text-purple-400">{achievement.child}</span>
                      </p>
                      <p className="text-xs text-gray-400">{achievement.achievement}</p>
                    </div>
                    <span className="text-xs text-gray-500">{achievement.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Study Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Lịch học hôm nay</h3>
                <FaCalendar className="text-gray-400" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaClock className="text-blue-400" />
                  <div>
                    <p className="font-medium">16:00 - Minh Anh</p>
                    <p className="text-sm text-gray-400">Bài tập phép nhân</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-green-400" />
                  <div>
                    <p className="font-medium">17:30 - Minh Khôi</p>
                    <p className="text-sm text-gray-400">Học phân số nâng cao</p>
                  </div>
                </div>
              </div>
              
              <motion.button
                className="w-full mt-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Quản lý lịch học
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentHome;