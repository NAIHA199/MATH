import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const grades = [
  { 
    id: 1, 
    name: 'Lớp 1', 
    planet: '🪐',
    color: 'from-pink-500 to-purple-600',
    
    details: ['Số đếm', 'Phép cộng', 'Phép trừ', 'So sánh số', 'Giải toán đơn giản']
  },
  { 
    id: 2, 
    name: 'Lớp 2', 
    planet: '🌟',
    color: 'from-blue-500 to-cyan-600',
    
    details: ['Phép trừ', 'Bảng cửu chương', 'Nhân chia cơ bản', 'Giải toán có lời văn']
  },
  { 
    id: 3, 
    name: 'Lớp 3', 
    planet: '🌎',
    color: 'from-green-500 to-teal-600',
    
    details: ['Nhân chia', 'Phân số', 'Đại lượng', 'Giải toán nâng cao']
  },
  { 
    id: 4, 
    name: 'Lớp 4', 
    planet: '🌕',
    color: 'from-orange-500 to-red-600',
    
    details: ['Hình học', 'Đo lường', 'Tính chu vi, diện tích', 'Giải toán thực tế']
  },
  { 
    id: 5, 
    name: 'Lớp 5', 
    planet: '🌠',
    color: 'from-purple-500 to-indigo-600',
    
    details: ['Tỉ số', 'Phần trăm', 'Số thập phân', 'Giải toán tổng hợp']
  },
];

const GradeSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Chọn hành tinh học tập
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Mỗi lớp là một hành tinh với những thử thách riêng
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {grades.map((grade, index) => (
            <motion.div
              key={grade.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate('/register')}
              className="cursor-pointer"
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Planet card */}
                <div className={`
                  relative overflow-hidden rounded-3xl p-6
                  bg-gradient-to-b ${grade.color}
                  transform transition-all duration-300
                  group-hover:shadow-2xl group-hover:shadow-purple-500/30
                  w-[220px] h-[240px] flex flex-col justify-center items-center mx-auto
                  group
                `}>
                  {/* Animated planet */}
                  <motion.div
                    className="text-6xl mb-4 text-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    {grade.planet}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-white text-center mb-2">
                    {grade.name}
                  </h3>
                  
                  <p className="text-sm text-white/80 text-center">
                    {grade.topics}
                  </p>

                  {/* Thông tin chi tiết khi hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl p-4">
                    <div>
                      <h4 className="font-bold mb-2">Nội dung học:</h4>
                      <ul className="text-sm space-y-1">
                        {grade.details.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Orbital ring */}
                <div className="absolute inset-0 rounded-3xl border-2 border-white/20 scale-110 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-gray-400"
        >
          🔒 Đăng ký để mở khóa tất cả nội dung học tập
        </motion.p>
      </div>
    </section>
  );
};

export default GradeSection;