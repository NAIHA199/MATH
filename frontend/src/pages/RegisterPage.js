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

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  // States
  const [currentStep, setCurrentStep] = useState('accountType');
  const [selectedAccountType, setSelectedAccountType] = useState(null);

  // Handle account type selection
  const handleAccountTypeSelect = (type) => {
    setSelectedAccountType(type);
    setCurrentStep('registerForm');
  };

  // Handle register
  const handleRegister = async (data) => {
    try {
      setCurrentStep('launch');
      await register({
        ...data,
        userType: selectedAccountType.id
      });
      
      toast.success('🎉 Đăng ký thành công! Vui lòng đăng nhập để tiếp tục!');
      
      // Redirect to login after success
      setTimeout(() => {
        navigate('/login'); // ✅ Chuyển về login thay vì dashboard
      }, 2000);
    } catch (error) {
      setCurrentStep('registerForm');
      toast.error('🚀 Đăng ký thất bại! Vui lòng thử lại!');
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Space Background */}
      <SpaceBackground />
      
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="w-full max-w-6xl px-4"
            >
              <motion.h1 
                className="text-center text-5xl md:text-6xl font-bold text-white mb-4"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
              >
                <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Tham gia Math Galaxy
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-center text-xl text-blue-200 mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Bắt đầu hành trình khám phá vũ trụ toán học
              </motion.p>

              <AccountTypeSelector 
                onSelect={handleAccountTypeSelect}
                mode="register"
              />
            </motion.div>
          )}

          {currentStep === 'registerForm' && (
            <motion.div
              key="register-form"
              initial={{ x: '100%', rotate: 15 }}
              animate={{ x: 0, rotate: 0 }}
              exit={{ x: '-100%', rotate: -15 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-2xl px-4"
            >
              <AstronautMascot 
                emotion="happy" 
                message={`Chào mừng ${selectedAccountType.name} mới!`}
              />
              
              <SpaceshipForm
                accountType={selectedAccountType}
                onSubmit={handleRegister}
                onBack={() => setCurrentStep('accountType')}
                isLoading={isLoading}
                formType="register"
              />
            </motion.div>
          )}

          {currentStep === 'launch' && (
            <motion.div
              key="launch-sequence"
              className="text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.5, 1],
                  rotate: [0, 360, 720]
                }}
                transition={{ duration: 2 }}
                className="text-8xl mb-8"
              >
                🎉
              </motion.div>
              
              <motion.h2
                className="text-4xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Đăng ký thành công! Chuẩn bị chuyển hướng...
              </motion.h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RegisterPage;