//Giới thiệu 6 tính năng chính
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaGamepad, 
  FaTrophy, 
  FaChartLine,
  FaUsers,
  FaPuzzlePiece
} from 'react-icons/fa';

const FeatureCards = () => {
  const features = [
    {
      icon: <FaGraduationCap size={40} />,
      title: 'Bài học tương tác',
      description: 'Video động, hình ảnh 3D và hoạt động thực hành giúp học sinh hiểu sâu kiến thức',
      color: 'from-purple-500 to-purple-700',
    },
    {
      icon: <FaGamepad size={40} />,
      title: 'Trò chơi toán học',
      description: 'Học qua chơi với hàng chục mini-games được thiết kế riêng cho từng chủ đề',
      color: 'from-pink-500 to-pink-700',
    },
    {
      icon: <FaTrophy size={40} />,
      title: 'Hệ thống phần thưởng',
      description: 'Thu thập sao, huy hiệu và mở khóa nhân vật khi hoàn thành bài học',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: <FaChartLine size={40} />,
      title: 'Theo dõi tiến độ',
      description: 'Báo cáo chi tiết giúp phụ huynh nắm rõ quá trình học tập của con',
      color: 'from-green-500 to-green-700',
    },
    {
      icon: <FaUsers size={40} />,
      title: 'Học tập cộng đồng',
      description: 'Thi đua với bạn bè, tham gia thử thách và sự kiện đặc biệt',
      color: 'from-orange-500 to-orange-700',
    },
    {
      icon: <FaPuzzlePiece size={40} />,
      title: 'Nội dung phù hợp',
      description: 'Bài học được thiết kế theo chuẩn của Bộ Giáo dục cho từng khối lớp',
      color: 'from-indigo-500 to-indigo-700',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tính năng nổi bật
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Mọi thứ bạn cần để con yêu học toán hiệu quả
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
                style={{
                  backgroundImage: `linear-gradient(to right, ${feature.color})`,
                }}
              />
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 hover:border-purple-500/50 transition-colors">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;