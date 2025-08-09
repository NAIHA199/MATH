import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaClipboardList, 
  FaChartLine,
  FaBell,
  FaCalendar,
  FaBook,
  FaCheckCircle,
  FaClock
} from 'react-icons/fa';

const TeacherHome = ({ user }) => {
  const navigate = useNavigate();

  // Teacher stats
  const stats = {
    totalStudents: 45,
    activeClasses: 3,
    pendingAssignments: 12,
    completionRate: 78
  };

  // Recent activities
  const recentActivities = [
    { id: 1, student: 'Nguyễn Văn A', action: 'đã nộp bài tập', subject: 'Phép nhân', time: '5 phút trước' },
    { id: 2, student: 'Trần Thị B', action: 'đạt 100% bài kiểm tra', subject: 'Phép chia', time: '1 giờ trước' },
    { id: 3, student: 'Lê Văn C', action: 'cần hỗ trợ với', subject: 'Phân số', time: '2 giờ trước' }
  ];

  // Class overview
  const classes = [
    { id: 1, name: 'Lớp 3A', students: 25, progress: 65, nextLesson: 'Phép nhân 2 chữ số' },
    { id: 2, name: 'Lớp 4B', students: 20, progress: 80, nextLesson: 'Phân số cơ bản' },
    { id: 3, name: 'Lớp 5A', students: 22, progress: 45, nextLesson: 'Hình học không gian' }
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
                Xin chào, {user?.username}! 👩‍🏫
              </h1>
              <p className="text-gray-400 text-lg">
                Hãy cùng tạo nên một ngày học tập tuyệt vời cho học sinh
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-500/20 rounded-full cursor-pointer"
            >
              <FaBell className="text-purple-400" />
              <span className="text-purple-400 font-semibold">5 thông báo mới</span>
            </motion.div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-500/30"
            >
              <FaUsers className="text-3xl text-blue-400 mb-2" />
              <p className="text-3xl font-bold text-blue-400">{stats.totalStudents}</p>
              <p className="text-sm text-gray-400">Học sinh</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/30"
            >
              <FaBook className="text-3xl text-green-400 mb-2" />
              <p className="text-3xl font-bold text-green-400">{stats.activeClasses}</p>
              <p className="text-sm text-gray-400">Lớp học</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-md rounded-2xl p-6 border border-yellow-500/30"
            >
              <FaClipboardList className="text-3xl text-yellow-400 mb-2" />
              <p className="text-3xl font-bold text-yellow-400">{stats.pendingAssignments}</p>
              <p className="text-sm text-gray-400">Bài tập chờ chấm</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30"
            >
              <FaChartLine className="text-3xl text-purple-400 mb-2" />
              <p className="text-3xl font-bold text-purple-400">{stats.completionRate}%</p>
              <p className="text-sm text-gray-400">Tỷ lệ hoàn thành</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Classes Overview */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">Lớp học của bạn</h2>
              <div className="space-y-4">
                {classes.map((cls) => (
                  <motion.div
                    key={cls.id}
                    className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer"
                    onClick={() => navigate('/classes')}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{cls.name}</h3>
                      <span className="text-sm text-gray-400">{cls.students} học sinh</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Tiến độ khóa học</span>
                        <span className="text-sm font-semibold">{cls.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${cls.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Bài học tiếp theo</p>
                        <p className="font-medium">{cls.nextLesson}</p>
                      </div>
                      <motion.button
                        className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/assignments');
                        }}
                      >
                        Giao bài tập
                      </motion.button>
                    </div>
                  </motion.div>
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
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        <span className="text-purple-400">{activity.student}</span> {activity.action} <span className="text-blue-400">{activity.subject}</span>
                      </p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                    {activity.action.includes('100%') && (
                      <FaCheckCircle className="text-green-400 text-xl" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Quick Actions & Schedule */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30"
            >
              <h3 className="text-xl font-bold mb-4">Thao tác nhanh</h3>
              
              <div className="space-y-3">
                <motion.button
                  className="w-full py-3 bg-purple-500/20 text-purple-400 rounded-xl hover:bg-purple-500/30 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/assignments')}
                >
                  Tạo bài tập mới
                </motion.button>
                
                <motion.button
                  className="w-full py-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/reports')}
                >
                  Xem báo cáo lớp
                </motion.button>
                
                <motion.button
                  className="w-full py-3 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/students')}
                >
                  Quản lý học sinh
                </motion.button>
              </div>
            </motion.div>

            {/* Today's Schedule */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Lịch hôm nay</h3>
                <FaCalendar className="text-gray-400" />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div>
                    <p className="font-medium">8:00 - Lớp 3A</p>
                    <p className="text-sm text-gray-400">Phép nhân cơ bản</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div>
                    <p className="font-medium">10:00 - Lớp 4B</p>
                    <p className="text-sm text-gray-400">Kiểm tra phân số</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <div>
                    <p className="font-medium">14:00 - Họp phụ huynh</p>
                    <p className="text-sm text-gray-400">Online via Zoom</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;