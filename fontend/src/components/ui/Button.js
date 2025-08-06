import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  icon,
  className = '',
  ...props 
}) => {
  // Variants cho button
  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700',
    secondary: 'bg-gradient-to-r from-secondary-400 to-secondary-500 text-white hover:from-secondary-500 hover:to-secondary-600',
    success: 'bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
  };

  // Sizes cho button
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        font-medium rounded-2xl
        shadow-lg hover:shadow-xl
        transition-all duration-300
        flex items-center justify-center gap-2
        relative overflow-hidden
        btn-hover
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;