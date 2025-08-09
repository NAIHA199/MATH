import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';

// Import components
import SpaceBackground from '../components/login/SpaceBackground';
import AccountTypeSelector from '../components/login/AccountTypeSelector';
import SpaceshipForm from '../components/login/SpaceshipForm';
import AstronautMascot from '../components/login/AstronautMascot';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  // States
  const [currentStep, setCurrentStep] = useState('accountType');
  const [selectedAccountType, setSelectedAccountType] = useState(null);

  // Handle account type selection
  const handleAccountTypeSelect = (type) => {
    setSelectedAccountType(type);
    setCurrentStep('loginForm');
    
    // Safely play sound - không crash nếu không có file
    try {
      const audio = new Audio('/sounds/select.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore audio errors silently
      });
    } catch (error) {
      // Ignore audio errors
    }
  };

  // Handle login
  const handleLogin = async (data) => {
    try {
      setCurrentStep('launch');
      await login({
        ...data,
        userType: selectedAccountType.id
      });
      
      // Success animation
      setTimeout(() => {
        navigate('/home'); 
      }, 1500);
    } catch (error) {
      setCurrentStep('loginForm');
      toast.error('🚀 Đăng nhập thất bại! Kiểm tra lại thông tin nhé!');
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Space Background - Simplified */}
      <SpaceBackground simplified={true} />
      
      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <FaArrowLeft />
          <span>Về trang chủ</span>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentStep === 'accountType' && (
            <motion.div
              key="account-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-6xl px-4"
            >
              <h1 className="text-center text-5xl md:text-6xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Đăng nhập vào Math Galaxy
                </span>
              </h1>
              
              <p className="text-center text-xl text-blue-200 mb-12">
                Chọn vai trò của bạn để tiếp tục hành trình
              </p>

              <AccountTypeSelector onSelect={handleAccountTypeSelect} />
            </motion.div>
          )}

          {currentStep === 'loginForm' && selectedAccountType && (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl px-4"
            >
              <AstronautMascot 
                emotion="excited" 
                message={`Chào mừng ${selectedAccountType.name}!`}
              />
              
              <SpaceshipForm
                accountType={selectedAccountType}
                onSubmit={handleLogin}
                onBack={() => setCurrentStep('accountType')}
                isLoading={isLoading}
                formType="login"
              />
            </motion.div>
          )}

          {currentStep === 'launch' && (
            <motion.div
              key="launch-sequence"
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <motion.div
                animate={{ 
                  y: [0, -500],
                  opacity: [1, 0]
                }}
                transition={{ duration: 1.5, ease: "easeIn" }}
                className="text-8xl mb-8"
              >
                🚀
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white">
                Đang bay vào vũ trụ toán học...
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginPage;