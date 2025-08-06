import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCurrentUser } from '../utils/helpers';
import { 
  FaPlay, 
  FaBook, 
  FaGamepad, 
  FaTrophy,
  FaChartLine,
  FaRocket,
  FaUser
} from 'react-icons/fa';
import ParticlesBackground from '../components/ui/ParticlesBackground';
import Button from '../components/ui/Button';

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [mascotAnimation, setMascotAnimation] = useState('wave');
  const [currentGradeHover, setCurrentGradeHover] = useState(null); // Thêm state cho grade hover
    
  useEffect(() => {
    const currentUser = getCurrentUser();
    console.log('Current user:', currentUser); // Debug log
    setUser(currentUser);
  }, []);


  // Dữ liệu các lớp học với thiết kế riêng
  const grades = [
    { 
      id: 1, 
      name: 'Lớp 1', 
      color: 'from-pink-400 to-pink-600',
      shadowColor: 'shadow-pink-400/50',
      icon: '🦄',
      description: 'Học số đếm và phép tính cơ bản',
      totalLessons: 25
    },
    { 
      id: 2, 
      name: 'Lớp 2', 
      color: 'from-purple-400 to-purple-600',
      shadowColor: 'shadow-purple-400/50',
      icon: '🦋',
      description: 'Phép cộng trừ nâng cao',
      totalLessons: 30
    },
    { 
      id: 3, 
      name: 'Lớp 3', 
      color: 'from-blue-400 to-blue-600',
      shadowColor: 'shadow-blue-400/50',
      icon: '🐬',
      description: 'Nhân chia và bài toán',
      totalLessons: 35
    },
    { 
      id: 4, 
      name: 'Lớp 4', 
      color: 'from-green-400 to-green-600',
      shadowColor: 'shadow-green-400/50',
      icon: '🦜',
      description: 'Phân số và hình học',
      totalLessons: 40
    },
    { 
      id: 5, 
      name: 'Lớp 5', 
      color: 'from-yellow-400 to-orange-500',
      shadowColor: 'shadow-yellow-400/50',
      icon: '🦁',
      description: 'Toán nâng cao và ứng dụng',
      totalLessons: 45
    },
  ];

  // Features của website
  const features = [
    {
      icon: <FaBook className="text-3xl" />,
      title: 'Bài học tương tác',
      description: 'Video động, hình ảnh minh họa sống động',
      color: 'from-pink-400 to-pink-600'
    },
    {
      icon: <FaGamepad className="text-3xl" />,
      title: 'Trò chơi giáo dục',
      description: 'Học qua chơi, nhớ lâu hơn',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: <FaTrophy className="text-3xl" />,
      title: 'Phần thưởng hấp dẫn',
      description: 'Huy hiệu, điểm thưởng động viên học tập',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: 'Theo dõi tiến độ',
      description: 'Báo cáo chi tiết cho phụ huynh',
      color: 'from-green-400 to-green-600'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Mascot animations
  const mascotVariants = {
    wave: {
      rotate: [0, 10, -10, 10, 0],
      transition: { duration: 2, repeat: Infinity }
    },
    jump: {
      y: [0, -20, 0],
      transition: { duration: 1, repeat: Infinity }
    },
    bounce: {
      scale: [1, 1.1, 1],
      transition: { duration: 1.5, repeat: Infinity }
    }
  };

  // Change mascot animation periodically
  useEffect(() => {
    const animations = ['wave', 'jump', 'bounce'];
    const interval = setInterval(() => {
      setMascotAnimation(animations[Math.floor(Math.random() * animations.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Gradient Background với pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 opacity-90" />
      
      {/* Decorative shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200 rounded-full blur-3xl opacity-20 animate-pulse-slow" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={mascotVariants[mascotAnimation]}
                  className="text-4xl"
                >
                  🎓
                </motion.div>
                <h1 className="text-2xl font-bold gradient-text">Math Kids</h1>
              </div>

              {/* Menu */}
              <div className="flex items-center space-x-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                >
                  Đăng nhập
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                >
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="px-4 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                {user ? (
                  // Nếu đã login
                  <>
                    <span className="gradient-text">Chào mừng</span>
                    <span className="text-gray-800"> {user.username} </span>
                    <span className="text-secondary-500">trở lại!</span>
                  </>
                ) : (
                  // Nếu chưa login
                  <>
                    <span className="gradient-text">Toán học</span>
                    <span className="text-gray-800"> thật </span>
                    <span className="text-secondary-500">vui!</span>
                  </>
                )}
              </motion.h1>
              
              <motion.p 
                className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Nền tảng học toán tương tác #1 cho học sinh tiểu học
                với bài học sinh động và trò chơi hấp dẫn
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                {!user ? (
                  // PHẦN NÀY HIỂN THỊ KHI CHƯA ĐĂNG NHẬP
                  <>
                    <Button
                      variant="primary"
                      size="lg"
                      icon={<FaPlay />}
                      onClick={() => navigate('/login')}
                      className="min-w-[200px]"
                    >
                      Bắt đầu học
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<FaUser />}
                      onClick={() => navigate('/register')}
                      className="min-w-[200px]"
                    >
                      Đăng ký ngay
                    </Button>
                  </>
                ) : (
                  // PHẦN NÀY HIỂN THỊ KHI ĐÃ ĐĂNG NHẬP
                  <>
                    <Button
                      variant="primary"
                      size="lg"
                      icon={<FaChartLine />}
                      onClick={() => navigate('/dashboard')}
                      className="min-w-[200px]"
                    >
                      Vào học ngay
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      icon={<FaGamepad />}
                      onClick={() => navigate('/games')}
                      className="min-w-[200px]"
                    >
                      Chơi game
                    </Button>
                  </>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600">10K+</div>
                  <div className="text-gray-600">Học sinh</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary-600">500+</div>
                  <div className="text-gray-600">Bài học</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600">50+</div>
                  <div className="text-gray-600">Trò chơi</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Grade Selection Section */}
        <section className="px-4 py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Chọn lớp học của em</h2>
              <p className="text-xl text-gray-600">Mỗi lớp có chương trình riêng phù hợp với độ tuổi</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
              {grades.map((grade) => (
                <motion.div
                  key={grade.id}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: currentGradeHover === grade.id ? [0, -2, 2, -2, 0] : 0
                  }}
                  onHoverStart={() => setCurrentGradeHover(grade.id)}
                  onHoverEnd={() => setCurrentGradeHover(null)}
                  onClick={() => {
                    if (!user) {
                      toast.warning('Vui lòng đăng nhập để bắt đầu học!');
                      navigate('/login');
                    } else {
                      navigate(`/lessons/${grade.id}`);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <div className={`
                    relative p-6 rounded-3xl bg-gradient-to-br ${grade.color}
                    text-white shadow-xl ${grade.shadowColor}
                    transform transition-all duration-300
                    hover:shadow-2xl card-hover
                  `}>
                    {/* Sparkle effect on hover */}
                    <AnimatePresence>
                      {currentGradeHover === grade.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-2 -right-2"
                        >
                          <span className="text-2xl">✨</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="text-5xl mb-3 transform transition-transform">
                      {grade.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{grade.name}</h3>
                    <p className="text-sm opacity-90 mb-3">{grade.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs opacity-75">{grade.totalLessons} bài</span>
                      <FaPlay className="text-sm opacity-75" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">Tính năng nổi bật</h2>
              <p className="text-xl text-gray-600">Học toán chưa bao giờ thú vị đến thế</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className={`
                    w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color}
                    flex items-center justify-center text-white mb-4
                    shadow-lg
                  `}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-16 bg-gradient-to-br from-primary-500 to-primary-700">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Sẵn sàng bắt đầu hành trình học tập?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Đăng ký ngay để nhận 7 ngày dùng thử miễn phí
            </p>
            <Button
              variant="secondary"
              size="xl"
              icon={<FaRocket />}
              onClick={() => navigate('/register')}
              className="shadow-2xl"
            >
              Bắt đầu ngay - Miễn phí
            </Button>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white px-4 py-12">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Math Kids</h3>
              <p className="text-gray-400">
                Nền tảng học toán tương tác hàng đầu cho học sinh tiểu học
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Khám phá</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/lessons" className="hover:text-white">Bài học</Link></li>
                <li><Link to="/games" className="hover:text-white">Trò chơi</Link></li>
                <li><Link to="/rewards" className="hover:text-white">Phần thưởng</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white">Trợ giúp</Link></li>
                <li><Link to="/contact" className="hover:text-white">Liên hệ</Link></li>
                <li><Link to="/faq" className="hover:text-white">Câu hỏi thường gặp</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Theo dõi chúng tôi</h4>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  f
                </button>
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  t
                </button>
                <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  y
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Math Kids. Tất cả quyền được bảo lưu.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;