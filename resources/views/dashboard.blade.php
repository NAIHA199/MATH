<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Học Toán Vui</title>
    <style>
        * {
            box-sizing: border-box;
            font-family: 'Segoe UI', sans-serif;
        }

        body {
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }

        .header {
            background: rgba(255, 255, 255, 0.95);
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #333;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        .user-role {
            background: #4CAF50;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }

        .logout-btn {
            padding: 8px 16px;
            background: #f44336;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
        }

        .logout-btn:hover {
            background: #d32f2f;
        }

        .container {
            max-width: 1200px;
            margin: 40px auto;
            padding: 0 20px;
        }

        .welcome-card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }

        .welcome-title {
            font-size: 28px;
            color: #333;
            margin-bottom: 10px;
        }

        .welcome-subtitle {
            color: #666;
            font-size: 16px;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-top: 30px;
        }

        .feature-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            transition: transform 0.3s ease;
        }

        .feature-card:hover {
            transform: translateY(-5px);
        }

        .feature-icon {
            font-size: 40px;
            margin-bottom: 15px;
        }

        .feature-title {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }

        .feature-description {
            color: #666;
            line-height: 1.6;
        }

        .alert {
            background-color: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 6px;
            margin-bottom: 20px;
        }

        @media (max-width: 768px) {
            .header {
                padding: 15px 20px;
                flex-direction: column;
                gap: 15px;
            }

            .user-info {
                flex-direction: column;
                gap: 10px;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">Học Toán Vui</div>
        <div class="user-info">
            <span>Xin chào, {{ Auth::user()->name }}</span>
            <span class="user-role">{{ Auth::user()->role_display_name }}</span>
            <form method="POST" action="{{ route('logout') }}" style="display: inline;">
                @csrf
                <button type="submit" class="logout-btn">Đăng xuất</button>
            </form>
        </div>
    </div>

    <div class="container">
        @if(session('success'))
            <div class="alert">{{ session('success') }}</div>
        @endif

        <div class="welcome-card">
            <h1 class="welcome-title">Chào mừng bạn đến với Học Toán Vui!</h1>
            <p class="welcome-subtitle">Bắt đầu hành trình học toán thông minh và thú vị ngay hôm nay.</p>
        </div>

        <div class="features-grid">
            @if(Auth::user()->isStudent())
                <div class="feature-card">
                    <div class="feature-icon">🎯</div>
                    <h3 class="feature-title">Bài Tập Toán</h3>
                    <p class="feature-description">Thực hành với các bài tập toán từ cơ bản đến nâng cao, phù hợp với trình độ của bạn.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🏆</div>
                    <h3 class="feature-title">Thành Tích</h3>
                    <p class="feature-description">Theo dõi tiến độ học tập và nhận huy chương cho những thành tích xuất sắc.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎮</div>
                    <h3 class="feature-title">Trò Chơi Toán Học</h3>
                    <p class="feature-description">Học toán qua các trò chơi thú vị và tương tác, giúp việc học trở nên sinh động.</p>
                </div>
            @elseif(Auth::user()->isTeacher())
                <div class="feature-card">
                    <div class="feature-icon">📚</div>
                    <h3 class="feature-title">Quản Lý Lớp Học</h3>
                    <p class="feature-description">Tạo và quản lý lớp học, theo dõi tiến độ của học sinh một cách dễ dàng.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h3 class="feature-title">Báo Cáo Chi Tiết</h3>
                    <p class="feature-description">Xem báo cáo chi tiết về hiệu suất học tập của từng học sinh và cả lớp.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">✏️</div>
                    <h3 class="feature-title">Tạo Bài Tập</h3>
                    <p class="feature-description">Tạo các bài tập toán tùy chỉnh phù hợp với chương trình giảng dạy của bạn.</p>
                </div>
            @elseif(Auth::user()->isParent())
                <div class="feature-card">
                    <div class="feature-icon">👨‍👩‍👧‍👦</div>
                    <h3 class="feature-title">Theo Dõi Con</h3>
                    <p class="feature-description">Theo dõi tiến độ học tập của con bạn và nhận báo cáo định kỳ.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📈</div>
                    <h3 class="feature-title">Thống Kê Học Tập</h3>
                    <p class="feature-description">Xem thống kê chi tiết về điểm mạnh và điểm cần cải thiện của con.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">💬</div>
                    <h3 class="feature-title">Liên Lạc Giáo Viên</h3>
                    <p class="feature-description">Giao tiếp trực tiếp với giáo viên để trao đổi về tình hình học tập của con.</p>
                </div>
            @endif
        </div>
    </div>
</body>
</html>