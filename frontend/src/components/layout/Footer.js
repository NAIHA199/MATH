// Footer đầy đủ thông tin
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFacebook, 
  FaYoutube, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌌</span>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Math Galaxy
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Nền tảng học toán trực tuyến hàng đầu cho học sinh tiểu học với phương pháp giảng dạy hiện đại.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Khám phá</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">Về chúng tôi</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-white transition-colors">Khóa học</Link></li>
              <li><Link to="/games" className="text-gray-400 hover:text-white transition-colors">Trò chơi</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-white">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Trung tâm trợ giúp</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Liên hệ</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Chính sách bảo mật</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Điều khoản sử dụng</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-white">Liên hệ</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt /> <span className="text-sm">123 Nguyễn Văn Cừ, Q.5, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone /> <span className="text-sm">0909 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope /> <span className="text-sm">info@mathgalaxy.vn</span>
              </li>
            </ul>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebook />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaYoutube />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Math Galaxy. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;