import React, { useState, useEffect, useCallback, useMemo } from 'react';

// ===================================================================================
// ## GAME 1: VỆ BINH THIÊN THẠCH (Code hoàn chỉnh)
// ===================================================================================
const MeteoriteGuardian = ({ onBack }) => {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'gameOver'
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [question, setQuestion] = useState(null);
  const [meteors, setMeteors] = useState([]);
  const [level, setLevel] = useState(1);

  const generateQuestion = useCallback(() => {
    const num1 = Math.floor(Math.random() * (level * 5)) + 1;
    const num2 = Math.floor(Math.random() * 9) + 1;
    return { text: `${num1} × ${num2}`, answer: num1 * num2 };
  }, [level]);

  const createMeteors = useCallback((correctAnswer) => {
    let answers = new Set([correctAnswer]);
    while (answers.size < 4) {
      const wrongAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
      if (wrongAnswer !== correctAnswer && wrongAnswer > 0) {
        answers.add(wrongAnswer);
      }
    }

    const shuffledAnswers = Array.from(answers).sort(() => Math.random() - 0.5);

    const newMeteors = shuffledAnswers.map((ans, i) => ({
      id: `meteor-${Date.now()}-${i}`,
      value: ans,
      left: `${10 + i * 22}%`,
      isCorrect: ans === correctAnswer,
      animationDuration: Math.random() * 2 + 4,
    }));

    setMeteors(newMeteors);
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setLevel(1);
    setLives(3);
    const newQuestion = generateQuestion();
    setQuestion(newQuestion);
    createMeteors(newQuestion.answer);
    setGameState('playing');
  }, [generateQuestion, createMeteors]);

  const handleMeteorClick = useCallback((meteor) => {
    if (gameState !== 'playing') return;

    if (meteor.isCorrect) {
      setScore(prev => prev + 10);
      if ((score + 10) % 50 === 0) setLevel(prev => prev + 1);

      const newQuestion = generateQuestion();
      setQuestion(newQuestion);
      createMeteors(newQuestion.answer);
    } else {
      setLives(prev => {
        if (prev - 1 <= 0) setGameState('gameOver');
        return prev - 1;
      });
    }
  }, [gameState, score, createMeteors, generateQuestion]);

  if (gameState === 'menu') {
    return (
      <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Vệ Binh Thiên Thạch ☄️</h2>
        <p className="mb-6">Bảo vệ hành tinh bằng cách bắn hạ các thiên thạch có đáp án đúng!</p>
        <div className="space-x-4">
            <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700">Quay lại</button>
            <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700">Bắt đầu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl h-[600px] bg-black border-2 border-purple-500 overflow-hidden rounded-lg mx-auto">
      {gameState === 'gameOver' ? (
        <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-20">
          <h2 className="text-5xl font-bold mb-4 text-white">Kết thúc!</h2>
          <p className="text-3xl mb-6 text-white">Tổng điểm: <span className="text-yellow-400">{score}</span></p>
          <div className="space-x-4">
             <button onClick={onBack} className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700">Quay lại</button>
             <button onClick={startGame} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700">Chơi lại</button>
          </div>
        </div>
      ) : null}

      {[...Array(50)].map((_, i) => <div key={i} className="absolute bg-white rounded-full" style={{ width: '2px', height: '2px', top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, opacity: Math.random() }}></div>)}
      
      <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 text-white flex justify-between items-center z-10">
        <div className="text-2xl font-bold">Điểm: <span className="text-yellow-400">{score}</span></div>
        <div className="text-2xl font-bold">Cấp độ: <span className="text-green-400">{level}</span></div>
        <div className="text-2xl font-bold">Mạng: {'❤️'.repeat(lives)}</div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-purple-800 p-4 rounded-lg text-4xl font-bold z-10">
        {question?.text} = ?
      </div>
      
      {meteors.map(meteor => (
        <div
          key={meteor.id}
          onClick={() => handleMeteorClick(meteor)}
          className="absolute flex items-center justify-center w-24 h-24 bg-cover cursor-pointer text-white text-3xl font-bold"
          style={{ 
            backgroundImage: 'url("https://i.imgur.com/8i9AAlp.png")', // URL to a simple meteor image
            left: meteor.left,
            animation: `fall ${meteor.animationDuration}s linear`,
            animationPlayState: gameState === 'playing' ? 'running' : 'paused'
          }}
        >
          {meteor.value}
        </div>
      ))}

      <style>{`
        @keyframes fall {
          0% { top: -100px; transform: rotate(0deg); }
          100% { top: 100%; transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
// ===================================================================================
// ## GAME 2: CUỘC ĐUA XUYÊN KHÔNG
// ===================================================================================
const GameStyles = () => (
  <style>{`
    .game-container-race {
      background: #0a0a1f;
      background-image: radial-gradient(circle, #1a1a3a 1px, transparent 1px);
      background-size: 20px 20px;
    }
    .spaceship-race {
      transition: left 0.5s ease-in-out;
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff;
    }
    .feedback-correct {
      box-shadow: 0 0 20px 5px #4ade80; /* green-400 */
    }
    .feedback-incorrect {
      box-shadow: 0 0 20px 5px #f87171; /* red-400 */
    }
  `}</style>
);
const CuocDuaXuyenKhong = ({ onBack }) => {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'gameOver'
  const [score, setScore] = useState(0);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [level, setLevel] = useState(1);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState(''); // '', 'correct', 'incorrect'

  const generateQuestion = useCallback(() => {
    const num1 = Math.floor(Math.random() * (level * 4)) + level;
    const num2 = Math.floor(Math.random() * 9) + 1;
    const operations = ['+', '-', '×'];
    const op = operations[Math.floor(Math.random() * operations.length)];

    let text = `${num1} ${op} ${num2}`;
    let answer;

    switch (op) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        // Đảm bảo kết quả không âm
        if (num1 < num2) {
            text = `${num2} - ${num1}`;
            answer = num2 - num1;
        } else {
            answer = num1 - num2;
        }
        break;
      case '×':
        answer = num1 * num2;
        break;
      default:
        answer = num1 + num2; // Mặc định
    }
    return { text, answer };
  }, [level]);

  const prepareNewRound = useCallback(() => {
    const newQuestion = generateQuestion();
    setQuestion(newQuestion);

    let answerOptions = new Set([newQuestion.answer]);
    while (answerOptions.size < 4) {
      const wrongAnswer = newQuestion.answer + Math.floor(Math.random() * 18) - 9;
      if (wrongAnswer !== newQuestion.answer && wrongAnswer >= 0) {
        answerOptions.add(wrongAnswer);
      }
    }
    setAnswers(Array.from(answerOptions).sort(() => Math.random() - 0.5));
  }, [generateQuestion]);

  const startGame = useCallback(() => {
    setScore(0);
    setLevel(1);
    setPlayerPosition(0);
    setGameState('playing');
    prepareNewRound();
  }, [prepareNewRound]);

  useEffect(() => {
    if (playerPosition >= 100) {
      setGameState('gameOver');
    }
  }, [playerPosition]);

  const handleAnswerClick = (answer) => {
    if (gameState !== 'playing') return;

    if (answer === question.answer) {
      setScore(prev => prev + 10);
      setPlayerPosition(prev => Math.min(prev + 15, 100)); // Mỗi lần đúng tiến 15%
      setFeedback('correct');

      if ((score + 10) % 50 === 0 && score > 0) {
        setLevel(prev => prev + 1);
      }
      setTimeout(prepareNewRound, 300); // Chuẩn bị câu hỏi mới sau 1 khoảng trễ ngắn
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => setFeedback(''), 500); // Xóa hiệu ứng sau 0.5s
  };

  if (gameState === 'menu') {
    return (
      <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Cuộc Đua Xuyên Không 🚀</h2>
        <p className="mb-6">Tăng tốc phi thuyền của bạn bằng kiến thức toán học.</p>
        <div className="space-x-4">
          <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
          <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-colors">Bắt đầu</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <GameStyles />
      <div className={`relative w-full max-w-4xl h-[600px] game-container-race border-2 border-purple-500 overflow-hidden rounded-lg mx-auto transition-all duration-500 ${feedback === 'correct' ? 'feedback-correct' : ''} ${feedback === 'incorrect' ? 'feedback-incorrect' : ''}`}>
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center z-20">
            <h2 className="text-6xl font-bold mb-4 text-white">
              {playerPosition >= 100 ? '🎉 Về Đích! 🎉' : 'Kết Thúc!'}
            </h2>
            <p className="text-3xl mb-6 text-white">Tổng điểm: <span className="text-yellow-400">{score}</span></p>
            <div className="space-x-4">
              <button onClick={onBack} className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
              <button onClick={startGame} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors">Chơi lại</button>
            </div>
          </div>
        )}

        {[...Array(50)].map((_, i) => <div key={i} className="absolute bg-white rounded-full" style={{ width: `${Math.random()*2+1}px`, height: `${Math.random()*2+1}px`, top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, opacity: Math.random() }}></div>)}
        
        <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 text-white flex justify-between items-center z-10">
          <div className="text-2xl font-bold">Điểm: <span className="text-yellow-400">{score}</span></div>
          <div className="text-2xl font-bold">Cấp độ: <span className="text-green-400">{level}</span></div>
        </div>

        {/* --- Phần chính của Game --- */}
        <div className="w-full h-full flex flex-col justify-center items-center space-y-12">
            {/* Đường đua và phi thuyền */}
            <div className="w-[90%] bg-white/10 h-8 rounded-full border-2 border-purple-400">
                <div className="relative h-full">
                    <div className="absolute -top-4 text-4xl spaceship-race" style={{ left: `calc(${playerPosition}% - 20px)`}}>
                        🛸
                    </div>
                </div>
            </div>

            {/* Câu hỏi và các lựa chọn */}
            {question && gameState === 'playing' && (
                <div className="text-center">
                    <p className="text-5xl font-bold text-white mb-8">{question.text} = ?</p>
                    <div className="grid grid-cols-2 gap-4">
                        {answers.map((ans, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswerClick(ans)}
                            className="px-8 py-4 bg-purple-600 text-white text-3xl font-bold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transform hover:scale-105 transition-all"
                        >
                            {ans}
                        </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </>
  );
};

// ===================================================================================
// ## GAME 3: PHÒNG THỦ NGÂN HÀ
// ===================================================================================
const GAME_CONFIG = {
    lives: 10,
    startingGold: 100,
    towerCost: 50,
    towerRange: 150, // Bán kính tầm bắn (pixel)
    towerDamage: 10,
    enemyHealth: 50,
    enemySpeed: 1, // Pixel mỗi tick
    goldPerKill: 20,
    gamePathY: 300, // Tọa độ Y của đường đi
    gameScreenWidth: 896, // Chiều rộng khu vực game (max-w-4xl)
};

const TOWER_SLOTS = [
    { id: 1, x: 150, y: GAME_CONFIG.gamePathY - 80 },
    { id: 2, x: 350, y: GAME_CONFIG.gamePathY + 80 },
    { id: 3, x: 550, y: GAME_CONFIG.gamePathY - 80 },
    { id: 4, x: 750, y: GAME_CONFIG.gamePathY + 80 },
];

const WAVES = [
    { count: 5, health: 50 },
    { count: 8, health: 60 },
    { count: 10, health: 80, speed: 1.2 },
    { count: 15, health: 100, speed: 1.3 },
];
const PhongTuyenNganHa = ({ onBack }) => {
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'gameOver', 'victory'
    const [lives, setLives] = useState(GAME_CONFIG.lives);
    const [gold, setGold] = useState(GAME_CONFIG.startingGold);
    const [wave, setWave] = useState(0);
    const [towers, setTowers] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [projectiles, setProjectiles] = useState([]);
    const [buildPrompt, setBuildPrompt] = useState(null);

    // Bắt đầu game
    const startGame = useCallback(() => {
        setLives(GAME_CONFIG.lives);
        setGold(GAME_CONFIG.startingGold);
        setWave(0);
        setTowers([]);
        setEnemies([]);
        setProjectiles([]);
        setGameState('playing');
    }, []);

    // Logic tạo câu hỏi khi xây tháp
    const handleAttemptBuild = (slot) => {
        if (gold < GAME_CONFIG.towerCost) {
            alert("Không đủ vàng!");
            return;
        }
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const question = {
            text: `${num1} + ${num2} = ?`,
            answer: num1 + num2
        };
        
        let answers = new Set([question.answer]);
        while(answers.size < 3) {
            const wrong = question.answer + Math.floor(Math.random() * 8) - 4;
            if (wrong !== question.answer) answers.add(wrong);
        }

        setBuildPrompt({ slot, question, answers: Array.from(answers).sort() });
    };
    
    // Logic trả lời câu hỏi
    const handleAnswerBuild = (answer) => {
        if (answer === buildPrompt.question.answer) {
            setGold(g => g - GAME_CONFIG.towerCost);
            setTowers(t => [...t, { id: buildPrompt.slot.id, ...buildPrompt.slot }]);
        }
        setBuildPrompt(null);
    };

    // Game Loop chính
    useEffect(() => {
        if (gameState !== 'playing') return;

        const interval = setInterval(() => {
            // 1. Di chuyển kẻ địch và kiểm tra nếu tới đích
            let livesLost = 0;
            setEnemies(prevEnemies => prevEnemies.map(e => ({...e, x: e.x + (e.speed || GAME_CONFIG.enemySpeed)}))
                .filter(e => {
                    if (e.x >= GAME_CONFIG.gameScreenWidth) {
                        livesLost++;
                        return false;
                    }
                    return true;
                }));
            if (livesLost > 0) setLives(l => l - livesLost);

            // 2. Tháp tấn công kẻ địch
            const newProjectiles = [];
            setTowers(currentTowers => {
                currentTowers.forEach(tower => {
                    const target = enemies.find(enemy => {
                        const distance = Math.sqrt(Math.pow(tower.x - enemy.x, 2) + Math.pow(tower.y - enemy.y, 2));
                        return distance <= GAME_CONFIG.towerRange;
                    });

                    if (target) {
                        newProjectiles.push({ id: Math.random(), from: {x: tower.x, y: tower.y}, to: {x: target.x, y: target.y} });
                        
                        setEnemies(prevEnemies => prevEnemies.map(e => 
                            e.id === target.id ? {...e, health: e.health - GAME_CONFIG.towerDamage} : e
                        ));
                    }
                });
                return currentTowers;
            });

            // Hiệu ứng đạn bắn
            setProjectiles(newProjectiles);
            setTimeout(() => setProjectiles([]), 50); // Xóa tia đạn sau 50ms

            // 3. Xóa kẻ địch bị tiêu diệt và cộng vàng
            let goldEarned = 0;
            setEnemies(prevEnemies => prevEnemies.filter(e => {
                if (e.health <= 0) {
                    goldEarned++;
                    return false;
                }
                return true;
            }));
            if (goldEarned > 0) setGold(g => g + goldEarned * GAME_CONFIG.goldPerKill);

            // 4. Bắt đầu wave mới nếu hết kẻ địch
            if (enemies.length === 0 && wave < WAVES.length) {
                const nextWave = WAVES[wave];
                const newEnemies = Array.from({ length: nextWave.count }, (_, i) => ({
                    id: `w${wave}-e${i}`,
                    x: -i * 50, // Rải địch ra
                    y: GAME_CONFIG.gamePathY,
                    health: nextWave.health,
                    maxHealth: nextWave.health,
                    speed: nextWave.speed
                }));
                setEnemies(newEnemies);
                setWave(w => w + 1);
            }

        }, 100);

        return () => clearInterval(interval);
    }, [gameState, enemies, towers, wave]);
    
    // Kiểm tra điều kiện thua/thắng
    useEffect(() => {
        if (lives <= 0) setGameState('gameOver');
        if (wave === WAVES.length && enemies.length === 0) setGameState('victory');
    }, [lives, wave, enemies]);

    const builtTowerIds = useMemo(() => new Set(towers.map(t => t.id)), [towers]);

    if (gameState === 'menu') {
        return (
            <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Phòng Tuyến Ngân Hà 👽</h2>
                <p className="mb-6">Xây tháp phòng thủ để chống lại quái vật xâm lăng.</p>
                <div className="space-x-4">
                    <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700">Quay lại</button>
                    <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700">Bắt đầu</button>
                </div>
            </div>
        );
    }
    
    // Giao diện Game Over / Victory
    if (gameState === 'gameOver' || gameState === 'victory') {
         return (
            <div className="relative w-full max-w-4xl h-[600px] bg-black border-2 border-purple-500 rounded-lg mx-auto flex justify-center items-center">
                <div className="text-center text-white z-10 p-8 bg-black/70 rounded-lg">
                    <h2 className="text-5xl font-bold mb-4">{gameState === 'victory' ? '🎉 CHIẾN THẮNG! 🎉' : 'THẤT BẠI!'}</h2>
                    <p className="text-3xl mb-6">Bạn đã đến Wave <span className="text-yellow-400">{wave}</span></p>
                    <div className="space-x-4">
                        <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700">Quay lại</button>
                        <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700">Chơi lại</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-4xl h-[600px] bg-black border-2 border-purple-500 overflow-hidden rounded-lg mx-auto select-none">
            {/* Giao diện game */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 text-white flex justify-between items-center z-10">
                <div className="text-xl font-bold">❤️ Mạng: <span className="text-red-400">{lives}</span></div>
                <div className="text-xl font-bold">💰 Vàng: <span className="text-yellow-400">{gold}</span></div>
                <div className="text-xl font-bold">🌊 Wave: <span className="text-blue-400">{wave} / {WAVES.length}</span></div>
            </div>

            {/* Đường đi của địch */}
            <div className="absolute left-0 w-full h-1 bg-purple-900/50" style={{ top: `${GAME_CONFIG.gamePathY}px` }}></div>
            <div className="absolute right-0 text-5xl animate-pulse" style={{top: `${GAME_CONFIG.gamePathY - 35}px`}}>🏠</div>

            {/* Bệ súng */}
            {TOWER_SLOTS.map(slot => (
                !builtTowerIds.has(slot.id) && (
                    <div key={slot.id} onClick={() => handleAttemptBuild(slot)}
                        className="absolute w-16 h-16 bg-white/10 border-2 border-dashed border-gray-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20"
                        style={{ left: `${slot.x-32}px`, top: `${slot.y-32}px` }}>
                        <span className="text-3xl text-gray-400">+</span>
                    </div>
                )
            ))}

            {/* Tháp đã xây */}
            {towers.map(tower => <div key={tower.id} className="absolute text-4xl" style={{left: `${tower.x-20}px`, top: `${tower.y-25}px`}}>🛰️</div>)}
            
            {/* Kẻ địch */}
            {enemies.map(enemy => (
                <div key={enemy.id} className="absolute" style={{left: `${enemy.x-15}px`, top: `${enemy.y-15}px`}}>
                    <span className="text-3xl">👽</span>
                    {/* Thanh máu */}
                    <div className="w-8 h-1 bg-red-800 rounded-full">
                        <div className="h-1 bg-green-500 rounded-full" style={{width: `${(enemy.health / enemy.maxHealth) * 100}%`}}></div>
                    </div>
                </div>
            ))}
            
            {/* Hiệu ứng đạn */}
            <svg className="absolute w-full h-full top-0 left-0 pointer-events-none">
                {projectiles.map(p => <line key={p.id} x1={p.from.x} y1={p.from.y} x2={p.to.x} y2={p.to.y} stroke="#00ffff" strokeWidth="2" />)}
            </svg>

            {/* Popup xây tháp */}
            {buildPrompt && (
                <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-20">
                    <div className="bg-gray-800 p-8 rounded-lg text-white text-center">
                        <h3 className="text-3xl font-bold mb-4">Trả lời để xây tháp!</h3>
                        <p className="text-4xl mb-6">{buildPrompt.question.text}</p>
                        <div className="flex gap-4">
                            {buildPrompt.answers.map(ans => <button key={ans} onClick={() => handleAnswerBuild(ans)} className="px-6 py-3 bg-purple-600 rounded-lg font-bold text-2xl hover:bg-purple-700">{ans}</button>)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
// ===================================================================================
// ## GAME 4: MẬT MÃ NGOÀI HÀNH TINH
// ===================================================================================
const CODE_BREAKER_CONFIG = {
    SYMBOLS: ['🌀', '🌌', '🔮', '🪐', '🌠', '✨'],
    CODE_LENGTH: 4,
    MAX_GUESSES: 10,
};

const MatMaNgoaiHanhTinh = ({ onBack }) => {
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'victory', 'gameOver'
    const [secretCode, setSecretCode] = useState([]);
    const [currentGuess, setCurrentGuess] = useState([]);
    const [guessHistory, setGuessHistory] = useState([]);
    const [score, setScore] = useState(0);

    const generateSecretCode = useCallback(() => {
        const code = [];
        for (let i = 0; i < CODE_BREAKER_CONFIG.CODE_LENGTH; i++) {
            const randomIndex = Math.floor(Math.random() * CODE_BREAKER_CONFIG.SYMBOLS.length);
            code.push(CODE_BREAKER_CONFIG.SYMBOLS[randomIndex]);
        }
        setSecretCode(code);
    }, []);

    const startGame = useCallback(() => {
        generateSecretCode();
        setGuessHistory([]);
        setCurrentGuess([]);
        setGameState('playing');
    }, [generateSecretCode]);

    const handleSymbolClick = (symbol) => {
        if (currentGuess.length < CODE_BREAKER_CONFIG.CODE_LENGTH) {
            setCurrentGuess(prev => [...prev, symbol]);
        }
    };

    const handleDelete = () => {
        setCurrentGuess(prev => prev.slice(0, -1));
    };

    const handleSubmitGuess = () => {
        if (currentGuess.length !== CODE_BREAKER_CONFIG.CODE_LENGTH) return;

        let tempSecret = [...secretCode];
        let tempGuess = [...currentGuess];
        let correctPosition = 0;
        let correctSymbol = 0;

        // Vòng 1: Kiểm tra đúng vị trí và đúng ký tự (🟢)
        for (let i = tempGuess.length - 1; i >= 0; i--) {
            if (tempGuess[i] === tempSecret[i]) {
                correctPosition++;
                tempGuess.splice(i, 1);
                tempSecret.splice(i, 1);
            }
        }

        // Vòng 2: Kiểm tra đúng ký tự nhưng sai vị trí (🟡)
        for (let i = 0; i < tempGuess.length; i++) {
            const symbolIndex = tempSecret.indexOf(tempGuess[i]);
            if (symbolIndex > -1) {
                correctSymbol++;
                tempSecret.splice(symbolIndex, 1);
            }
        }

        const newHistory = [...guessHistory, { guess: currentGuess, feedback: { correctPosition, correctSymbol } }];
        setGuessHistory(newHistory);
        setCurrentGuess([]);

        if (correctPosition === CODE_BREAKER_CONFIG.CODE_LENGTH) {
            setGameState('victory');
            setScore(prev => prev + (CODE_BREAKER_CONFIG.MAX_GUESSES - newHistory.length + 1) * 10);
        } else if (newHistory.length >= CODE_BREAKER_CONFIG.MAX_GUESSES) {
            setGameState('gameOver');
        }
    };

    if (gameState === 'menu') {
        return (
            <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Mật Mã Ngoài Hành Tinh 📜</h2>
                <p className="mb-6">Giải mã các ký tự cổ đại bằng tư duy logic.</p>
                <div className="space-x-4">
                    <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700">Quay lại</button>
                    <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700">Bắt đầu</button>
                </div>
            </div>
        );
    }
    
    if (gameState === 'victory' || gameState === 'gameOver') {
        return (
           <div className="relative w-full max-w-4xl h-[600px] bg-black border-2 border-purple-500 rounded-lg mx-auto flex justify-center items-center">
               <div className="text-center text-white z-10 p-8 bg-black/70 rounded-lg">
                   <h2 className="text-5xl font-bold mb-4">{gameState === 'victory' ? '🎉 GIẢI MÃ THÀNH CÔNG! 🎉' : 'THẤT BẠI!'}</h2>
                   <p className="text-2xl mb-2">Mật mã đúng là:</p>
                   <div className="flex justify-center gap-2 mb-6">{secretCode.map((s, i) => <div key={i} className="w-12 h-12 text-3xl flex items-center justify-center rounded-full bg-purple-800">{s}</div>)}</div>
                   <p className="text-3xl mb-6">Tổng điểm: <span className="text-yellow-400">{score}</span></p>
                   <div className="space-x-4">
                       <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700">Quay lại</button>
                       <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700">Chơi lại</button>
                   </div>
               </div>
           </div>
       );
   }

    return (
        <div className="relative w-full max-w-lg h-[700px] bg-gray-900 border-2 border-purple-500 overflow-hidden rounded-lg mx-auto p-4 flex flex-col justify-between">
            {/* Header */}
            <div className="text-white flex justify-between items-center">
                <div className="text-xl font-bold">Điểm: <span className="text-yellow-400">{score}</span></div>
                <div className="text-xl font-bold">Lượt đoán: <span className="text-blue-400">{guessHistory.length} / {CODE_BREAKER_CONFIG.MAX_GUESSES}</span></div>
            </div>

            {/* Bảng lịch sử đoán */}
            <div className="flex-grow my-4 overflow-y-auto pr-2 space-y-2">
                {guessHistory.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
                        <div className="flex gap-2">
                            {item.guess.map((symbol, i) => <div key={i} className="w-10 h-10 text-2xl flex items-center justify-center rounded-full bg-gray-700 text-white">{symbol}</div>)}
                        </div>
                        <div className="flex gap-1">
                            {Array(item.feedback.correctPosition).fill(0).map((_, i) => <span key={`cp-${i}`} className="text-2xl">🟢</span>)}
                            {Array(item.feedback.correctSymbol).fill(0).map((_, i) => <span key={`cs-${i}`} className="text-2xl">🟡</span>)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bảng điều khiển */}
            <div className="flex-shrink-0">
                {/* Hàng đoán hiện tại */}
                <div className="flex items-center justify-center gap-2 mb-4 p-2 bg-gray-800 rounded-lg h-16">
                    {Array(CODE_BREAKER_CONFIG.CODE_LENGTH).fill(0).map((_, i) => 
                        <div key={i} className={`w-12 h-12 text-3xl flex items-center justify-center rounded-full ${currentGuess[i] ? 'bg-purple-600' : 'bg-gray-700'}`}>{currentGuess[i] || ''}</div>
                    )}
                </div>

                {/* Bảng chọn ký tự */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {CODE_BREAKER_CONFIG.SYMBOLS.map(symbol => (
                        <button key={symbol} onClick={() => handleSymbolClick(symbol)} className="p-3 text-3xl bg-gray-700 rounded-lg hover:bg-purple-700 text-white transition-colors">
                            {symbol}
                        </button>
                    ))}
                    <button onClick={handleDelete} className="p-3 text-2xl bg-yellow-600 rounded-lg hover:bg-yellow-700 text-white transition-colors">XÓA</button>
                    <button onClick={handleSubmitGuess} className="p-3 text-2xl bg-green-600 rounded-lg hover:bg-green-700 text-white transition-colors col-span-3">GIẢI MÃ</button>
                </div>
            </div>
        </div>
    );
};


// ===================================================================================
// ## MENU CHỌN GAME
// ===================================================================================

const GAMES = [
  { 
    id: 'guardian', 
    name: 'Vệ Binh Thiên Thạch ☄️', 
    description: 'Bắn hạ thiên thạch bằng cách giải các phép toán.', 
    component: MeteoriteGuardian 
  },
  { 
    id: 'race', 
    name: 'Cuộc Đua Xuyên Không 🚀', 
    description: 'Tăng tốc phi thuyền của bạn bằng kiến thức toán học.', 
    component: CuocDuaXuyenKhong 
  },
  { 
    id: 'defense', 
    name: 'Phòng Tuyến Ngân Hà 👽', 
    description: 'Xây tháp phòng thủ để chống lại quái vật xâm lăng.', 
    component: PhongTuyenNganHa 
  },
  { 
    id: 'code', 
    name: 'Mật Mã Ngoài Hành Tinh 📜', 
    description: 'Giải mã các ký tự cổ đại bằng tư duy logic.', 
    component: MatMaNgoaiHanhTinh
  }
];

const GameMenu = ({ onSelectGame }) => {
    return (
        <div className="p-8">
            <h1 className="text-5xl font-bold text-center text-white mb-12">Trung Tâm Trò Chơi</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {GAMES.map(game => (
                    <div 
                        key={game.id}
                        className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/50 rounded-2xl p-8 text-white cursor-pointer transition-all duration-300 hover:border-purple-400 hover:scale-105"
                        onClick={() => onSelectGame(game.id)}
                    >
                        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{game.name}</h2>
                        <p className="text-gray-300">{game.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ===================================================================================
// ## COMPONENT CHÍNH: GAME PAGE
// ===================================================================================
const GamePage = () => {
    const [activeGameId, setActiveGameId] = useState(null);

    const handleSelectGame = (gameId) => {
        setActiveGameId(gameId);
    };

    const handleBackToMenu = () => {
        setActiveGameId(null);
    };

    // Tìm component game tương ứng với ID đang được chọn
    const ActiveGame = GAMES.find(g => g.id === activeGameId)?.component;

    return (
        <div className="w-full min-h-screen bg-gray-900 flex justify-center items-center">
            {/* SỬA LỖI: Thêm lại logic kiểm tra bằng toán tử ba ngôi (? :)
              - Nếu `ActiveGame` có tồn tại (người dùng đã chọn game), thì hiển thị game đó.
              - Nếu không, thì hiển thị GameMenu.
            */}
            {ActiveGame ? (
                <div className="relative w-full max-w-4xl"> 
                    {/* Nút quay lại chỉ hiển thị khi có game đang chạy */}
                    <button 
                        onClick={handleBackToMenu} 
                        className="absolute left-0 -top-14 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-2xl text-white transition-colors hover:bg-gray-600"
                        aria-label="Quay lại Menu"
                    >
                      🔙
                    </button>
                    
                    <ActiveGame onBack={handleBackToMenu} />
                </div>
            ) : (
                <GameMenu onSelectGame={handleSelectGame} />
            )}
        </div>
    );
};

export default GamePage;