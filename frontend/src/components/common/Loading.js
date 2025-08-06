import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ message = "Đang tải..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-purple-200 border-t-purple-500 rounded-full"
      />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-lg font-medium text-gray-600"
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Loading;