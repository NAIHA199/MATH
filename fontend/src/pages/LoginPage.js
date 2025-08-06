import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaLock, 
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
  FaChild,
  FaGoogle,
  FaFacebook
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { images, sounds } from '../assets';
import ParticlesBackground from '../components/ui/ParticlesBackground';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // States
  const [userType, setUserType] = useState('student'); // student hoặc parent
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mascotMood, setMascotMood] = useState('happy');

  // Gradient colors cho mỗi user type
  const gradients = {
    student: {
      from: 'from-pink-400 via-purple-400 to-indigo-400',
      button: 'bg-gradient-to-r from-pink-500 to-purple-600',
      hover: 'hover:from-pink-600 hover:to-purple-700',
      shadow: 'shadow-purple-500/25',
      blob1: 'bg-pink-300',
      blob2: 'bg-purple-300'
    },
    parent: {
      from: 'from-blue-400 via-cyan-400 to-teal-400',
      button: 'bg-gradient-to-r from-blue-500 to-teal-600',
      hover: 'hover:from-blue-600 hover:to-teal-700',
      shadow: 'shadow-blue-500/25',
      blob1: 'bg-blue-300',
      blob2: 'bg-teal-300'
    }
  };

  const currentGradient = gradients[userType];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
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
        stiffness: 100
      }
    }
  };

  // Floating animation cho background elements
  const floatingVariants = {
    animate: {
      y: [0, -30, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Validation rules
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = userType === 'student' 
        ? 'Em cần nhập tên đăng nhập!' 
        : 'Vui lòng nhập tên đăng nhập!';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự!';
    }

    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu!';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Update mascot mood chỉ khi có sự thay đổi đáng kể
    // Giảm tần suất thay đổi để tránh re-render liên tục
    if (value.length > 0 && mascotMood !== 'thinking') {
      setMascotMood('thinking');
    } else if (value.length === 0 && mascotMood !== 'happy') {
      setMascotMood('happy');
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      const audio = new Audio(sounds.wrong);
      audio.play();
      setMascotMood('sad');
      return;
    }

    setIsLoading(true);
    setMascotMood('celebrate');

    // Giả lập API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Lưu user info
      localStorage.setItem('user', JSON.stringify({
        username: formData.username,
        type: userType,
        avatar: userType === 'student' ? images.mascot.happy : '👨‍👩‍👧'
      }));

      // Play success sound
      const audio = new Audio(sounds.success);
      audio.play();

      toast.success(
        userType === 'student' 
          ? `Chào mừng ${formData.username} đến với Math Kids! 🎉` 
          : `Xin chào ${formData.username}! Chào mừng quay trở lại! 👋`
      );

      setTimeout(() => {
        navigate(userType === 'student' ? '/' : '/dashboard');
      }, 1000);

    } catch (error) {
      toast.error('Đăng nhập thất bại! Vui lòng thử lại.');
      setMascotMood('sad');
    } finally {
      setIsLoading(false);
    }
  };

  // Social login
  const handleSocialLogin = (provider) => {
    toast.info(`Đang đăng nhập với ${provider}...`);
  };

  // Input field component
  const InputField = ({ icon, name, type, placeholder, value, onChange, error }) => (
    <motion.div variants={itemVariants} className="mb-4">
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          {icon}
        </div>
        
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full pl-12 pr-12 py-4 
            border-2 rounded-2xl
            text-lg font-medium
            transition-all duration-300
            ${error 
              ? 'border-red-400 bg-red-50 focus:border-red-500' 
              : 'border-gray-200 bg-white focus:border-purple-400 hover:border-gray-300'
            }
            focus:outline-none focus:shadow-lg
          `}
        />

        {/* Show/Hide password button */}
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-sm mt-2 ml-2 flex items-center"
          >
            <span className="mr-1">⚠️</span> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Particles */}
      <ParticlesBackground />

      {/* Floating decorations */}
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className={`absolute top-20 left-10 w-32 h-32 ${currentGradient.blob1} rounded-full blur-3xl opacity-30`}
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
        className={`absolute bottom-20 right-10 w-40 h-40 ${currentGradient.blob2} rounded-full blur-3xl opacity-30`}
      />

      {/* Floating shapes */}
      <motion.div
        animate={{ 
          rotate: 360,
          y: [0, 20, 0]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity }
        }}
        className="absolute top-40 right-20 text-6xl opacity-20"
      >
        🌟
      </motion.div>
      
      <motion.div
        animate={{ 
          rotate: -360,
          x: [0, 30, 0]
        }}
        transition={{ 
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          x: { duration: 5, repeat: Infinity }
        }}
        className="absolute bottom-40 left-20 text-5xl opacity-20"
      >
        🌈
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Logo and mascot */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-8"
          >
            <motion.img
              src={images.logo}
              alt="Math Kids"
              className="h-24 mx-auto mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img
                src={images.mascot[mascotMood]}
                alt="Mascot"
                className="w-32 h-32 mx-auto"
              />
            </motion.div>

            <h1 className="text-4xl font-bold text-white mt-4 mb-2">
              {userType === 'student' ? 'Chào em! 👋' : 'Xin chào! 👋'}
            </h1>
            <p className="text-white/80 text-lg">
              {userType === 'student' 
                ? 'Hãy đăng nhập để bắt đầu học nhé!' 
                : 'Đăng nhập để theo dõi con em'}
            </p>
          </motion.div>

          {/* User type selector */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="bg-white/20 backdrop-blur-md p-1 rounded-2xl flex">
              <button
                onClick={() => setUserType('student')}
                className={`
                  flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300
                  flex items-center justify-center gap-2
                  ${userType === 'student'
                    ? 'bg-white text-purple-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <FaChild className="text-xl" />
                <span>Học sinh</span>
              </button>
              
              <button
                onClick={() => setUserType('parent')}
                className={`
                  flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300
                  flex items-center justify-center gap-2
                  ${userType === 'parent'
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'text-white hover:bg-white/10'
                  }
                `}
              >
                <FaGraduationCap className="text-xl" />
                <span>Phụ huynh/GV</span>
              </button>
            </div>
          </motion.div>

          {/* Login form */}
          <motion.div
            variants={itemVariants}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit}>
              <InputField
                icon={<FaUser />}
                name="username"
                type="text"
                placeholder={userType === 'student' ? 'Tên đăng nhập của em' : 'Tên đăng nhập'}
                value={formData.username}
                onChange={handleChange}
                error={errors.username}
              />

              <InputField
                icon={<FaLock />}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-600">Ghi nhớ</span>
                </label>
                
                <Link
                  to="/forgot-password"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`
                  w-full py-4 rounded-2xl font-bold text-white text-lg
                  transition-all duration-300
                  ${currentGradient.button} ${currentGradient.hover}
                  shadow-xl hover:shadow-2xl ${currentGradient.shadow}
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                `}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang đăng nhập...</span>
                  </>
                ) : (
                  <>
                    <span>Đăng nhập</span>
                    <span className="text-2xl">🚀</span>
                  </>
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Hoặc đăng nhập với</span>
                </div>
              </div>

              {/* Social login */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <FaGoogle className="text-red-500 text-xl" />
                  <span className="font-medium">Google</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <FaFacebook className="text-blue-600 text-xl" />
                  <span className="font-medium">Facebook</span>
                </motion.button>
              </div>
            </form>

            {/* Sign up link */}
            <motion.div
              variants={itemVariants}
              className="text-center mt-6 pt-6 border-t border-gray-200"
            >
              <p className="text-gray-600">
                {userType === 'student' 
                  ? 'Chưa có tài khoản? Hãy nhờ ba mẹ ' 
                  : 'Chưa có tài khoản? '}
                <Link
                  to="/register"
                  className="text-purple-600 hover:text-purple-700 font-bold"
                >
                  đăng ký ngay
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;