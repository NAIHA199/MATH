import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCheck, 
  FaTimes, 
  FaRedo,
  FaHome
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const ExercisePage = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  
  // States
  const [currentExercise, setCurrentExercise] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  // Dữ liệu bài tập mẫu
  const exercises = [
    {
      id: 1,
      type: 'multiple-choice',
      question: '5 + 3 = ?',
      options: ['6', '7', '8', '9'],
      correctAnswer: '8',
      points: 10
    },
    {
      id: 2,
      type: 'fill-blank',
      question: 'Điền số còn thiếu: 2, 4, 6, __, 10',
      correctAnswer: '8',
      points: 15
    },
    {
      id: 3,
      type: 'drag-drop',
      question: 'Sắp xếp từ nhỏ đến lớn',
      items: ['5', '2', '8', '3', '7'],
      correctOrder: ['2', '3', '5', '7', '8'],
      points: 20
    },
    {
      id: 4,
      type: 'true-false',
      question: '10 - 4 = 6',
      correctAnswer: true,
      points: 10
    }
  ];

  // Component Multiple Choice
  const MultipleChoice = ({ exercise }) => {
    const [selected, setSelected] = useState(null);

    const handleSelect = (option) => {
      setSelected(option);
      setAnswers({ ...answers, [exercise.id]: option });
    };

    return (
      <div>
        <h3 className="text-2xl font-bold mb-6">{exercise.question}</h3>
        <div className="grid grid-cols-2 gap-4">
          {exercise.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option)}
              className={`
                p-6 rounded-xl text-xl font-medium transition-all
                ${selected === option
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
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

  // Component Fill in Blank
  const FillBlank = ({ exercise }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
      setValue(e.target.value);
      setAnswers({ ...answers, [exercise.id]: e.target.value });
    };

    return (
      <div>
        <h3 className="text-2xl font-bold mb-6">{exercise.question}</h3>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="w-32 px-4 py-3 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
          placeholder="?"
        />
      </div>
    );
  };

  // Component Drag Drop (Simplified - không dùng thư viện nặng)
  const DragDrop = ({ exercise }) => {
    const [items, setItems] = useState(exercise.items);
    const [draggedItem, setDraggedItem] = useState(null);

    const handleDragStart = (e, item) => {
      setDraggedItem(item);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e, targetItem) => {
      e.preventDefault();
      
      const draggedIndex = items.indexOf(draggedItem);
      const targetIndex = items.indexOf(targetItem);
      
      const newItems = [...items];
      newItems[draggedIndex] = targetItem;
      newItems[targetIndex] = draggedItem;
      
      setItems(newItems);
      setAnswers({ ...answers, [exercise.id]: newItems });
    };

    return (
      <div>
        <h3 className="text-2xl font-bold mb-6">{exercise.question}</h3>
        <div className="flex gap-4 justify-center flex-wrap">
          {items.map((item, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
              className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center text-2xl font-bold cursor-move hover:bg-purple-200 transition-colors"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Component True/False
  const TrueFalse = ({ exercise }) => {
    const [selected, setSelected] = useState(null);

    const handleSelect = (value) => {
      setSelected(value);
      setAnswers({ ...answers, [exercise.id]: value });
    };

    return (
      <div>
        <h3 className="text-2xl font-bold mb-6">{exercise.question}</h3>
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(true)}
            className={`
              px-8 py-4 rounded-xl text-xl font-medium flex items-center gap-2
              ${selected === true
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }
            `}
          >
            <FaCheck /> Đúng
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(false)}
            className={`
              px-8 py-4 rounded-xl text-xl font-medium flex items-center gap-2
              ${selected === false
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }
            `}
          >
            <FaTimes /> Sai
          </motion.button>
        </div>
      </div>
    );
  };

  // Render exercise theo type
  const renderExercise = () => {
    const exercise = exercises[currentExercise];
    
    switch (exercise.type) {
      case 'multiple-choice':
        return <MultipleChoice exercise={exercise} />;
      case 'fill-blank':
        return <FillBlank exercise={exercise} />;
      case 'drag-drop':
        return <DragDrop exercise={exercise} />;
      case 'true-false':
        return <TrueFalse exercise={exercise} />;
      default:
        return null;
    }
  };

  // Xử lý nộp bài
  const handleSubmit = () => {
    let totalScore = 0;
    
    exercises.forEach(exercise => {
      const userAnswer = answers[exercise.id];
      let isCorrect = false;
      
      switch (exercise.type) {
        case 'multiple-choice':
        case 'fill-blank':
          isCorrect = userAnswer === exercise.correctAnswer;
          break;
        case 'drag-drop':
          isCorrect = JSON.stringify(userAnswer) === JSON.stringify(exercise.correctOrder);
          break;
        case 'true-false':
          isCorrect = userAnswer === exercise.correctAnswer;
          break;
      }
      
      if (isCorrect) {
        totalScore += exercise.points;
      }
    });
    
    setScore(totalScore);
    setShowResult(true);
  };

  // Xử lý next/prev
  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
    }
  };

  // Màn hình kết quả
  if (showResult) {
    const maxScore = exercises.reduce((sum, ex) => sum + ex.points, 0);
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Kết quả</h2>
          
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
          </div>
          
          <p className="text-4xl font-bold text-purple-600 mb-2">
            {score}/{maxScore} điểm
          </p>
          
          <p className="text-xl text-gray-600 mb-6">
            {percentage >= 80 ? 'Xuất sắc!' : percentage >= 60 ? 'Tốt lắm!' : 'Cố gắng lên!'}
          </p>
          
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 flex items-center justify-center gap-2"
            >
              <FaHome /> Trang chủ
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              <FaRedo /> Làm lại
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Bài tập - Bài {lessonId}</h2>
            <span className="text-gray-600">
              Câu {currentExercise + 1}/{exercises.length}
            </span>
          </div>
          
          {/* Progress */}
          <div className="flex gap-2">
            {exercises.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full ${
                  index < currentExercise
                    ? 'bg-green-500'
                    : index === currentExercise
                    ? 'bg-purple-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Exercise content */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
          <motion.div
            key={currentExercise}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderExercise()}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrev}
            disabled={currentExercise === 0}
            className={`
              px-6 py-3 rounded-lg font-medium
              ${currentExercise === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg'
              }
            `}
          >
            Câu trước
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 shadow-lg"
          >
            {currentExercise === exercises.length - 1 ? 'Nộp bài' : 'Câu tiếp'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExercisePage;
