import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ControlPanel = ({ icon, label, name, type = 'text', value, onChange, error, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  
  // Determine actual input type
  const inputType = isPasswordField && showPassword ? 'text' : type;

  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-blue-400 mb-2">
        {label}
      </label>
      
      <div className="relative">
        {/* LED Indicator */}
        <motion.div
          className={`
            absolute -left-4 top-1/2 transform -translate-y-1/2
            w-2 h-2 rounded-full
            ${value.length > 0 ? 'bg-green-400' : 'bg-red-400'}
          `}
          animate={value.length > 0 ? {
            boxShadow: [
              '0 0 0 0 rgba(74, 222, 128, 0.7)',
              '0 0 0 10px rgba(74, 222, 128, 0)',
              '0 0 0 0 rgba(74, 222, 128, 0)'
            ]
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Input Container */}
        <div className={`
          relative bg-gray-800 rounded-xl overflow-hidden
          border-2 transition-all duration-300
          ${isFocused ? 'border-blue-500 shadow-lg shadow-blue-500/20' : 'border-gray-700'}
          ${error ? 'border-red-500' : ''}
        `}>
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
          
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none"
          />

          {/* Password toggle button */}
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          )}

          {/* Power Level Indicator */}
          {!isPasswordField && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`
                      w-1 h-3 rounded-full transition-all duration-300
                      ${i < Math.ceil(value.length / 2) 
                        ? 'bg-green-400' 
                        : 'bg-gray-600'
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-sm mt-2 flex items-center gap-1"
          >
            <span>⚠️</span> {error}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;