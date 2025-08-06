import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaPause, 
  FaRedo,
  FaHome
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const GamePage = () => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  // States
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, gameOver
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('mathGameHighScore') || '0')
  );
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);

  // Game cơ bản: Balloon Pop Math
  const games = [
    {
      id: 1,
      name: 'Bóng bay Toán học',
      description: 'Nổ bóng bay có đáp án đúng!',
      icon: '🎈',
      color: 'from-pink-400 to-purple-400'
    },
    {
      id: 2,
      name: 'Đua xe số học',
      description: 'Giải toán để tăng tốc!',
      icon: '🏎️',
      color: 'from-blue-400 to-cyan-400'
    },
    {
      id: 3,
      name: 'Ninja Toán',
      description: 'Chém trái cây với số đúng!',
      icon: '🥷',
      color: 'from-green-400 to-emerald-400'
    }
  ];

  // Tạo câu hỏi ngẫu nhiên
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let question, answer;
    if (operation === '+') {
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
    } else {
      question = `${Math.max(num1, num2)} - ${Math.min(num1, num2)}`;
      answer = Math.max(num1, num2) - Math.min(num1, num2);
    }
    
    return { question, answer };
  };

  // Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      endGame();
    }
  }, [timeLeft, gameState]);

  // Bắt đầu game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(60);
    setCurrentQuestion(generateQuestion());
  };

  // Kết thúc game
  const endGame = () => {
    setGameState('gameOver');
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('mathGameHighScore', score.toString());
      toast.success('Kỷ lục mới! 🏆');
    }
  };

  // Xử lý trả lời
  const handleAnswer = () => {
    if (parseInt(userAnswer) === currentQuestion.answer) {
      setScore(score + 10);
      toast.success('Đúng rồi! +10 điểm');
      setCurrentQuestion(generateQuestion());
      setUserAnswer('');
    } else {
      toast.error('Sai rồi! Thử lại nhé');
    }
  };

  // Component Game Canvas đơn giản
  const BalloonGame = () => {
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      canvas.width = 800;
      canvas.height = 400;
      
      // Vẽ background
      ctx.fillStyle = '#e0e7ff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Vẽ bóng bay (simplified)
      const balloons = [
        { x: 100, y: 300, color: '#ff6b6b', value: currentQuestion.answer - 1 },
        { x: 300, y: 300, color: '#4ecdc4', value: currentQuestion.answer },
        { x: 500, y: 300, color: '#45b7d1', value: currentQuestion.answer + 1 },
        { x: 700, y: 300, color: '#96ceb4', value: currentQuestion.answer + 2 }
      ];
      
      balloons.forEach(balloon => {
        // Vẽ dây
        ctx.strokeStyle = '#666';
        ctx.beginPath();
        ctx.moveTo(balloon.x, balloon.y);
        ctx.lineTo(balloon.x, balloon.y + 100);
        ctx.stroke();
        
        // Vẽ bóng
        ctx.fillStyle = balloon.color;
        ctx.beginPath();
        ctx.ellipse(balloon.x, balloon.y - 30, 40, 50, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Vẽ số
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(balloon.value, balloon.x, balloon.y - 25);
      });
      
      // Vẽ câu hỏi
      ctx.fillStyle = '#333';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(currentQuestion.question + ' = ?', canvas.width / 2, 50);
      
    }, [currentQuestion]);

    const handleCanvasClick = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Kiểm tra click vào bóng nào
      const balloons = [
        { x: 100, y: 300, value: currentQuestion.answer - 1 },
        { x: 300, y: 300, value: currentQuestion.answer },
        { x: 500, y: 300, value: currentQuestion.answer + 1 },
        { x: 700, y: 300, value: currentQuestion.answer + 2 }
      ];
      
      balloons.forEach(balloon => {
        const distance = Math.sqrt(
          Math.pow(x - balloon.x, 2) + Math.pow(y - (balloon.y - 30), 2)
        );
        
        if (distance < 50) {
          if (balloon.value === currentQuestion.answer) {
            setScore(score + 10);
            toast.success('Đúng rồi! +10 điểm');
            setCurrentQuestion(generateQuestion());
          } else {
            toast.error('Sai rồi! Thử lại nhé');
          }
        }
      });
    };

    return (
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="border-2 border-gray-300 rounded-lg cursor-pointer"
      />
    );
  };

  // Menu game
  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Trò chơi Toán học</h1>
          
          <div className="grid md:grid-cols-3 gap-6">
            {games.map((game) => (
              <motion.div
                key={game.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
                className={`bg-gradient-to-br ${game.color} p-8 rounded-2xl shadow-lg cursor-pointer text-white text-center`}
              >
                <div className="text-6xl mb-4">{game.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{game.name}</h3>
                <p className="opacity-90">{game.description}</p>
                
                <button className="mt-6 px-6 py-3 bg-white/20 backdrop-blur rounded-lg font-medium hover:bg-white/30 transition-all">
                  Chơi ngay
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-2">Điểm cao nhất</p>
            <p className="text-3xl font-bold text-purple-600">{highScore}</p>
          </div>
        </div>
      </div>
    );
  }

  // Game over
  if (gameState === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-md w-full"
        >
          <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
          
          <div className="text-6xl mb-4">
            {score >= 100 ? '🏆' : score >= 50 ? '🌟' : '💪'}
          </div>
          
          <p className="text-4xl font-bold text-purple-600 mb-2">{score} điểm</p>
          
          {score > highScore && (
            <p className="text-green-600 font-medium mb-4">Kỷ lục mới!</p>
          )}
          
          <div className="flex gap-4">
            <button
              onClick={() => setGameState('menu')}
              className="flex-1 px-6 py-3 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 flex items-center justify-center gap-2"
            >
              <FaHome /> Menu
            </button>
            
            <button
              onClick={startGame}
              className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center justify-center gap-2"
            >
              <FaRedo /> Chơi lại
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Playing game
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Game header */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-xl font-medium">
                Điểm: <span className="text-purple-600 font-bold">{score}</span>
              </span>
              <span className="text-xl font-medium">
                Thời gian: <span className="text-orange-600 font-bold">{timeLeft}s</span>
              </span>
            </div>
            
            <button
              onClick={() => setGameState('paused')}
              className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              <FaPause />
            </button>
          </div>
        </div>

        {/* Game canvas */}
        <div className="bg-white rounded-2xl p-6 shadow-lg flex justify-center">
          <BalloonGame />
        </div>
      </div>
    </div>
  );
};

export default GamePage;