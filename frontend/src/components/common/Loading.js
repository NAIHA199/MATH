// src/components/common/Loading.js
import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div className="text-center">
        <motion.div
          className="text-6xl mb-4"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity }
          }}
        >
          🚀
        </motion.div>
        <h2 className="text-xl font-semibold text-white">Đang tải...</h2>
      </motion.div>
    </div>
  );
};

export default Loading;