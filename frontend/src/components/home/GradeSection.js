//Preview các lớp học như hành tinh
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const GradeSection = () => {
  const navigate = useNavigate();

  const grades = [
    { 
      id: 1, 
      name: 'Lớp 1', 
      planet: '🪐',
      color: 'from-pink-500 to-purple-600',
      topics: 'Số đếm, Phép cộng cơ bản'
    },
    { 
      id: 2, 
      name: 'Lớp 2', 
      planet: '🌟',
      color: 'from-blue-500 to-cyan-600',
      topics: 'Phép trừ, Bảng cửu chương'
    },
    { 
      id: 3, 
      name: 'Lớp 3', 
      planet: '🌎',
      color: 'from-green-500 to-teal-600',
      topics: 'Nhân chia, Phân số'
    },
    { 
      id: 4, 
      name: 'Lớp 4', 
      planet: '🌕',
      color: 'from-orange-500 to-red-600',
      topics: 'Hình học, Đo lường'
    },
    { 
      id: 5, 
      name: 'Lớp 5', 
      planet: '🌠',
      color: 'from-purple-500 to-indigo-600',
      topics: 'Tỉ số, Phần trăm'
    },
  ];

  return (
    <section className="py-20 px-4 relative">
      {/* Background decoration */}
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

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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