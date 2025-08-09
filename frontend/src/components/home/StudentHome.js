import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaRocket, 
  FaStar, 
  FaTrophy, 
  FaBook,
  FaGamepad,
  FaFire,
  FaChartLine,
  FaBrain,
  FaClock,
  FaGift
} from 'react-icons/fa';

const StudentHome = ({ user }) => {
  const navigate = useNavigate();

  // Daily missions
  const dailyMissions = [
    { id: 1, title: 'Hoàn thành 3 bài học', progress: 1, total: 3, reward: 50 },
    { id: 2, title: 'Chơi 2 trò chơi', progress: 0, total: 2, reward: 30 },
    { id: 3, title: 'Đạt 100% trong 1 bài kiểm tra', progress: 0, total: 1, reward: 100 }
  ];

  // Recent activities
  const recentActivities = [
    { id: 1, type: 'lesson', title: 'Phép cộng có nhớ', score: 95, time: '10 phút trước' },
    { id: 2, type: 'game', title: 'Bắn số học', score: 1250, time: '1 giờ trước' },
    { id: 3, type: 'achievement', title: 'Nhà toán học tuần', time: 'Hôm qua' }
  ];

  // Quick actions with animations
  const quickActions = [
    {
      title: 'Tiếp tục học',
      subtitle: 'Bài 5: Phép nhân',
      icon: <FaBook />,
      color: 'from-blue-500 to-cyan-500',
      path: '/lessons',
      progress: 65
    },
    {
      title: 'Thử thách hàng ngày',
      subtitle: 'Giải 10 bài trong 5 phút',
      icon: <FaRocket />,
      color: 'from-purple-500 to-pink-500',
      path: '/challenges',
      isNew: true
    },
    {
      title: 'Chơi game',
      subtitle: '5 game mới',
      icon: <FaGamepad />,
      color: 'from-green-500 to-teal-500',
      path: '/games',
      badge: 5
    }
  ];

  return (
    <div className="min-h-screen px-4 pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section with Animation */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Chào mừng trở lại, {user?.username}! 👋
              </h1>
              <p className="text-gray-400 text-lg">
                Hôm nay là ngày tuyệt vời để khám phá vũ trụ toán học!
              </p>
            </div>
            
            {/* Mascot Animation */}
            <motion.div
              className="text-8xl mt-4 md:mt-0"
              animate={{ 
                y: [0, -20, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🧑‍🚀
            </motion.div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30"
            >
              <FaStar className="text-3xl text-yellow-400 mb-2" />
              <p className="text-3xl font-bold text-yellow-400">1,250</p>
              <p className="text-sm text-gray-400">Tổng sao</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md rounded-2xl p-6 border border-orange-500/30"
            >
              <FaFire className="text-3xl text-orange-400 mb-2" />
              <p className="text-3xl font-bold text-orange-400">7</p>
              <p className="text-sm text-gray-400">Chuỗi ngày</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30"
            >
              <FaTrophy className="text-3xl text-purple-400 mb-2" />
              <p className="text-3xl font-bold text-purple-400">Level 8</p>
              <p className="text-sm text-gray-400">Cấp độ</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30"
            >
              <FaBrain className="text-3xl text-blue-400 mb-2" />
              <p className="text-3xl font-bold text-blue-400">95%</p>
              <p className="text-sm text-gray-400">Độ chính xác</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">Bắt đầu nhanh</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    onClick={() => navigate(action.path)}
                    className="relative overflow-hidden rounded-2xl p-6 text-left bg-gray-900/50 backdrop-blur-md border border-gray-800 hover:border-purple-500/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${action.color}`} />
                    
                    {action.isNew && (
                      <span className="absolute top-4 right-4 px-2 py-1 bg-red-500 text-xs rounded-full">
                        MỚI
                      </span>
                    )}
                    
                    {action.badge && (
                      <span className="absolute top-4 right-4 w-6 h-6 bg-purple-500 text-xs rounded-full flex items-center justify-center">
                        {action.badge}
                      </span>
                    )}
                    
                    <div className={`text-4xl mb-3 bg-gradient-to-br ${action.color} bg-clip-text text-transparent`}>
                      {action.icon}
                    </div>
                    <h3 className="font-bold text-white mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-400">{action.subtitle}</p>
                    
                    {action.progress && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            className={`bg-gradient-to-r ${action.color} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${action.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Hoạt động gần đây</h3>
                <FaClock className="text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'lesson' ? 'bg-blue-500/20 text-blue-400' :
                        activity.type === 'game' ? 'bg-green-500/20 text-green-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {activity.type === 'lesson' ? <FaBook /> :
                         activity.type === 'game' ? <FaGamepad /> :
                         <FaTrophy />}
                      </div>
                      <div>
                        <p className="font-semibold">{activity.title}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                    {activity.score && (
                      <span className="text-lg font-bold text-yellow-400">
                        {activity.score}{activity.type === 'lesson' ? '%' : ' điểm'}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Daily Missions & Rewards */}
          <div className="space-y-6">
            {/* Daily Missions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Nhiệm vụ hôm nay</h3>
                <FaGift className="text-purple-400" />
              </div>
              
              <div className="space-y-4">
                {dailyMissions.map((mission) => (
                  <div key={mission.id}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{mission.title}</p>
                      <span className="text-xs text-yellow-400">+{mission.reward} ⭐</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(mission.progress / mission.total) * 100}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {mission.progress}/{mission.total} hoàn thành
                    </p>
                  </div>
                ))}
              </div>
              
              <motion.button
                className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Xem tất cả nhiệm vụ
              </motion.button>
            </motion.div>

            {/* Special Event */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative overflow-hidden bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30"
            >
              <motion.div
                className="absolute -top-10 -right-10 text-8xl opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                🌟
              </motion.div>
              
              <h3 className="text-xl font-bold mb-2">Sự kiện đặc biệt</h3>
              <p className="text-sm text-gray-300 mb-4">
                Tuần lễ vũ trụ: Nhân đôi sao cho mọi hoạt động!
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Còn lại: 2 ngày</span>
                <button className="text-yellow-400 hover:text-yellow-300 font-semibold">
                  Chi tiết →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;