import React from 'react';
import { motion } from 'framer-motion';

const StarRating = ({ stars }) => {
  return (
    <motion.div 
      className="fixed top-4 left-4 z-20"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
        <div className="flex items-center gap-2">
          <span className="text-white text-sm font-medium">Điểm của bạn:</span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <motion.span
                key={index}
                className="text-2xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: index < stars ? 1 : 0.3,
                  scale: 1 
                }}
                transition={{ delay: index * 0.1 }}
              >
                {index < stars ? '⭐' : '☆'}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StarRating;