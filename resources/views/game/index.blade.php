<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Game Toán - Học Toán Vui</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', sans-serif;
        }

        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            padding: 1rem 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
        }

        .back-btn {
            background: #6c757d;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            transition: 0.3s;
        }

        .back-btn:hover {
            background: #5a6268;
        }

        .container {
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .game-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
        }

        .game-title {
            font-size: 2rem;
            color: #333;
            margin-bottom: 1rem;
        }

        .game-controls {
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .control-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
        }

        .control-label {
            font-weight: bold;
            color: #333;
        }

        .control-select {
            padding: 0.5rem;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }

        .start-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: 0.3s;
        }

        .start-btn:hover {
            background: #45a049;
        }

        .game-area {
            margin-top: 2rem;
            padding: 2rem;
            background: #f8f9fa;
            border-radius: 10px;
            display: none;
        }

        .question {
            font-size: 3rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 2rem;
        }

        .answer-input {
            font-size: 2rem;
            padding: 1rem;
            border: 3px solid #ddd;
            border-radius: 10px;
            text-align: center;
            width: 200px;
            margin-bottom: 1rem;
        }

        .answer-input:focus {
            outline: none;
            border-color: #4CAF50;
        }

        .submit-btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1.2rem;
            transition: 0.3s;
        }

        .submit-btn:hover {
            background: #45a049;
        }

        .score-display {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 1rem;
        }

        .message {
            padding: 1rem;
            border-radius: 5px;
            margin: 1rem 0;
            font-weight: bold;
        }

        .message.success {
            background: #d4edda;
            color: #155724;
        }

        .message.error {
            background: #f8d7da;
            color: #721c24;
        }

        .next-btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: 0.3s;
            display: none;
        }

        .next-btn:hover {
            background: #0056b3;
        }

        @media (max-width: 768px) {
            .game-controls {
                flex-direction: column;
                align-items: center;
            }
            
            .question {
                font-size: 2rem;
            }
            
            .answer-input {
                font-size: 1.5rem;
                width: 150px;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="logo">Học Toán Vui</div>
        <a href="{{ route('dashboard') }}" class="back-btn">← Quay lại Dashboard</a>
    </header>

    <div class="container">
        <div class="game-card">
            <h1 class="game-title">🎮 Game Toán Học</h1>
            
            <div class="game-controls">
                <div class="control-group">
                    <label class="control-label">Độ khó:</label>
                    <select id="levelSelect" class="control-select">
                        <option value="easy">Dễ</option>
                        <option value="medium">Trung bình</option>
                        <option value="hard">Khó</option>
                    </select>
                </div>
                
                <div class="control-group">
                    <label class="control-label">Phép tính:</label>
                    <select id="operationSelect" class="control-select">
                        <option value="addition">Cộng (+)</option>
                        <option value="subtraction">Trừ (-)</option>
                        <option value="multiplication">Nhân (×)</option>
                        <option value="division">Chia (÷)</option>
                    </select>
                </div>
                
                <div class="control-group">
                    <button id="startBtn" class="start-btn">Bắt đầu chơi</button>
                </div>
            </div>

            <div id="gameArea" class="game-area">
                <div class="score-display">Điểm: <span id="score">0</span></div>
                <div id="question" class="question"></div>
                <input type="number" id="answerInput" class="answer-input" placeholder="Nhập đáp án">
                <button id="submitBtn" class="submit-btn">Kiểm tra</button>
                <div id="message"></div>
                <button id="nextBtn" class="next-btn">Câu tiếp theo</button>
            </div>
        </div>
    </div>

    <script>
        let currentScore = 0;
        let currentQuestion = null;
        let currentAnswer = null;

        document.getElementById('startBtn').addEventListener('click', startGame);
        document.getElementById('submitBtn').addEventListener('click', checkAnswer);
        document.getElementById('nextBtn').addEventListener('click', nextQuestion);
        document.getElementById('answerInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkAnswer();
            }
        });

        function startGame() {
            const level = document.getElementById('levelSelect').value;
            const operation = document.getElementById('operationSelect').value;
            
            fetch('{{ route("game.start") }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({
                    level: level,
                    operation: operation
                })
            })
            .then(response => response.json())
            .then(data => {
                currentQuestion = data.question;
                currentAnswer = data.answer;
                
                document.getElementById('question').textContent = currentQuestion;
                document.getElementById('gameArea').style.display = 'block';
                document.getElementById('answerInput').value = '';
                document.getElementById('answerInput').focus();
                document.getElementById('message').innerHTML = '';
                document.getElementById('nextBtn').style.display = 'none';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra khi bắt đầu game!');
            });
        }

        function checkAnswer() {
            const userAnswer = document.getElementById('answerInput').value;
            
            if (!userAnswer) {
                showMessage('Vui lòng nhập đáp án!', 'error');
                return;
            }

            fetch('{{ route("game.check") }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({
                    answer: userAnswer,
                    correct_answer: currentAnswer,
                    score: currentScore
                })
            })
            .then(response => response.json())
            .then(data => {
                currentScore = data.score;
                document.getElementById('score').textContent = currentScore;
                
                if (data.correct) {
                    showMessage(data.message, 'success');
                    document.getElementById('nextBtn').style.display = 'inline-block';
                    document.getElementById('submitBtn').style.display = 'none';
                } else {
                    showMessage(data.message, 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('Có lỗi xảy ra khi kiểm tra đáp án!', 'error');
            });
        }

        function nextQuestion() {
            document.getElementById('submitBtn').style.display = 'inline-block';
            document.getElementById('nextBtn').style.display = 'none';
            startGame();
        }

        function showMessage(message, type) {
            const messageDiv = document.getElementById('message');
            messageDiv.textContent = message;
            messageDiv.className = `message ${type}`;
        }
    </script>
</body>
</html> 