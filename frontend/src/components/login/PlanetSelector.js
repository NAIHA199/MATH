import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PlanetSelector = ({ onSelect }) => {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  const planets = [
    {
      id: 'student',
      type: 'student',
      name: 'Hành tinh Học sinh',
      gradient: 'from-pink-400 to-purple-600',
      ring: 'border-pink-300',
      emoji: '🎒',
      description: 'Dành cho các em học sinh tiểu học',
      position: { x: -300, y: 0 },
      size: 150,
      moons: ['📚', '✏️', '🎨']
    },
    {
      id: 'parent',
      type: 'parent',
      name: 'Trạm vũ trụ Phụ huynh',
      gradient: 'from-blue-400 to-teal-600',
      ring: 'border-blue-300',
      emoji: '👨‍👩‍👧‍👦',
      description: 'Dành cho phụ huynh và giáo viên',
      position: { x: 300, y: 0 },
      size: 150,
      moons: ['📊', '📈', '🏆']
    }
  ];

  return (
    <div className="relative h-[500px] flex items-center justify-center">
      {/* Central sun */}
      <motion.div
        className="absolute w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 30px rgba(251, 191, 36, 0.5)',
            '0 0 60px rgba(251, 191, 36, 0.8)',
            '0 0 30px rgba(251, 191, 36, 0.5)'
          ]
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Planets */}
      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          className="absolute cursor-pointer"
          style={{
            left: `calc(50% + ${planet.position.x}px)`,
            top: `calc(50% + ${planet.position.y}px)`,
            transform: 'translate(-50%, -50%)'
          }}
          whileHover={{ scale: 1.1 }}
          onHoverStart={() => setHoveredPlanet(planet.id)}
          onHoverEnd={() => setHoveredPlanet(null)}
          onClick={() => onSelect(planet)}
        >
          {/* Planet */}
          <motion.div
            className={`
              relative w-${planet.size} h-${planet.size}
              bg-gradient-to-br ${planet.gradient}
              rounded-full shadow-2xl
              flex items-center justify-center
              border-4 ${planet.ring} border-opacity-30
            `}
            style={{ width: planet.size, height: planet.size }}
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 100,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <span className="text-6xl">{planet.emoji}</span>
            
            {/* Planetary ring */}
            <div className={`
              absolute inset-[-20px] 
              border-2 ${planet.ring} border-opacity-20
              rounded-full
              animate-pulse
            `} />

            {/* Moons */}
            {planet.moons.map((moon, index) => (
              <motion.div
                key={index}
                className="absolute text-2xl"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  x: Math.cos((index * 120 + 360) * Math.PI / 180) * 80,
                  y: Math.sin((index * 120 + 360) * Math.PI / 180) * 80,
                  rotate: -360
                }}
                transition={{
                  duration: 10 + index * 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                {moon}
              </motion.div>
            ))}
          </motion.div>

          {/* Planet info */}
          {hoveredPlanet === planet.id && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 w-64"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                <h3 className="font-bold text-lg text-gray-800">{planet.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{planet.description}</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Orbit paths */}
      <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
        <circle
          cx="50%"
          cy="50%"
          r="300"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="5,5"
        />
      </svg>
    </div>
  );
};

export default PlanetSelector;