import React from 'react';
import { motion } from 'framer-motion';

const SpaceBackground = ({ simplified = false }) => {
  if (simplified) {
    // Phiên bản đơn giản cho performance
    return (
      <div className="fixed inset-0 z-0">
        {/* Static gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/20 to-black" />
        
        {/* Simple static stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-70"
              style={{
                width: Math.random() * 2 + 'px',
                height: Math.random() * 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
            />
          ))}
        </div>

        {/* Simple nebula effect */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    );
  }

  // Original version với canvas (nếu cần)
  return (
    <div className="fixed inset-0 z-0">
      {/* ... original canvas code ... */}
    </div>
  );
};

export default SpaceBackground;