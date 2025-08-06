import React, { useEffect, useState } from 'react';

const ParticlesBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Tạo particles ngẫu nhiên
    const createParticles = () => {
      const newParticles = [];
      const shapes = ['⭐', '✨', '🌟', '💫', '🌈', '🎈', '🎯', '🎨'];
      
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          left: Math.random() * 100,
          animationDelay: Math.random() * 15,
          size: Math.random() * 20 + 10,
        });
      }
      
      setParticles(newParticles);
    };

    createParticles();
  }, []);

  return (
    <div className="particles">
      {particles.map(particle => (
        <span
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            fontSize: `${particle.size}px`,
          }}
        >
          {particle.shape}
        </span>
      ))}
    </div>
  );
};

export default ParticlesBackground;