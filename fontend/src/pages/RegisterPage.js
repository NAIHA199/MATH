import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChild,
  FaGraduationCap,
  FaArrowRight,
  FaArrowLeft,
  FaCheck
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { images, sounds } from '../assets';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  // States
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    // Step 1
    username: '',
    email: '',
    phone: '',
    // Step 2
    password: '',
    confirmPassword: '',
    // Step 3 - Student specific
    fullName: '',
    age: '',
    grade: '',
    parentEmail: '',
    // Step 3 - Parent specific
    childName: '',
    childAge: '',
    childGrade: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Total steps
  const totalSteps = 3;

  // Color schemes for different steps
  const stepColors = {
    1: {
      gradient: 'from-purple-400 via-pink-400 to-red-400',
      primary: 'purple',
      bg: 'bg-purple-50',
      button: 'bg-gradient-to-r from-purple-500 to-pink-500',
      blob: 'bg-purple-300'
    },
    2: {
      gradient: 'from-blue-400 via-cyan-400 to-teal-400',
      primary: 'blue',
      bg: 'bg-blue-50',
      button: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      blob: 'bg-blue-300'
    },
    3: {
      gradient: 'from-green-400 via-emerald-400 to-teal-400',
      primary: 'green',
      bg: 'bg-green-50',
      button: 'bg-gradient-to-r from-green-500 to-emerald-500',
      blob: 'bg-green-300'
    }
  };

  const currentColor = stepColors[currentStep];

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  // Validation functions
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Vui lòng nhập tên đăng nhập!';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự!';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ!';
    }

    if (userType === 'parent' && !formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu!';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự!';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu!';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu không khớp!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    
    if (userType === 'student') {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Vui lòng nhập họ tên!';
      }
      if (!formData.age) {
        newErrors.age = 'Vui lòng nhập tuổi!';
      }
      if (!formData.grade) {
        newErrors.grade = 'Vui lòng chọn lớp!';
      }
      if (!formData.parentEmail.trim()) {
        newErrors.parentEmail = 'Vui lòng nhập email phụ huynh!';
      }
    } else {
      if (!formData.childName.trim()) {
        newErrors.childName = 'Vui lòng nhập tên con!';
      }
      if (!formData.childAge) {
        newErrors.childAge = 'Vui lòng nhập tuổi con!';
      }
      if (!formData.childGrade) {
        newErrors.childGrade = 'Vui lòng chọn lớp của con!';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle next step
  const handleNext = () => {
    let isValid = false;
    
    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 2) isValid = validateStep2();
    
    if (isValid) {
      const audio = new Audio(sounds.click);
      audio.play();
      setCurrentStep(prev => prev + 1);
    } else {
      const audio = new Audio(sounds.wrong);
      audio.play();
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    const audio = new Audio(sounds.click);
    audio.play();
    setCurrentStep(prev => prev - 1);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep3()) {
      const audio = new Audio(sounds.wrong);
      audio.play();
      return;
    }

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const audio = new Audio(sounds.success);
      audio.play();

      toast.success('Đăng ký thành công! 🎉');

      // Lưu thông tin user vào localStorage (auto login)
      const newUser = {
        username: formData.username,
        type: userType,
        grade: userType === 'student' ? formData.grade : null,
        avatar: userType === 'student' ? '🦄' : '👨‍👩‍👧'
      };
      localStorage.setItem('user', JSON.stringify(newUser));

      // Chuyển hướng dựa vào loại user
      setTimeout(() => {
        if (userType === 'student') {
          navigate('/'); // Về trang chủ để chọn lớp
        } else {
          navigate('/dashboard'); // Phụ huynh vào dashboard
        }
      }, 1000);

    } catch (error) {
      toast.error('Đăng ký thất bại! Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // Step indicator component
  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <motion.div
            animate={{
              scale: currentStep === step ? 1.2 : 1,
              backgroundColor: currentStep >= step ? '#10b981' : '#e5e7eb'
            }}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center
              font-bold text-white transition-all duration-300
              ${currentStep >= step ? 'shadow-lg' : ''}
            `}
          >
            {currentStep > step ? <FaCheck /> : step}
          </motion.div>
          
          {step < 3 && (
            <motion.div
              animate={{
                backgroundColor: currentStep > step ? '#10b981' : '#e5e7eb'
              }}
              className="w-16 h-1 mx-2"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // Render form content based on step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Thông tin cơ bản 📝
            </h2>

            {/* User type selector */}
            <div className="bg-gray-100 p-1 rounded-2xl flex mb-6">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`
                  flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300
                  flex items-center justify-center gap-2
                  ${userType === 'student'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <FaChild className="text-xl" />
                <span>Học sinh</span>
              </button>
              
              <button
                type="button"
                onClick={() => setUserType('parent')}
                className={`
                  flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300
                  flex items-center justify-center gap-2
                  ${userType === 'parent'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <FaGraduationCap className="text-xl" />
                <span>Phụ huynh/GV</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Tên đăng nhập"
                  className={`
                    w-full px-5 py-3 border-2 rounded-xl
                    ${errors.username ? 'border-red-400' : 'border-gray-200'}
                    focus:outline-none focus:border-purple-400
                  `}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={`
                    w-full px-5 py-3 border-2 rounded-xl
                    ${errors.email ? 'border-red-400' : 'border-gray-200'}
                    focus:outline-none focus:border-purple-400
                  `}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {userType === 'parent' && (
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                    className={`
                      w-full px-5 py-3 border-2 rounded-xl
                      ${errors.phone ? 'border-red-400' : 'border-gray-200'}
                      focus:outline-none focus:border-purple-400
                    `}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              Tạo mật khẩu 🔐
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                  className={`
                    w-full px-5 py-3 pr-12 border-2 rounded-xl
                    ${errors.password ? 'border-red-400' : 'border-gray-200'}
                    focus:outline-none focus:border-blue-400
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Xác nhận mật khẩu"
                  className={`
                    w-full px-5 py-3 pr-12 border-2 rounded-xl
                    ${errors.confirmPassword ? 'border-red-400' : 'border-gray-200'}
                    focus:outline-none focus:border-blue-400
                  `}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Password strength indicator */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Độ mạnh mật khẩu</span>
                  <span className="text-sm font-medium text-blue-600">
                    {formData.password.length >= 8 ? 'Mạnh' : 
                     formData.password.length >= 6 ? 'Trung bình' : 'Yếu'}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    animate={{
                      width: formData.password.length >= 8 ? '100%' : 
                             formData.password.length >= 6 ? '60%' : 
                             formData.password.length > 0 ? '30%' : '0%',
                      backgroundColor: formData.password.length >= 8 ? '#10b981' : 
                                     formData.password.length >= 6 ? '#f59e0b' : '#ef4444'
                    }}
                    className="h-full transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2 className="text-2xl font-bold text-center mb-6">
              {userType === 'student' ? 'Thông tin học sinh 🎒' : 'Thông tin con em 👶'}
            </h2>

            <div className="space-y-4">
              {userType === 'student' ? (
                <>
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Họ và tên"
                      className={`
                        w-full px-5 py-3 border-2 rounded-xl
                        ${errors.fullName ? 'border-red-400' : 'border-gray-200'}
                        focus:outline-none focus:border-green-400
                      `}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Tuổi"
                        min="5"
                        max="15"
                        className={`
                          w-full px-5 py-3 border-2 rounded-xl
                          ${errors.age ? 'border-red-400' : 'border-gray-200'}
                          focus:outline-none focus:border-green-400
                        `}
                      />
                      {errors.age && (
                        <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                      )}
                    </div>

                    <div>
                      <select
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        className={`
                          w-full px-5 py-3 border-2 rounded-xl
                          ${errors.grade ? 'border-red-400' : 'border-gray-200'}
                          focus:outline-none focus:border-green-400
                        `}
                      >
                        <option value="">Chọn lớp</option>
                        {[1, 2, 3, 4, 5].map(grade => (
                          <option key={grade} value={grade}>Lớp {grade}</option>
                        ))}
                      </select>
                      {errors.grade && (
                        <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      name="parentEmail"
                      value={formData.parentEmail}
                      onChange={handleChange}
                      placeholder="Email phụ huynh"
                      className={`
                        w-full px-5 py-3 border-2 rounded-xl
                        ${errors.parentEmail ? 'border-red-400' : 'border-gray-200'}
                        focus:outline-none focus:border-green-400
                      `}
                    />
                    {errors.parentEmail && (
                      <p className="text-red-500 text-sm mt-1">{errors.parentEmail}</p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <input
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleChange}
                      placeholder="Tên con"
                      className={`
                        w-full px-5 py-3 border-2 rounded-xl
                        ${errors.childName ? 'border-red-400' : 'border-gray-200'}
                        focus:outline-none focus:border-green-400
                      `}
                    />
                    {errors.childName && (
                      <p className="text-red-500 text-sm mt-1">{errors.childName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        placeholder="Tuổi con"
                        min="5"
                        max="15"
                        className={`
                          w-full px-5 py-3 border-2 rounded-xl
                          ${errors.childAge ? 'border-red-400' : 'border-gray-200'}
                          focus:outline-none focus:border-green-400
                        `}
                      />
                      {errors.childAge && (
                        <p className="text-red-500 text-sm mt-1">{errors.childAge}</p>
                      )}
                    </div>

                    <div>
                      <select
                        name="childGrade"
                        value={formData.childGrade}
                        onChange={handleChange}
                        className={`
                          w-full px-5 py-3 border-2 rounded-xl
                          ${errors.childGrade ? 'border-red-400' : 'border-gray-200'}
                          focus:outline-none focus:border-green-400
                        `}
                      >
                        <option value="">Lớp của con</option>
                        {[1, 2, 3, 4, 5].map(grade => (
                          <option key={grade} value={grade}>Lớp {grade}</option>
                        ))}
                      </select>
                      {errors.childGrade && (
                        <p className="text-red-500 text-sm mt-1">{errors.childGrade}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${currentColor.gradient}`}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Floating decorations */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 360]
        }}
        transition={{ 
          y: { duration: 4, repeat: Infinity },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className={`absolute top-20 right-20 w-32 h-32 ${currentColor.blob} rounded-full blur-3xl opacity-30`}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg"
        >
          {/* Logo */}
          <motion.div 
            className="text-center mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <img
              src={images.logo}
              alt="Math Kids"
              className="h-20 mx-auto"
            />
          </motion.div>

          {/* Form container */}
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
            <StepIndicator />

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex gap-4 mt-8">
                {currentStep > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handlePrevious}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <FaArrowLeft />
                    <span>Quay lại</span>
                  </motion.button>
                )}

                {currentStep < totalSteps ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleNext}
                    className={`
                      flex-1 py-3 px-4 rounded-xl font-medium text-white
                      ${currentColor.button} hover:shadow-lg transition-all
                      flex items-center justify-center gap-2
                    `}
                  >
                    <span>Tiếp theo</span>
                    <FaArrowRight />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className={`
                      flex-1 py-3 px-4 rounded-xl font-medium text-white
                      ${currentColor.button} hover:shadow-lg transition-all
                      flex items-center justify-center gap-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Đang xử lý...</span>
                      </>
                    ) : (
                      <>
                        <span>Hoàn thành</span>
                        <FaCheck />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </form>

            {/* Login link */}
            <div className="text-center mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600">
                Đã có tài khoản?{' '}
                <Link
                  to="/login"
                  className="text-purple-600 hover:text-purple-700 font-bold"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;