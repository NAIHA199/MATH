# Học Toán Vui - Ứng dụng học toán Laravel

Ứng dụng web học toán thông minh và thú vị được xây dựng bằng Laravel.

## Tính năng

- ✅ Đăng ký/Đăng nhập với 3 vai trò: Học sinh, Giáo viên, Phụ huynh
- ✅ Dashboard cá nhân cho từng vai trò
- ✅ Game toán học tương tác với các phép tính cơ bản
- ✅ Hồ sơ cá nhân và cập nhật thông tin
- ✅ Giao diện responsive và thân thiện

## Yêu cầu hệ thống

- PHP >= 8.1
- Composer
- MySQL/MariaDB
- Web server (Apache/Nginx) hoặc PHP built-in server

## Cài đặt

### 1. Clone dự án
```bash
git clone <repository-url>
cd hoc-toan-vui
```

### 2. Cài đặt dependencies
```bash
composer install
```

### 3. Tạo file .env
```bash
cp .env.example .env
```

### 4. Cấu hình database trong file .env
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=math_learning
DB_USERNAME=root
DB_PASSWORD=your_password
```

### 5. Tạo application key
```bash
php artisan key:generate
```

### 6. Chạy migration để tạo database
```bash
php artisan migrate
```

## Chạy ứng dụng

### Cách 1: Sử dụng PHP built-in server (cho development)
```bash
php artisan serve
```
Ứng dụng sẽ chạy tại: http://localhost:8000

### Cách 2: Sử dụng web server (Apache/Nginx)

#### Với Apache:
1. Tạo virtual host trỏ đến thư mục `public/`
2. Đảm bảo mod_rewrite được bật

#### Với Nginx:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/project/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## Cấu trúc dự án

```
├── app/
│   ├── Http/Controllers/
│   │   ├── AuthController.php      # Xử lý đăng nhập/đăng ký
│   │   ├── DashboardController.php # Xử lý dashboard
│   │   └── GameController.php      # Xử lý game toán
│   ├── Models/
│   │   └── User.php               # Model User
│   └── Providers/                 # Service Providers
├── config/
│   └── app.php                    # Cấu hình ứng dụng
├── database/
│   └── migrations/                # Database migrations
├── public/                        # Thư mục public
├── resources/
│   └── views/                     # Blade templates
│       ├── welcome.blade.php      # Trang chủ
│       ├── dashboard.blade.php    # Dashboard
│       ├── profile.blade.php      # Hồ sơ cá nhân
│       └── game/
│           └── index.blade.php    # Game toán
├── routes/
│   └── web.php                    # Web routes
└── composer.json
```

## Sử dụng

1. Truy cập http://localhost:8000
2. Đăng ký tài khoản mới với vai trò mong muốn
3. Đăng nhập và bắt đầu sử dụng các tính năng

## Tính năng chính

### Đăng ký/Đăng nhập
- Hỗ trợ 3 vai trò: Học sinh, Giáo viên, Phụ huynh
- Validation đầy đủ cho form đăng ký
- Xử lý lỗi và thông báo

### Dashboard
- Hiển thị thông tin cá nhân
- Menu điều hướng theo vai trò
- Thống kê học tập (có thể mở rộng)

### Game Toán
- 4 phép tính: Cộng, Trừ, Nhân, Chia
- 3 mức độ: Dễ, Trung bình, Khó
- Tính điểm và phản hồi tức thì
- Giao diện tương tác thân thiện

### Hồ sơ cá nhân
- Xem và cập nhật thông tin
- Hiển thị vai trò và ngày tham gia
- Validation khi cập nhật

## Phát triển thêm

Để mở rộng ứng dụng, bạn có thể:

1. Thêm tính năng lưu điểm số và lịch sử chơi
2. Tạo hệ thống bài tập và kiểm tra
3. Thêm tính năng chat hoặc forum
4. Tích hợp video bài giảng
5. Thêm tính năng báo cáo tiến độ cho phụ huynh

## Troubleshooting

### Lỗi thường gặp:

1. **Lỗi permission**: Đảm bảo thư mục `storage/` và `bootstrap/cache/` có quyền ghi
2. **Lỗi database**: Kiểm tra cấu hình database trong `.env`
3. **Lỗi 500**: Kiểm tra log trong `storage/logs/laravel.log`

### Lệnh hữu ích:

```bash
# Xóa cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Tạo lại database
php artisan migrate:fresh

# Xem routes
php artisan route:list
```

## License

MIT License 