import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { motion } from 'framer-motion';

const ProgressRing = ({ value, text, color = '#8b5cf6' }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="w-32 h-32"
    >
      <CircularProgressbar
        value={value}
        text={text || `${value}%`}
        styles={buildStyles({
          textSize: '24px',
          pathTransitionDuration: 1,
          pathColor: color,
          textColor: color,
          trailColor: '#e5e7eb',
        })}
      />
    </motion.div>
  );
};

export default ProgressRing;