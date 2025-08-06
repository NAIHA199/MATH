import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  FaTrophy, FaFire, FaBook, FaGamepad, FaChartLine,
  FaStar, FaArrowUp, FaArrowDown,
  FaMinus, FaBell, FaCalendarAlt
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../utils/helpers';
import {
  mockUserProgress,
  mockWeeklyStats,
  mockSubjectProgress,
  mockRecentActivities,
  mockLeaderboard,
  mockLearningGoals
} from '../utils/mockData';


const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview'); // overview, progress, activities
  const [timeFilter, setTimeFilter] = useState('week'); // week, month, all

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Component thống kê tổng quan
  const StatCard = ({ icon, title, value, subtitle, color, trend }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${
            trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-gray-500'
          }`}>
            {trend > 0 ? <FaArrowUp className="mr-1" /> : trend < 0 ? <FaArrowDown className="mr-1" /> : <FaMinus className="mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </motion.div>
  );

  // Component biểu đồ tuần
  const WeeklyChart = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Hoạt động trong tuần</h3>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-purple-500"
        >
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="all">Tất cả</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockWeeklyStats}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" tick={{ fill: '#6b7280' }} />
          <YAxis tick={{ fill: '#6b7280' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
          />
          <Bar dataKey="points" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          <Bar dataKey="exercises" fill="#3b82f6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-sm text-gray-600">Điểm số</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-600">Bài tập</span>
        </div>
      </div>
    </motion.div>
  );

  // Component tiến độ theo chủ đề
  const SubjectProgress = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">Tiến độ theo chủ đề</h3>
      
      <div className="space-y-4">
        {mockSubjectProgress.map((subject, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{subject.subject}</span>
              <span className="text-sm text-gray-600">
                {subject.completed}/{subject.total} bài
              </span>
            </div>
            <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${subject.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="absolute h-full rounded-full"
                style={{ backgroundColor: subject.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Component hoạt động gần đây
  const RecentActivities = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Hoạt động gần đây</h3>
        <button
          onClick={() => navigate('/activities')}
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          Xem tất cả
        </button>
      </div>

      <div className="space-y-4">
        {mockRecentActivities.map((activity) => (
          <motion.div
            key={activity.id}
            whileHover={{ x: 5 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">{activity.icon}</div>
              <div>
                <p className="font-medium text-gray-800">{activity.title}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-green-600">+{activity.points}</span>
              <FaStar className="text-yellow-500" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Component bảng xếp hạng
  const Leaderboard = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Bảng xếp hạng</h3>
        <FaTrophy className="text-2xl text-yellow-500" />
      </div>

      <div className="space-y-3">
        {mockLeaderboard.map((player) => (
          <motion.div
            key={player.rank}
            whileHover={player.isCurrentUser ? {} : { scale: 1.02 }}
            className={`flex items-center justify-between p-3 rounded-xl ${
              player.isCurrentUser 
                ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300' 
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                player.rank === 1 ? 'bg-yellow-500 text-white' :
                player.rank === 2 ? 'bg-gray-400 text-white' :
                player.rank === 3 ? 'bg-orange-600 text-white' :
                'bg-gray-200 text-gray-700'
              }`}>
                {player.rank}
              </div>
              <div className="text-2xl">{player.avatar}</div>
              <div>
                <p className="font-medium text-gray-800">
                  {player.isCurrentUser ? 'Bạn' : player.name}
                </p>
                <p className="text-sm text-gray-600">{player.points} điểm</p>
              </div>
            </div>
            <div className={`text-sm ${
              player.trend === 'up' ? 'text-green-500' :
              player.trend === 'down' ? 'text-red-500' :
              'text-gray-500'
            }`}>
              {player.trend === 'up' ? <FaArrowUp /> :
               player.trend === 'down' ? <FaArrowDown /> :
               <FaMinus />}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // Component mục tiêu học tập
  const LearningGoals = () => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">Mục tiêu học tập</h3>
      
      <div className="space-y-4">
        {mockLearningGoals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <div key={goal.id} className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">{goal.title}</h4>
                <span className="text-sm text-gray-500">{goal.deadline}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {goal.current}/{goal.target}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate('/goals')}
        className="w-full mt-4 py-3 bg-purple-100 text-purple-700 rounded-xl font-medium hover:bg-purple-200 transition-colors"
      >
        Đặt mục tiêu mới
      </button>
    </motion.div>
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4 md:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Xin chào, {user.username}! 👋
            </h1>
            <p className="text-gray-600">
              {new Date().toLocaleDateString('vi-VN', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-3 bg-white rounded-xl shadow hover:shadow-lg transition-all">
              <FaBell className="text-xl text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => navigate('/calendar')}
              className="p-3 bg-white rounded-xl shadow hover:shadow-lg transition-all"
            >
              <FaCalendarAlt className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-4 mb-8 overflow-x-auto"
      >
        {[
          { id: 'overview', label: 'Tổng quan', icon: <FaChartLine /> },
          { id: 'progress', label: 'Tiến độ', icon: <FaBook /> },
          { id: 'activities', label: 'Hoạt động', icon: <FaGamepad /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
              selectedTab === tab.id
                ? 'bg-white text-purple-700 shadow-lg'
                : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Stats Cards */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<FaStar />}
            title="Tổng điểm"
            value={mockUserProgress.totalPoints.toLocaleString()}
            subtitle="Tăng 15% so với tuần trước"
            color="from-yellow-400 to-orange-500"
            trend={15}
          />
          <StatCard
            icon={<FaFire />}
            title="Chuỗi ngày"
            value={`${mockUserProgress.currentStreak} ngày`}
            subtitle="Giữ vững phong độ!"
            color="from-red-400 to-pink-500"
            trend={0}
          />
          <StatCard
            icon={<FaTrophy />}
            title="Cấp độ"
            value={`Cấp ${mockUserProgress.level}`}
            subtitle="Còn 150 điểm nữa lên cấp"
            color="from-purple-400 to-indigo-500"
            trend={8}
          />
          <StatCard
            icon={<FaBook />}
            title="Bài học"
            value={mockUserProgress.totalLessonsCompleted}
            subtitle="Hoàn thành tuần này: 12"
            color="from-green-400 to-emerald-500"
            trend={20}
          />
        </div>

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <WeeklyChart />
          <SubjectProgress />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <RecentActivities />
          <Leaderboard />
          <LearningGoals />
        </div>
      </motion.div>

      {/* Floating Action Buttons */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-8 right-8 flex flex-col gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/exercise/daily')}
          className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg text-white flex items-center justify-center"
        >
          <FaGamepad className="text-xl" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Dashboard;