import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AccountTypeSelector = ({ onSelect, mode = 'login' }) => {
  const [hoveredType, setHoveredType] = useState(null);

  const accountTypes = [
    {
      id: 'student',
      name: 'Học sinh',
      planet: '🎒',
      gradient: 'from-pink-400 to-purple-600',
      atmosphereGradient: 'from-pink-300/20 to-purple-500/20',
      ringColor: 'pink',
      glowColor: 'rgba(236, 72, 153, 0.6)',
      description: mode === 'login' 
        ? 'Dành cho các em học sinh tiểu học'
        : 'Tạo tài khoản cho con em của bạn',
      moons: ['📚', '✏️'],
      clouds: true,
      ring: false
    },
    {
      id: 'teacher',
      name: 'Giáo viên',
      planet: '👩‍🏫',
      gradient: 'from-green-400 to-teal-600',
      atmosphereGradient: 'from-green-300/20 to-teal-500/20',
      ringColor: 'green',
      glowColor: 'rgba(34, 197, 94, 0.6)',
      description: 'Dành cho giáo viên tiểu học',
      moons: ['📊', '📝'],
      clouds: false,
      ring: true
    },
    {
      id: 'parent',
      name: 'Phụ huynh',
      planet: '👨‍👩‍👧‍👦',
      gradient: 'from-blue-400 to-cyan-600',
      atmosphereGradient: 'from-blue-300/20 to-cyan-500/20',
      ringColor: 'blue',
      glowColor: 'rgba(59, 130, 246, 0.6)',
      description: 'Dành cho phụ huynh học sinh',
      moons: ['📱', '📈'],
      clouds: true,
      ring: false
    }
  ];

  return (
    <div className="relative h-[500px] flex items-center justify-center px-8 overflow-hidden">
      {/* Galaxy background */}
      <div className="absolute inset-0">
        {/* Animated stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Nebula effects */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Title - Moved down */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-1">Chọn vai trò của bạn</h2>
        <p className="text-gray-300 text-sm">Mỗi hành tinh là một hành trình khác nhau</p>
      </motion.div>

      {/* Planets container */}
      <div className="flex items-center justify-center gap-20 relative z-10 mt-10">
        {accountTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
            className="relative flex flex-col items-center"
          >
            <motion.div
              className="cursor-pointer relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredType(type.id)}
              onHoverEnd={() => setHoveredType(null)}
              onClick={() => onSelect(type)}
            >
              {/* Planet atmosphere */}
              <motion.div
                className={`absolute inset-[-40px] bg-gradient-to-br ${type.atmosphereGradient} rounded-full blur-xl`}
                animate={hoveredType === type.id ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Main planet */}
              <motion.div
                className={`
                  relative w-48 h-48
                  bg-gradient-to-br ${type.gradient}
                  rounded-full shadow-2xl
                  flex items-center justify-center
                  overflow-hidden
                `}
                animate={hoveredType === type.id ? {
                  boxShadow: `0 0 80px ${type.glowColor}`,
                } : {
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 0.3 }
                }}
              >
                {/* Planet surface details */}
                <div className="absolute inset-0">
                  {/* Surface texture */}
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-5 w-16 h-16 bg-white/10 rounded-full blur-xl" />
                    <div className="absolute bottom-10 right-10 w-20 h-20 bg-black/10 rounded-full blur-xl" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                  </div>

                  {/* Clouds animation */}
                  {type.clouds && (
                    <>
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="absolute top-5 left-10 w-20 h-8 bg-white/20 rounded-full blur-md" />
                        <div className="absolute bottom-12 right-5 w-16 h-6 bg-white/15 rounded-full blur-md" />
                        <div className="absolute top-1/2 left-1/3 w-24 h-10 bg-white/10 rounded-full blur-lg" />
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Planet icon */}
                <motion.span 
                  className="text-7xl z-10 drop-shadow-2xl"
                  animate={hoveredType === type.id ? { 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {type.planet}
                </motion.span>

                {/* Shine effect */}
                <div className="absolute top-4 right-6 w-12 h-12 bg-white/30 rounded-full blur-xl" />
              </motion.div>

              {/* Saturn-like ring */}
              {type.ring && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={{ rotateX: 60, rotateZ: hoveredType === type.id ? 360 : 0 }}
                  transition={{ rotateZ: { duration: 10, repeat: Infinity, ease: "linear" } }}
                >
                  <div className={`
                    absolute w-80 h-80 border-8 border-${type.ringColor}-400/30 
                    rounded-full transform 
                  `} />
                  <div className={`
                    absolute w-72 h-72 border-4 border-${type.ringColor}-300/20 
                    rounded-full transform 
                  `} />
                </motion.div>
              )}

              {/* Orbiting moons */}
              {type.moons.map((moon, idx) => (
                <motion.div
                  key={idx}
                  className="absolute inset-0 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 15 + idx * 5, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: idx * 2
                  }}
                >
                  <motion.div
                    className="absolute text-2xl"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(${120 + idx * 20}px, 0) translate(-50%, -50%)`
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ 
                      duration: 15 + idx * 5, 
                      repeat: Infinity, 
                      ease: "linear",
                      delay: idx * 2
                    }}
                  >
                    {moon}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Planet name and description - Fixed position */}
            <motion.div 
              className="mt-10 text-center w-64"
              animate={hoveredType === type.id ? { scale: 1.05 } : {}}
            >
              <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-1">
                {type.name}
              </h3>
              <p className="text-sm text-gray-300">
                {type.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Bottom hint */}
      <motion.div
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-400 text-xs">
          Click vào hành tinh để chọn
        </p>
      </motion.div>
    </div>
  );
};

export default AccountTypeSelector;