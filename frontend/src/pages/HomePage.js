import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import components
import PublicNavbar from '../components/layout/PublicNavbar';
import SpaceHero from '../components/home/SpaceHero';
import FeatureCards from '../components/home/FeatureCards';
import GradeSection from '../components/home/GradeSection';
import Footer from '../components/layout/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Simplified Space Background */}
      <div className="fixed inset-0 z-0">
        {/* Static stars - No animation */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: '2px',         // Đặt kích thước cố định
                height: '2px',        // Đặt kích thước cố định
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>

        {/* Simple gradient nebula - No animation */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Public Navbar */}
        <PublicNavbar />

        {/* Hero Section */}
        <SpaceHero />

        {/* Features Section */}
        <FeatureCards />

        {/* Grade Selection Preview */}
        <GradeSection />

        {/* Call to Action */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30"
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Sẵn sàng khám phá Vũ trụ Toán học?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Tham gia cùng hàng ngàn học sinh đang học toán vui vẻ mỗi ngày!
              </p>
              <motion.button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Bắt đầu miễn phí 🚀
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;