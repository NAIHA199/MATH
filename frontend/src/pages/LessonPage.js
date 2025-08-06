import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { mockLessons } from '../utils/mockData';

const LessonPage = () => {
  const { grade } = useParams();
  const navigate = useNavigate();
  
  // States
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Load lessons khi component mount
  useEffect(() => {
    // Giả lập load từ API
    const gradeLessons = mockLessons[grade] || [];
    setLessons(gradeLessons);
    if (gradeLessons.length > 0) {
      setSelectedLesson(gradeLessons[0]);
    }
  }, [grade]);

  // Dữ liệu mẫu cho các section của bài học
  const lessonSections = [
    {
      id: 1,
      type: 'video',
      title: 'Video giới thiệu',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Thay bằng video thật
      duration: '5:30'
    },
    {
      id: 2,
      type: 'content',
      title: 'Lý thuyết',
      content: `
        <h3>Phép cộng là gì?</h3>
        <p>Phép cộng là cách chúng ta gộp các số lại với nhau để có tổng lớn hơn.</p>
        <div class="example">
          <p><strong>Ví dụ:</strong> 2 + 3 = 5</p>
          <p>Có nghĩa là: 2 quả táo + 3 quả táo = 5 quả táo</p>
        </div>
      `,
      image: 'https://via.placeholder.com/400x200/3b82f6/ffffff?text=2+%2B+3+=+5'
    },
    {
      id: 3,
      type: 'interactive',
      title: 'Thực hành tương tác',
      question: 'Kéo số đúng vào ô trống: 4 + __ = 7',
      answer: 3,
      options: [1, 2, 3, 4, 5]
    },
    {
      id: 4,
      type: 'quiz',
      title: 'Kiểm tra nhanh',
      questions: [
        { q: '2 + 2 = ?', options: [3, 4, 5, 6], correct: 1 },
        { q: '5 + 3 = ?', options: [6, 7, 8, 9], correct: 2 },
        { q: '1 + 6 = ?', options: [5, 6, 7, 8], correct: 2 }
      ]
    }
  ];

  // Xử lý chuyển section
  const handleNextSection = () => {
    if (currentSection < lessonSections.length - 1) {
      // Đánh dấu section hiện tại là hoàn thành
      if (!completedSections.includes(currentSection)) {
        setCompletedSections([...completedSections, currentSection]);
      }
      setCurrentSection(currentSection + 1);
    } else {
      // Hoàn thành bài học
      toast.success('Chúc mừng! Bạn đã hoàn thành bài học! 🎉');
      navigate(`/exercise/${selectedLesson?.id}`);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  // Component hiển thị Video
  const VideoSection = ({ section }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
      <div className="relative bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={section.videoUrl}
          title={section.title}
          frameBorder="0"
          allowFullScreen
        />
      </div>
      <p className="text-sm text-gray-600 mt-4">Thời lượng: {section.duration}</p>
    </div>
  );

  // Component hiển thị Content
  const ContentSection = ({ section }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: section.content }}
      />
      {section.image && (
        <img 
          src={section.image} 
          alt="Minh họa" 
          className="mt-6 rounded-lg shadow-md mx-auto"
        />
      )}
    </div>
  );

  // Component Interactive (Drag & Drop đơn giản)
  const InteractiveSection = ({ section }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleSelectAnswer = (value) => {
      setSelectedAnswer(value);
      const correct = value === section.answer;
      setIsCorrect(correct);
      
      if (correct) {
        toast.success('Đúng rồi! 🎉');
      } else {
        toast.error('Thử lại nhé! 💪');
      }
    };

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
        <p className="text-xl mb-6">{section.question}</p>
        
        <div className="flex justify-center gap-4 flex-wrap">
          {section.options.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectAnswer(option)}
              className={`
                w-16 h-16 rounded-lg font-bold text-xl
                ${selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                }
              `}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  // Component Quiz
  const QuizSection = ({ section }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const handleAnswer = (answerIndex) => {
      if (answerIndex === section.questions[currentQuestion].correct) {
        setScore(score + 1);
        toast.success('Đúng rồi!');
      } else {
        toast.error('Sai rồi!');
      }

      if (currentQuestion < section.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    };

    if (showResult) {
      return (
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Kết quả</h3>
          <p className="text-4xl font-bold text-purple-600 mb-4">
            {score}/{section.questions.length}
          </p>
          <p className="text-gray-600">
            {score === section.questions.length 
              ? 'Xuất sắc! 🌟' 
              : score >= section.questions.length/2 
              ? 'Tốt lắm! 👍' 
              : 'Cố gắng lên! 💪'}
          </p>
        </div>
      );
    }

    const question = section.questions[currentQuestion];
    
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          Câu {currentQuestion + 1}/{section.questions.length}
        </p>
        <p className="text-xl mb-6">{question.q}</p>
        
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(index)}
              className="p-4 bg-purple-100 hover:bg-purple-200 rounded-lg font-medium"
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  // Render section hiện tại
  const renderSection = () => {
    const section = lessonSections[currentSection];
    
    switch (section.type) {
      case 'video':
        return <VideoSection section={section} />;
      case 'content':
        return <ContentSection section={section} />;
      case 'interactive':
        return <InteractiveSection section={section} />;
      case 'quiz':
        return <QuizSection section={section} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <FaArrowLeft className="mr-2" />
              Quay lại
            </button>
            
            <h1 className="text-2xl font-bold">
              {selectedLesson?.title || 'Bài học'}
            </h1>
            
            <div className="text-sm text-gray-600">
              Lớp {grade}
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2">
            {lessonSections.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full transition-all ${
                  index < currentSection
                    ? 'bg-green-500'
                    : index === currentSection
                    ? 'bg-purple-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Main content */}
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevSection}
            disabled={currentSection === 0}
            className={`
              flex items-center px-6 py-3 rounded-lg font-medium
              ${currentSection === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
              }
            `}
          >
            <FaArrowLeft className="mr-2" />
            Trước
          </button>

          <button
            onClick={handleNextSection}
            className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 shadow-lg"
          >
            {currentSection === lessonSections.length - 1 ? 'Hoàn thành' : 'Tiếp theo'}
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;