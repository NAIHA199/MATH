<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Học Toán Vui</title>
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

        .user-info {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .user-role {
            background: #4CAF50;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
        }

        .logout-btn {
            background: #dc3545;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: 0.3s;
        }

        .logout-btn:hover {
            background: #c82333;
        }

        .container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .welcome-section {
            background: white;
            border-radius: 10px;
            padding: 2rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .welcome-title {
            font-size: 2rem;
            color: #333;
            margin-bottom: 0.5rem;
        }

        .welcome-subtitle {
            color: #666;
            font-size: 1.1rem;
        }

        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .card {
            background: white;
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }

        .card:hover {
            transform: translateY(-5px);
        }

        .card-title {
            font-size: 1.5rem;
            color: #333;
            margin-bottom: 1rem;
        }

        .card-description {
            color: #666;
            margin-bottom: 1.5rem;
        }

        .btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            transition: 0.3s;
        }

        .btn:hover {
            background: #45a049;
        }

        .btn-secondary {
            background: #6c757d;
        }

        .btn-secondary:hover {
            background: #5a6268;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
        }

        .stat-item {
            text-align: center;
            padding: 1rem;
            background: #f8f9fa;
            border-radius: 5px;
        }

        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #4CAF50;
        }

        .stat-label {
            color: #666;
            font-size: 0.9rem;
        }

        @media (max-width: 768px) {
            .dashboard-grid {
                grid-template-columns: 1fr;
            }
            
            .header {
                flex-direction: column;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="logo">Học Toán Vui</div>
        <div class="user-info">
            <span>Xin chào, {{ $user->name }}</span>
            <span class="user-role">{{ $user->role_display_name }}</span>
            <form method="POST" action="{{ route('logout') }}" style="display: inline;">
                @csrf
                <button type="submit" class="logout-btn">Đăng xuất</button>
            </form>
        </div>
    </header>

    <div class="container">
        <div class="welcome-section">
            <h1 class="welcome-title">Chào mừng trở lại, {{ $user->name }}!</h1>
            <p class="welcome-subtitle">Bạn đang đăng nhập với vai trò: {{ $user->role_display_name }}</p>
            
            @if(session('success'))
                <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; margin-top: 1rem;">
                    {{ session('success') }}
                </div>
            @endif
        </div>

        <div class="dashboard-grid">
            <div class="card">
                <h3 class="card-title">🎮 Chơi Game Toán</h3>
                <p class="card-description">Thực hành các phép tính cơ bản với game tương tác thú vị</p>
                <a href="{{ route('game') }}" class="btn">Bắt đầu chơi</a>
            </div>

            <div class="card">
                <h3 class="card-title">📊 Thống kê học tập</h3>
                <p class="card-description">Xem tiến độ và thành tích học tập của bạn</p>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Điểm số</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Bài đã làm</div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3 class="card-title">👤 Hồ sơ cá nhân</h3>
                <p class="card-description">Cập nhật thông tin cá nhân và tài khoản</p>
                <a href="{{ route('profile') }}" class="btn btn-secondary">Xem hồ sơ</a>
            </div>

            @if($user->isTeacher())
            <div class="card">
                <h3 class="card-title">👨‍🏫 Quản lý lớp học</h3>
                <p class="card-description">Tạo và quản lý lớp học, theo dõi học sinh</p>
                <a href="#" class="btn btn-secondary">Quản lý lớp</a>
            </div>
            @endif

            @if($user->isParent())
            <div class="card">
                <h3 class="card-title">👨‍👩‍👧‍👦 Theo dõi con</h3>
                <p class="card-description">Xem tiến độ học tập của con em</p>
                <a href="#" class="btn btn-secondary">Xem tiến độ</a>
            </div>
            @endif
        </div>
    </div>
</body>
</html> 