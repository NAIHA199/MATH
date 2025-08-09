import React from 'react';
import { motion } from 'framer-motion';

const FuelGauge = ({ level }) => {
  return (
    <div className="mt-8 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold text-gray-400">NHIÊN LIỆU</span>
        <span className="text-sm font-bold text-blue-400">{level}%</span>
      </div>
      
      <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700">
        <motion.div
          className={`
            absolute inset-y-0 left-0 
            ${level === 100 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-orange-400 to-red-500'}
          `}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        
        {/* Animated stripes */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="h-full w-[200%] bg-stripes"
            animate={{ x: [0, 40] }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)'
            }}
          />
        </div>
      </div>
      
      <p className="text-center text-xs text-gray-500 mt-2">
        {level < 100 ? '⚡ Điền đầy đủ thông tin để nạp nhiên liệu' : '✅ Sẵn sàng phóng!'}
      </p>
    </div>
  );
};

export default FuelGauge;