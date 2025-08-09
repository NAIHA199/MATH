import React from 'react';
import { motion } from 'framer-motion';

const AstronautMascot = ({ emotion, message }) => {
  const emotions = {
    happy: '😊',
    excited: '🤩',
    thinking: '🤔',
    success: '🎉',
    error: '😰'
  };

  return (
    <motion.div
      className="absolute -top-20 right-10"
      animate={{
        y: [0, -20, 0],
        rotate: [-5, 5, -5]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="relative">
        {/* Astronaut */}
        <div className="text-6xl">👨‍🚀</div>
        
        {/* Emotion bubble */}
        <motion.div
          className="absolute -top-4 -right-4 text-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {emotions[emotion]}
        </motion.div>
        
        {/* Message bubble */}
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-full mt-2 right-0 bg-white rounded-2xl p-3 shadow-lg"
            style={{ minWidth: '200px' }}
          >
            <div className="text-sm font-medium text-gray-800">{message}</div>
            <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AstronautMascot;