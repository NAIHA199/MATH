import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaRocket, FaArrowLeft, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ControlPanel from './ControlPanel';
import FuelGauge from './FuelGauge';

const SpaceshipForm = ({ accountType, onSubmit, onBack, isLoading, formType = 'login' }) => {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '',
    email: '',
    phone: '',
    fullName: ''
  });
  const [errors, setErrors] = useState({});
  const [fuel, setFuel] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);

  if (!accountType) {
    return (
      <div className="text-white text-center p-8">
        <p>Loading...</p>
      </div>
    );
  }

  // Calculate fuel based on form completion
  const calculateFuel = (data) => {
    let fuelLevel = 0;
    
    if (formType === 'login') {
      if (data.username.length >= 3) fuelLevel += 50;
      if (data.password.length >= 6) fuelLevel += 50;
    } else {
      if (data.fullName.length >= 2) fuelLevel += 20;
      if (data.username.length >= 3) fuelLevel += 20;
      if (data.email.includes('@')) fuelLevel += 20;
      if (data.phone.length >= 10) fuelLevel += 20;
      if (data.password.length >= 6) fuelLevel += 20;
    }
    
    return fuelLevel;
  };

  // Update form data and fuel
  const updateField = (name, value) => {
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    setFuel(calculateFuel(newData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (formType === 'register' && !formData.fullName) {
      newErrors.fullName = 'Vui lòng nhập họ tên!';
    }
    if (!formData.username) newErrors.username = 'Cần tên đăng nhập!';
    if (!formData.password) newErrors.password = 'Cần mật khẩu!';
    if (formType === 'register') {
      if (!formData.email) newErrors.email = 'Cần email!';
      if (accountType.id === 'parent' && !formData.phone) {
        newErrors.phone = 'Phụ huynh cần nhập số điện thoại!';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ ...formData, rememberMe });
  };

  // Get theme based on account type
  const getTheme = () => {
    switch(accountType.id) {
      case 'student':
        return 'from-pink-500 to-purple-600';
      case 'teacher':
        return 'from-green-500 to-teal-600';
      case 'parent':
        return 'from-blue-500 to-cyan-600';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  return (
    <motion.div 
      className="relative max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <motion.div 
          className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-[100px] rounded-b-3xl shadow-2xl border-4 border-gray-700 overflow-hidden"
          animate={{
            boxShadow: [
              '0 20px 50px rgba(0,0,0,0.5)',
              '0 20px 80px rgba(168,85,247,0.3)',
              '0 20px 50px rgba(0,0,0,0.5)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Cockpit Window */}
          <div className={`bg-gradient-to-r ${getTheme()} p-8`}>
            <h2 className="text-center text-3xl font-bold text-white mb-2">
              🚀 {formType === 'login' ? 'Đăng nhập' : 'Đăng ký'} - {accountType.name}
            </h2>
            <p className="text-center text-white/80">
              {formType === 'login' 
                ? 'Nhập thông tin để khởi động tàu vũ trụ'
                : 'Điền thông tin để tạo tài khoản mới'
              }
            </p>
          </div>

          {/* Control Panel */}
          <div className="bg-gray-900 p-8">
            <form onSubmit={handleSubmit}>
              {/* Register-only fields */}
              {formType === 'register' && (
                <>
                  <ControlPanel
                    icon={<FaUser />}
                    label="Họ và tên"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    error={errors.fullName}
                    placeholder={
                      accountType.id === 'student' ? 'Tên của em' :
                      accountType.id === 'teacher' ? 'Họ tên giáo viên' :
                      'Họ tên phụ huynh'
                    }
                  />

                  <ControlPanel
                    icon={<FaEnvelope />}
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    error={errors.email}
                    placeholder="email@example.com"
                  />

                  {accountType.id === 'parent' && (
                    <ControlPanel
                      icon={<FaPhone />}
                      label="Số điện thoại"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      error={errors.phone}
                      placeholder="0909123456"
                    />
                  )}
                </>
              )}

              {/* Common fields */}
              <ControlPanel
                icon={<FaUser />}
                label="Tên đăng nhập"
                name="username"
                value={formData.username}
                onChange={(e) => updateField('username', e.target.value)}
                error={errors.username}
                placeholder={
                  accountType.id === 'student' ? 'Tên đăng nhập của em' :
                  accountType.id === 'teacher' ? 'Tên đăng nhập giáo viên' :
                  'Tên đăng nhập phụ huynh'
                }
              />

              <ControlPanel
                icon={<FaLock />}
                label="Mật khẩu"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
                error={errors.password}
                placeholder="Nhập mật khẩu"
              />

              {/* Remember me checkbox - Only for login */}
              {formType === 'login' && (
                <div className="mb-6 flex items-center">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-5 h-5 rounded border-2 border-gray-600 bg-gray-800 
                        checked:bg-blue-500 checked:border-blue-500 
                        focus:ring-2 focus:ring-blue-500/50
                        transition-colors cursor-pointer"
                    />
                    <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">
                      Ghi nhớ đăng nhập
                    </span>
                  </label>
                  
                  <Link 
                    to="/forgot-password" 
                    className="ml-auto text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              )}

              {/* Fuel Gauge */}
              <FuelGauge level={fuel} />

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <motion.button
                  type="button"
                  onClick={onBack}
                  className="flex-1 py-4 bg-gray-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaArrowLeft /> Quay lại
                </motion.button>

                <motion.button
                  type="submit"
                  disabled={fuel < 100 || isLoading}
                  className={`
                    flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2
                    transition-all duration-300
                    ${fuel === 100 
                      ? `bg-gradient-to-r ${getTheme()} text-white hover:shadow-lg hover:shadow-purple-500/50` 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }
                  `}
                  whileHover={fuel === 100 ? { scale: 1.02 } : {}}
                  whileTap={fuel === 100 ? { scale: 0.98 } : {}}
                >
                  <FaRocket className={fuel === 100 ? 'animate-bounce' : ''} />
                  {isLoading 
                    ? 'Đang xử lý...' 
                    : formType === 'login' ? 'Đăng nhập!' : 'Đăng ký!'
                  }
                </motion.button>
              </div>
            </form>

            {/* Login/Register switch */}
            <div className="mt-6 text-center text-gray-400">
              {formType === 'login' ? (
                <p>
                  Chưa có tài khoản?{' '}
                  <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold">
                    Đăng ký ngay
                  </Link>
                </p>
              ) : (
                <p>
                  Đã có tài khoản?{' '}
                  <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold">
                    Đăng nhập
                  </Link>
                </p>
              )}
            </div>
          </div>

          {/* Engine Flames when ready */}
          {fuel === 100 && (
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-8 h-16 bg-gradient-to-t from-orange-500 via-yellow-500 to-transparent rounded-b-full"
                    animate={{
                      height: [16, 24, 16],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 0.3,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SpaceshipForm;