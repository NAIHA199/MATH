<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hồ sơ - Học Toán Vui</title>
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
            max-width: 600px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .profile-card {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .profile-title {
            font-size: 2rem;
            color: #333;
            margin-bottom: 2rem;
            text-align: center;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-label {
            display: block;
            margin-bottom: 0.5rem;
            color: #333;
            font-weight: bold;
        }

        .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            transition: 0.3s;
        }

        .form-input:focus {
            outline: none;
            border-color: #4CAF50;
        }

        .form-input[readonly] {
            background-color: #f8f9fa;
            color: #666;
        }

        .btn {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1rem;
            transition: 0.3s;
            width: 100%;
        }

        .btn:hover {
            background: #45a049;
        }

        .alert {
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 1rem;
        }

        .alert-success {
            background: #d4edda;
            color: #155724;
        }

        .alert-danger {
            background: #f8d7da;
            color: #721c24;
        }

        .error-message {
            color: #dc3545;
            font-size: 0.9rem;
            margin-top: 0.25rem;
        }

        .user-info {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 5px;
            margin-bottom: 2rem;
        }

        .info-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
        }

        .info-label {
            font-weight: bold;
            color: #333;
        }

        .info-value {
            color: #666;
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="logo">Học Toán Vui</div>
        <a href="{{ route('dashboard') }}" class="back-btn">← Quay lại Dashboard</a>
    </header>

    <div class="container">
        <div class="profile-card">
            <h1 class="profile-title">👤 Hồ sơ cá nhân</h1>
            
            @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif

            <div class="user-info">
                <div class="info-item">
                    <span class="info-label">Vai trò:</span>
                    <span class="info-value">{{ $user->role_display_name }}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Ngày tham gia:</span>
                    <span class="info-value">{{ $user->created_at->format('d/m/Y') }}</span>
                </div>
            </div>

            <form method="POST" action="{{ route('profile.update') }}">
                @csrf
                @method('PUT')
                
                <div class="form-group">
                    <label class="form-label">Họ và tên</label>
                    <input type="text" name="name" value="{{ old('name', $user->name) }}" class="form-input" required>
                    @error('name')
                        <div class="error-message">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" name="email" value="{{ old('email', $user->email) }}" class="form-input" required>
                    @error('email')
                        <div class="error-message">{{ $message }}</div>
                    @enderror
                </div>

                <div class="form-group">
                    <label class="form-label">Vai trò (chỉ đọc)</label>
                    <input type="text" value="{{ $user->role_display_name }}" class="form-input" readonly>
                </div>

                <button type="submit" class="btn">Cập nhật thông tin</button>
            </form>
        </div>
    </div>
</body>
</html> 