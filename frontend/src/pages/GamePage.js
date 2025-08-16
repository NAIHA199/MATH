import React, { useState, useEffect, useCallback,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/helpers';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import { toast } from 'react-toastify';

// ===================================================================================
// ## GAME 1: VỆ BINH THIÊN THẠCH (Code hoàn chỉnh)
// ===================================================================================
const METEOR_IMAGES = [
    'https://i.imgur.com/8i9AAlp.png', // Thiên thạch gốc
    'https://i.imgur.com/2sAs20m.png', // Thiên thạch băng
    'https://i.imgur.com/inK8339.png', // Thiên thạch lửa
    'https://i.imgur.com/o22n21h.png', // Thiên thạch tím
];

const MeteoriteGuardian = ({ onBack }) => {
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'gameOver'
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [question, setQuestion] = useState(null);
    const [meteors, setMeteors] = useState([]);
    const [level, setLevel] = useState(1);

    const generateQuestion = useCallback(() => {
        const num1 = Math.floor(Math.random() * (level * 5)) + level;
        const num2 = Math.floor(Math.random() * 9) + 2;
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

        const newMeteors = shuffledAnswers.map((ans, i) => {
            // BƯỚC 2: Chọn một hình ảnh ngẫu nhiên cho mỗi thiên thạch
            const randomImage = METEOR_IMAGES[Math.floor(Math.random() * METEOR_IMAGES.length)];
            return {
                id: `meteor-${Date.now()}-${i}`,
                value: ans,
                left: `${10 + i * 22}%`,
                isCorrect: ans === correctAnswer,
                animationDuration: Math.random() * 2 + (5 - level * 0.5), // Tốc độ tăng theo level
                imageUrl: randomImage, // Thêm thuộc tính hình ảnh vào đối tượng
            };
        });
        setMeteors(newMeteors);
    }, [level]);

    const startGame = useCallback(() => {
        setScore(0);
        setLevel(1);
        setLives(3);
        const newQuestion = generateQuestion();
        setQuestion(newQuestion);
        createMeteors(newQuestion.answer);
        setGameState('playing');
    }, [generateQuestion, createMeteors]);
    
    // CẢI TIẾN: Xử lý khi bỏ lỡ thiên thạch đúng
    useEffect(() => {
        if (gameState !== 'playing' || !meteors.length) {
            return;
        }

        const correctMeteor = meteors.find(m => m.isCorrect);
        if (!correctMeteor) return;

        const timerId = setTimeout(() => {
            setLives(prevLives => {
                if (prevLives > 0 && gameState === 'playing') {
                    toast.error('Bạn đã bỏ lỡ đáp án đúng!');
                    const newLives = prevLives - 1;
                    if (newLives <= 0) {
                        setGameState('gameOver');
                    } else {
                        // Tạo câu hỏi mới để tiếp tục chơi
                        const newQuestion = generateQuestion();
                        setQuestion(newQuestion);
                        createMeteors(newQuestion.answer);
                    }
                    return newLives;
                }
                return prevLives;
            });
        }, correctMeteor.animationDuration * 1000);

        return () => {
            clearTimeout(timerId);
        };
    }, [meteors, gameState, generateQuestion, createMeteors]);


    const handleMeteorClick = useCallback((meteor) => {
        if (gameState !== 'playing') return;

        if (meteor.isCorrect) {
            toast.success('+10 điểm!');
            // SỬA LỖI: Cập nhật điểm và kiểm tra lên cấp đồng bộ
            setScore(prevScore => {
                const newScore = prevScore + 10;
                if (newScore > 0 && newScore % 50 === 0) {
                    setLevel(prevLevel => {
                        toast.success(`🎉 Lên cấp ${prevLevel + 1}!`);
                        return prevLevel + 1;
                    });
                }
                return newScore;
            });

            const newQuestion = generateQuestion();
            setQuestion(newQuestion);
            createMeteors(newQuestion.answer);
        } else {
            toast.error('Sai rồi!');
            setLives(prev => {
                const newLives = prev - 1;
                if (newLives <= 0) {
                    setGameState('gameOver');
                }
                return newLives;
            });
        }
    }, [gameState, createMeteors, generateQuestion]);

    if (gameState === 'menu') {
        return (
            <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Vệ Binh Thiên Thạch ☄️</h2>
                <p className="mb-6">Bảo vệ hành tinh bằng cách bắn hạ các thiên thạch có đáp án đúng!</p>
                <div className="space-x-4">
                    <button onClick={onBack} className="px-6 py-3 bg-gray-600 rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
                    <button onClick={startGame} className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-700 transition-colors">Bắt đầu</button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-4xl h-[600px] bg-black border-2 border-purple-500 overflow-hidden rounded-lg mx-auto bg-cover" style={{ backgroundImage: 'url("https://i.imgur.com/a94wzMA.jpg")' }}>
            {gameState === 'gameOver' && (
                <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-20">
                    <h2 className="text-5xl font-bold mb-4 text-white">Kết thúc!</h2>
                    <p className="text-3xl mb-6 text-white">Tổng điểm: <span className="text-yellow-400">{score}</span></p>
                    <div className="space-x-4">
                        <button onClick={onBack} className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-colors">Quay lại</button>
                        <button onClick={startGame} className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors">Chơi lại</button>
                    </div>
                </div>
            )}
            
            <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 text-white flex justify-between items-center z-10">
                <div className="text-2xl font-bold">Điểm: <span className="text-yellow-400">{score}</span></div>
                <div className="text-2xl font-bold">Cấp độ: <span className="text-green-400">{level}</span></div>
                <div className="text-2xl font-bold">Mạng: <span className="text-red-500 text-3xl">{'♥'.repeat(lives)}</span></div>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-purple-800 p-4 rounded-lg text-4xl font-bold z-10 shadow-lg">
                {question?.text} = ?
            </div>
            
            {meteors.map(meteor => (
                <div
                    key={meteor.id}
                    onClick={() => handleMeteorClick(meteor)}
                    className="absolute flex items-center justify-center w-24 h-24 bg-contain bg-no-repeat bg-center cursor-pointer text-white text-3xl font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                    style={{ 
                        // BƯỚC 3: Sử dụng hình ảnh ngẫu nhiên đã chọn cho thiên thạch
                        backgroundImage: `url("${meteor.imageUrl}")`, 
                        left: meteor.left,
                        animation: `fall ${meteor.animationDuration}s linear`,
                        animationPlayState: gameState === 'playing' ? 'running' : 'paused'
                    }}
                >
                    <span className="mt-1">{meteor.value}</span>
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
      background-image: 
        radial-gradient(circle at 25% 25%, #1a1a3a 1px, transparent 1px),
        radial-gradient(circle at 75% 75%, #1a1a3a 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .spaceship-race {
      transition: left 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Hiệu ứng nảy */
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff;
    }
    .feedback-correct {
      box-shadow: 0 0 25px 8px #4ade80; /* green-400 */
    }
    .feedback-incorrect {
      box-shadow: 0 0 25px 8px #f87171; /* red-400 */
      animation: shake 0.5s;
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-10px); }
      75% { transform: translateX(10px); }
    }
  `}</style>
);

const CuocDuaXuyenKhong = ({ onBack }) => {
    // Thêm 'levelComplete' để xử lý chuyển màn
    const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'levelComplete', 'gameOver'
    const [score, setScore] = useState(0);
    const [playerPosition, setPlayerPosition] = useState(0);
    const [level, setLevel] = useState(1);
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [feedback, setFeedback] = useState('');
    
    // TÍNH NĂNG MỚI: Thêm state cho mạng sống
    const [lives, setLives] = useState(3);

    const generateQuestion = useCallback(() => {
        const num1 = Math.floor(Math.random() * (level * 4)) + level;
        const num2 = Math.floor(Math.random() * 9) + 2; // Bắt đầu từ 2 để phép nhân thú vị hơn
        const operations = ['+', '-', '×'];
        const op = operations[Math.floor(Math.random() * operations.length)];

        let text = `${num1} ${op} ${num2}`;
        let answer;

        switch (op) {
            case '+': answer = num1 + num2; break;
            case '-':
                if (num1 < num2) {
                    [text, answer] = [`${num2} - ${num1}`, num2 - num1];
                } else {
                    answer = num1 - num2;
                }
                break;
            case '×': answer = num1 * num2; break;
            default: answer = num1 + num2;
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
        setLives(3); // Reset mạng khi bắt đầu game mới
        setGameState('playing');
        prepareNewRound();
    }, [prepareNewRound]);

    // LOGIC MỚI: Xử lý khi qua màn (về đích)
    useEffect(() => {
        if (playerPosition >= 100 && gameState === 'playing') {
            setGameState('levelComplete'); // Chuyển sang trạng thái chờ qua màn
            toast.success(`🎉 Hoàn thành Cấp độ ${level}!`, { duration: 2500 });

            setTimeout(() => {
                setLevel(prevLevel => prevLevel + 1);
                setPlayerPosition(0); // Reset vị trí cho màn mới
                setScore(prevScore => prevScore + 100 * level); // Thưởng điểm qua màn
                prepareNewRound();
                setGameState('playing'); // Tiếp tục game ở màn mới
            }, 2500);
        }
    }, [playerPosition, gameState, level, prepareNewRound]);

    const handleAnswerClick = (answer) => {
        // Không cho phép trả lời khi đang trong trạng thái chuyển màn hoặc game đã kết thúc
        if (gameState !== 'playing') return;

        if (answer === question.answer) {
            setFeedback('correct');
            setPlayerPosition(prev => Math.min(prev + 15, 100));
            setScore(prevScore => prevScore + 10);
            
            // Chuẩn bị câu hỏi mới sau một khoảng trễ ngắn
            setTimeout(prepareNewRound, 400);
        } else {
            // LOGIC MỚI: Trừ mạng khi trả lời sai
            setFeedback('incorrect');
            toast.error('Sai rồi, -1 mạng!', { icon: '💔' });
            setLives(prevLives => {
                const newLives = prevLives - 1;
                if (newLives <= 0) {
                    setGameState('gameOver'); // Game kết thúc khi hết mạng
                }
                return newLives;
            });
        }

        setTimeout(() => setFeedback(''), 500);
    };

    if (gameState === 'menu') {
        return (
            <div className="text-center p-8 bg-gray-900 text-white rounded-lg w-full max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold mb-4">Cuộc Đua Xuyên Không 🚀</h2>
                <p className="mb-6">Trả lời đúng để về đích. Hết mạng sẽ thua cuộc!</p>
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
            <div className={`relative w-full max-w-4xl h-[600px] game-container-race border-2 border-purple-500 overflow-hidden rounded-lg mx-auto transition-all duration-300 ${feedback === 'correct' ? 'feedback-correct' : ''} ${feedback === 'incorrect' ? 'feedback-incorrect' : ''}`}>
                {gameState === 'gameOver' && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center z-20">
                        <h2 className="text-6xl font-bold mb-4 text-white">Hết Lượt!</h2>
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
                    {/* UI MỚI: Hiển thị số mạng còn lại */}
                    <div className="text-2xl font-bold">Mạng: <span className="text-red-500 text-3xl">{'♥'.repeat(lives)}</span></div>
                </div>

                <div className="w-full h-full flex flex-col justify-center items-center space-y-12">
                    <div className="w-[90%] bg-white/10 h-8 rounded-full border-2 border-purple-400 p-1">
                        <div className="relative h-full">
                            <div className="absolute -top-6 -left-2 text-4xl spaceship-race" style={{ left: `${playerPosition}%`}}>
                                🛸
                            </div>
                            <div className="absolute -top-2 right-0 text-3xl">🏁</div>
                        </div>
                    </div>

                    {question && (gameState === 'playing' || gameState === 'levelComplete') && (
                        <div className="text-center">
                            <p className="text-5xl font-bold text-white mb-8 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{question.text} = ?</p>
                            <div className="grid grid-cols-2 gap-4">
                                {answers.map((ans, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswerClick(ans)}
                                    disabled={gameState !== 'playing'} // Vô hiệu hóa nút khi đang chuyển màn
                                    className="px-8 py-4 bg-purple-600 text-white text-3xl font-bold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
    lives: 20,
    startingGold: 150,
    towerCost: 50,
    towerRange: 120,
    towerDamage: 10,
    towerFireRate: 800, // Bắn nhanh hơn một chút
    gameScreenWidth: 896,
    gameScreenHeight: 600,
};

// ĐỊNH NGHĨA ĐƯỜNG ĐI ZIC-ZAC CỦA QUÁI VẬT (Hệ tọa độ)
const PATH_WAYPOINTS = [
    { x: -50, y: 100 },
    { x: 200, y: 100 },
    { x: 200, y: 450 },
    { x: 700, y: 450 },
    { x: 700, y: 200 },
    { x: GAME_CONFIG.gameScreenWidth + 50, y: 200 },
];

// ĐỊNH NGHĨA CÁC LOẠI QUÁI VẬT
const ENEMY_TYPES = {
    standard: { health: 60, speed: 1.2, gold: 10, icon: '👽' },
    fast: { health: 30, speed: 2.5, gold: 8, icon: '👾' },
    tank: { health: 250, speed: 0.8, gold: 25, icon: '🤖' },
};

// ĐỊNH NGHĨA CÁC ĐỢT QUÁI (WAVES) PHỨC TẠP HƠN
const WAVES = [
    { enemies: Array(8).fill('standard') },
    { enemies: [...Array(10).fill('standard'), ...Array(5).fill('fast')] },
    { enemies: [...Array(15).fill('standard'), { type: 'tank', delay: 5000 }] },
    { enemies: [...Array(10).fill('fast'), ...Array(10).fill('standard'), { type: 'tank', delay: 2000 }] },
    { enemies: [...Array(15).fill('fast'), ...Array(3).fill('tank')] },
    { enemies: [...Array(10).fill('standard'), ...Array(10).fill('fast'), ...Array(5).fill('tank')] },
];

// SỬA LỖI: Đổi tên component style để tránh trùng lặp
const TowerDefenseGameStyles = () => (
    <style>{`
      .game-container-td {
        background: #0a0a1f;
        background-image: 
          radial-gradient(circle at 25% 25%, #1a1a3a 1px, transparent 1px),
          radial-gradient(circle at 75% 75%, #1a1a3a 1px, transparent 1px);
        background-size: 40px 40px;
      }
    `}</style>
);


const PhongTuyenNganHa = ({ onBack }) => {
    const [gameState, setGameState] = useState('menu');
    const [lives, setLives] = useState(GAME_CONFIG.lives);
    const [gold, setGold] = useState(GAME_CONFIG.startingGold);
    const [wave, setWave] = useState(0);
    const [towers, setTowers] = useState([]);
    const [enemies, setEnemies] = useState([]);
    const [projectiles, setProjectiles] = useState([]);
    
    // State mới cho chế độ xây dựng
    const [isBuilding, setIsBuilding] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [buildPrompt, setBuildPrompt] = useState(null);

    const stateRef = useRef();
    useEffect(() => {
        stateRef.current = { enemies, towers, wave, gold, lives, isBuilding };
    });

    const startGame = useCallback(() => {
        setLives(GAME_CONFIG.lives);
        setGold(GAME_CONFIG.startingGold);
        setWave(0);
        setTowers([]);
        setEnemies([]);
        setProjectiles([]);
        setIsBuilding(false);
        setBuildPrompt(null);
        setGameState('playing');
    }, []);

    // Hàm kiểm tra vị trí xây tháp có hợp lệ không
    const isValidPlacement = (x, y) => {
        // Kiểm tra khoảng cách với đường đi
        for (let i = 0; i < PATH_WAYPOINTS.length - 1; i++) {
            const p1 = PATH_WAYPOINTS[i];
            const p2 = PATH_WAYPOINTS[i+1];
            const l2 = Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
            if (l2 === 0) continue;
            let t = ((x - p1.x) * (p2.x - p1.x) + (y - p1.y) * (p2.y - p1.y)) / l2;
            t = Math.max(0, Math.min(1, t));
            const nearestX = p1.x + t * (p2.x - p1.x);
            const nearestY = p1.y + t * (p2.y - p1.y);
            const dist = Math.sqrt(Math.pow(x - nearestX, 2) + Math.pow(y - nearestY, 2));
            if (dist < 40) return false; // Quá gần đường đi
        }
        // Kiểm tra khoảng cách với các tháp khác
        for (const tower of towers) {
            const dist = Math.sqrt(Math.pow(x - tower.x, 2) + Math.pow(y - tower.y, 2));
            if (dist < 50) return false; // Quá gần tháp khác
        }
        return true;
    };

    const handleAttemptBuild = (e) => {
        const { isBuilding, gold } = stateRef.current;
        if (!isBuilding) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (!isValidPlacement(x, y)) {
            toast.error("Không thể xây ở vị trí này!");
            return;
        }

        if (gold < GAME_CONFIG.towerCost) {
            toast.error("Không đủ vàng!");
            setIsBuilding(false);
            return;
        }
        
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const question = { text: `${num1} + ${num2} = ?`, answer: num1 + num2 };
        
        let answers = new Set([question.answer]);
        while(answers.size < 3) {
            const wrong = question.answer + Math.floor(Math.random() * 8) - 4;
            if (wrong !== question.answer) answers.add(wrong);
        }

        setBuildPrompt({ x, y, question, answers: Array.from(answers).sort(() => Math.random() - 0.5) });
    };

    const handleAnswerBuild = (answer) => {
        if (answer === buildPrompt.question.answer) {
            toast.success("Xây tháp thành công!");
            setGold(g => g - GAME_CONFIG.towerCost);
            setTowers(t => [...t, { id: Date.now(), x: buildPrompt.x, y: buildPrompt.y, lastFired: 0 }]);
        } else {
            toast.error("Sai rồi, không thể xây tháp!");
        }
        setBuildPrompt(null);
        setIsBuilding(false);
    };

    // Game Loop chính
    useEffect(() => {
        if (gameState !== 'playing') return;

        const interval = setInterval(() => {
            const { enemies, towers, wave } = stateRef.current;
            let livesLost = 0;
            let goldEarned = 0;
            const newProjectiles = [];
            
            const updatedEnemies = enemies.map(enemy => {
                const targetWaypoint = PATH_WAYPOINTS[enemy.waypointIndex];
                const dx = targetWaypoint.x - enemy.x;
                const dy = targetWaypoint.y - enemy.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < enemy.speed) {
                    enemy.waypointIndex++;
                    if (enemy.waypointIndex >= PATH_WAYPOINTS.length) {
                        livesLost++;
                        return null;
                    }
                } else {
                    enemy.x += (dx / distance) * enemy.speed;
                    enemy.y += (dy / distance) * enemy.speed;
                }
                return enemy;
            }).filter(Boolean);

            const now = Date.now();
            const updatedTowers = towers.map(tower => {
                if (now - tower.lastFired < GAME_CONFIG.towerFireRate) return tower;
                const target = updatedEnemies.find(enemy => 
                    Math.sqrt(Math.pow(tower.x - enemy.x, 2) + Math.pow(tower.y - enemy.y, 2)) <= GAME_CONFIG.towerRange && enemy.health > 0
                );
                if (target) {
                    newProjectiles.push({ id: Math.random(), from: {x: tower.x, y: tower.y}, to: {x: target.x, y: target.y} });
                    target.health -= GAME_CONFIG.towerDamage;
                    return { ...tower, lastFired: now };
                }
                return tower;
            });
            setTowers(updatedTowers);

            const finalEnemies = updatedEnemies.filter(e => {
                if (e.health <= 0) {
                    goldEarned += e.gold;
                    return false;
                }
                return true;
            });
            
            setEnemies(finalEnemies);
            if (livesLost > 0) setLives(l => Math.max(0, l - livesLost));
            if (goldEarned > 0) setGold(g => g + goldEarned);

            if (newProjectiles.length > 0) {
                setProjectiles(p => [...p, ...newProjectiles]);
                setTimeout(() => setProjectiles(p => p.slice(newProjectiles.length)), 100);
            }

            if (finalEnemies.length === 0 && wave < WAVES.length) {
                const nextWaveConfig = WAVES[wave];
                let spawnDelay = 0;
                nextWaveConfig.enemies.forEach((enemyType, i) => {
                    const type = typeof enemyType === 'string' ? enemyType : enemyType.type;
                    const enemyData = ENEMY_TYPES[type];
                    if (typeof enemyType === 'object' && enemyType.delay) spawnDelay += enemyType.delay;
                    
                    setTimeout(() => {
                         setEnemies(currentEnemies => [
                            ...currentEnemies,
                            {
                                id: `w${wave}-e${i}`, x: PATH_WAYPOINTS[0].x, y: PATH_WAYPOINTS[0].y,
                                waypointIndex: 1, ...enemyData
                            }
                        ]);
                    }, spawnDelay);
                    spawnDelay += 500;
                });
                setWave(w => w + 1);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [gameState]);

    useEffect(() => {
        if (lives <= 0) setGameState('gameOver');
        if (wave === WAVES.length && enemies.length === 0 && gameState === 'playing') setGameState('victory');
    }, [lives, wave, enemies, gameState]);

    const handleMouseMove = (e) => {
        if (!isBuilding) return;
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

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

    if (gameState === 'gameOver' || gameState === 'victory') {
        return (
            <div className="relative w-full max-w-4xl h-[600px] game-container-td border-2 border-purple-500 rounded-lg mx-auto flex justify-center items-center">
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
        <div className="flex flex-col items-center">
            {/* SỬA LỖI: Sử dụng component style đã được đổi tên */}
            <TowerDefenseGameStyles />
            <div 
                className="relative w-full max-w-4xl h-[600px] game-container-td border-2 border-purple-500 overflow-hidden rounded-lg mx-auto select-none cursor-default"
                onClick={handleAttemptBuild}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsBuilding(false)}
            >
                <div className="absolute top-0 left-0 right-0 p-4 bg-black/50 text-white flex justify-between items-center z-30">
                    <div className="text-xl font-bold">❤️ Mạng: <span className="text-red-400">{lives}</span></div>
                    <div className="text-xl font-bold">💰 Vàng: <span className="text-yellow-400">{gold}</span></div>
                    <div className="text-xl font-bold">🌊 Wave: <span className="text-blue-400">{wave} / {WAVES.length}</span></div>
                </div>

                <div className="absolute bottom-4 left-4 z-30">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsBuilding(true); }}
                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 disabled:bg-gray-500"
                        disabled={gold < GAME_CONFIG.towerCost || isBuilding}
                    >
                        Xây Tháp ({GAME_CONFIG.towerCost}💰)
                    </button>
                </div>

                <svg className="absolute w-full h-full top-0 left-0 pointer-events-none z-0">
                    <polyline
                        points={PATH_WAYPOINTS.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke="#4c1d95"
                        strokeWidth="30"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                    <polyline
                        points={PATH_WAYPOINTS.map(p => `${p.x},${p.y}`).join(' ')}
                        fill="none"
                        stroke="#a78bfa"
                        strokeWidth="2"
                        strokeDasharray="10 5"
                    />
                </svg>
                <div className="absolute text-5xl animate-pulse z-10" style={{top: `${PATH_WAYPOINTS[PATH_WAYPOINTS.length-1].y - 35}px`, left: `${PATH_WAYPOINTS[PATH_WAYPOINTS.length-1].x - 50}px`}}>🏠</div>

                {towers.map(tower => <div key={tower.id} className="absolute text-4xl z-10" style={{left: `${tower.x-20}px`, top: `${tower.y-25}px`}}>🛰️</div>)}
                
                {enemies.map(enemy => (
                    <div key={enemy.id} className="absolute z-20" style={{left: `${enemy.x-15}px`, top: `${enemy.y-25}px`}}>
                        <span className="text-3xl">{enemy.icon}</span>
                        <div className="w-8 h-1.5 bg-red-800 rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{width: `${(enemy.health / ENEMY_TYPES[Object.keys(ENEMY_TYPES).find(k => ENEMY_TYPES[k].icon === enemy.icon)].health) * 100}%`}}></div>
                        </div>
                    </div>
                ))}
                
                <svg className="absolute w-full h-full top-0 left-0 pointer-events-none z-20">
                    {projectiles.map(p => <line key={p.id} x1={p.from.x} y1={p.from.y} x2={p.to.x} y2={p.to.y} stroke="#00ffff" strokeWidth="2" />)}
                </svg>

                {isBuilding && (
                    <div 
                        className="absolute rounded-full pointer-events-none z-40"
                        style={{
                            left: mousePos.x,
                            top: mousePos.y,
                            width: GAME_CONFIG.towerRange * 2,
                            height: GAME_CONFIG.towerRange * 2,
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: isValidPlacement(mousePos.x, mousePos.y) ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
                            border: `2px dashed ${isValidPlacement(mousePos.x, mousePos.y) ? 'lightgreen' : 'red'}`
                        }}
                    >
                        <div className="absolute text-4xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">🛰️</div>
                    </div>
                )}

                {buildPrompt && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-50">
                        <div className="bg-gray-800 p-8 rounded-lg text-white text-center shadow-2xl">
                            <h3 className="text-3xl font-bold mb-4">Trả lời để xây tháp!</h3>
                            <p className="text-4xl mb-6">{buildPrompt.question.text}</p>
                            <div className="flex gap-4">
                                {buildPrompt.answers.map(ans => <button key={ans} onClick={() => handleAnswerBuild(ans)} className="px-6 py-3 bg-purple-600 rounded-lg font-bold text-2xl hover:bg-purple-700">{ans}</button>)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
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
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
            toast.error('Vui lòng đăng nhập!');
            navigate('/login');
            return;
        }
        setUser(currentUser);
    }, [navigate]);

    const handleSelectGame = (gameId) => {
        setActiveGameId(gameId);
    };

    const handleBackToMenu = () => {
        setActiveGameId(null);
    };

    // Tìm component game tương ứng với ID đang được chọn
    const ActiveGame = GAMES.find(g => g.id === activeGameId)?.component;

    return (
        <div className="min-h-screen bg-gray-900">
            <AuthenticatedNavbar user={user} />
            <div className="pt-20 flex justify-center items-center min-h-screen">
                {/* SỬA LỖI: Thêm lại logic kiểm tra bằng toán tử ba ngôi (? :)
                  - Nếu `ActiveGame` có tồn tại (người dùng đã chọn game), thì hiển thị game đó.
                  - Nếu không, thì hiển thị GameMenu.
                */}
                {ActiveGame ? (
                    <div className="relative w-full max-w-4xl">

                        <ActiveGame onBack={handleBackToMenu} />
                    </div>
                ) : (
                    <GameMenu onSelectGame={handleSelectGame} />
                )}
            </div>
        </div>
    );
};

export default GamePage;