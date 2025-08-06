import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaStar, 
  FaMedal,
  FaCrown,
  FaLock,
  FaCheckCircle,
  FaCalendarCheck,
  FaBolt,
  FaFire,
  FaBook
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../utils/helpers';

const RewardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Kiểm tra đăng nhập
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error('Vui lòng đăng nhập!');
      navigate('/login');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  // Dữ liệu phần thưởng
  const rewards = {
    badges: [
      {
        id: 1,
        name: 'Người mới bắt đầu',
        description: 'Hoàn thành bài học đầu tiên',
        icon: '🌟',
        color: 'from-yellow-400 to-yellow-600',
        earned: true,
        earnedDate: '2024-01-15',
        category: 'learning'
      },
      {
        id: 2,
        name: 'Siêu sao toán học',
        description: 'Đạt 100 điểm trong một bài tập',
        icon: '⭐',
        color: 'from-purple-400 to-purple-600',
        earned: true,
        earnedDate: '2024-01-20',
        category: 'achievement'
      },
      {
        id: 3,
        name: 'Chuỗi 7 ngày',
        description: 'Học 7 ngày liên tiếp',
        icon: '🔥',
        color: 'from-red-400 to-orange-600',
        earned: true,
        earnedDate: '2024-01-22',
        category: 'streak'
      },
      {
        id: 4,
        name: 'Nhà vô địch',
        description: 'Đứng top 1 bảng xếp hạng tuần',
        icon: '🏆',
        color: 'from-green-400 to-emerald-600',
        earned: false,
        requirement: 'Top 1 bảng xếp hạng',
        category: 'competition'
      },
      {
        id: 5,
        name: 'Bậc thầy phép cộng',
        description: 'Hoàn thành tất cả bài về phép cộng',
        icon: '➕',
        color: 'from-blue-400 to-cyan-600',
        earned: false,
        requirement: '15/20 bài',
        category: 'learning'
      },
      {
        id: 6,
        name: 'Tốc độ ánh sáng',
        description: 'Hoàn thành 10 bài tập trong 5 phút',
        icon: '⚡',
        color: 'from-indigo-400 to-purple-600',
        earned: false,
        requirement: 'Tốc độ trung bình: 45s/bài',
        category: 'speed'
      }
    ],
    
    achievements: [
      { id: 1, name: 'Điểm số', value: '2,850', icon: <FaStar />, color: 'text-yellow-500' },
      { id: 2, name: 'Cấp độ', value: 'Cấp 5', icon: <FaCrown />, color: 'text-purple-500' },
      { id: 3, name: 'Chuỗi ngày', value: '7 ngày', icon: <FaCalendarCheck />, color: 'text-red-500' },
      { id: 4, name: 'Bài học', value: '45', icon: <FaCheckCircle />, color: 'text-green-500' }
    ]
  };

  // Filter badges
  const filteredBadges = selectedCategory === 'all' 
    ? rewards.badges 
    : rewards.badges.filter(badge => badge.category === selectedCategory);

  // Categories
  const categories = [
    { id: 'all', name: 'Tất cả', icon: <FaTrophy /> },
    { id: 'learning', name: 'Học tập', icon: <FaBook /> },
    { id: 'achievement', name: 'Thành tích', icon: <FaMedal /> },
    { id: 'streak', name: 'Chuỗi ngày', icon: <FaFire /> },
    { id: 'competition', name: 'Thi đấu', icon: <FaTrophy /> },
    { id: 'speed', name: 'Tốc độ', icon: <FaBolt /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Phần thưởng của {user?.username || 'bạn'}
          </h1>
          <p className="text-gray-600">
            Thu thập huy hiệu và mở khóa phần thưởng đặc biệt!
          </p>
        </motion.div>

        {/* Achievement Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {rewards.achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="bg-white rounded-xl p-4 shadow-lg text-center"
            >
              <div className={`text-3xl mb-2 ${achievement.color}`}>
                {achievement.icon}
              </div>
              <p className="text-2xl font-bold text-gray-800">{achievement.value}</p>
              <p className="text-sm text-gray-600">{achievement.name}</p>
            </div>
          ))}
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {filteredBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${!badge.earned && 'opacity-75'}`}
            >
              <div className={`bg-gradient-to-br ${badge.color} p-6 rounded-2xl shadow-lg text-white text-center ${
                badge.earned ? 'cursor-pointer hover:shadow-xl transform hover:scale-105' : ''
              } transition-all`}>
                {/* Lock overlay cho badge chưa mở */}
                {!badge.earned && (
                  <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                    <FaLock className="text-4xl text-white/70" />
                  </div>
                )}

                {/* Badge content */}
                <div className="text-5xl mb-3">{badge.icon}</div>
                <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                <p className="text-sm opacity-90">{badge.description}</p>

                {/* Status */}
                {badge.earned ? (
                  <p className="text-xs mt-4 opacity-75">
                    Đạt được: {badge.earnedDate}
                  </p>
                ) : (
                  <p className="text-xs mt-4 font-medium">
                    Yêu cầu: {badge.requirement}
                  </p>
                )}
              </div>

              {/* Earned indicator */}
              {badge.earned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2"
                >
                  <FaCheckCircle />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Tiến độ thu thập</h2>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Huy hiệu đã mở khóa</span>
              <span className="font-medium">3/6</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                style={{ width: '50%' }}
              />
            </div>
          </div>

          <p className="text-gray-600">
            Tiếp tục học tập để mở khóa thêm nhiều phần thưởng hấp dẫn! 
            Mỗi huy hiệu là một cột mốc trong hành trình học tập của em.
          </p>
        </motion.div>

        {/* Special Rewards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <h3 className="text-xl font-bold mb-4">Phần thưởng đặc biệt sắp tới</h3>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="text-5xl mb-2 opacity-50">🎁</div>
              <p className="text-sm text-gray-600">Hộp quà bí ẩn</p>
              <p className="text-xs text-gray-500">Còn 2 huy hiệu</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2 opacity-50">🦄</div>
              <p className="text-sm text-gray-600">Avatar đặc biệt</p>
              <p className="text-xs text-gray-500">Còn 3 huy hiệu</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2 opacity-50">👑</div>
              <p className="text-sm text-gray-600">Danh hiệu VIP</p>
              <p className="text-xs text-gray-500">Mở khóa tất cả</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RewardPage;