# Học Toán Vui - Vietnamese Math Learning Platform

A modern web application for learning mathematics in Vietnamese, designed for students, teachers, and parents.

## Features

- **Multi-role Authentication**: Support for Students, Teachers, and Parents
- **Responsive Design**: Modern, mobile-friendly interface
- **Vietnamese Language**: Fully localized for Vietnamese users
- **Role-based Dashboard**: Different features for each user type
- **Modern UI/UX**: Clean, intuitive design with smooth animations

## User Roles

### Students (Học Sinh)
- Practice math exercises
- Track learning progress
- Earn achievements
- Play educational math games

### Teachers (Giáo Viên)
- Manage classes
- Create custom exercises
- View detailed student reports
- Monitor class performance

### Parents (Phụ Huynh)
- Track child's progress
- View learning statistics
- Communicate with teachers
- Receive progress reports

## Requirements

- PHP 8.1 or higher
- Composer
- MySQL/PostgreSQL database
- Web server (Apache/Nginx)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hoc-toan-vui
   ```

2. **Install dependencies**
   ```bash
   composer install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure database**
   Edit `.env` file and set your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=hoc_toan_vui
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

5. **Run migrations**
   ```bash
   php artisan migrate
   ```

6. **Start the development server**
   ```bash
   php artisan serve
   ```

7. **Access the application**
   Open your browser and navigate to `http://localhost:8000`

## Project Structure

```
hoc-toan-vui/
├── app/
│   ├── Http/Controllers/
│   │   └── AuthController.php
│   └── Models/
│       └── User.php
├── config/
│   └── app.php
├── database/
│   └── migrations/
│       └── 2024_01_01_000000_add_role_to_users_table.php
├── public/
│   └── images/
│       └── back.jpg
├── resources/
│   └── views/
│       ├── welcome.blade.php
│       └── dashboard.blade.php
├── routes/
│   └── web.php
└── composer.json
```

## Key Features

### Authentication System
- Secure login/registration with role selection
- Password hashing and validation
- Session management
- CSRF protection

### Responsive Design
- Mobile-first approach
- Modern CSS with flexbox and grid
- Smooth animations and transitions
- Cross-browser compatibility

### Vietnamese Localization
- All text in Vietnamese
- Proper Vietnamese timezone (Asia/Ho_Chi_Minh)
- Vietnamese locale settings

## Development

### Adding New Features
1. Create controllers in `app/Http/Controllers/`
2. Add routes in `routes/web.php`
3. Create views in `resources/views/`
4. Run migrations for database changes

### Styling
- CSS is embedded in views for simplicity
- Consider moving to separate CSS files for larger projects
- Uses modern CSS features like CSS Grid and Flexbox

### Database
- Uses Laravel's Eloquent ORM
- User model includes role management
- Easy to extend with additional models

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.

---

**Học Toán Vui** - Making math learning fun and accessible for Vietnamese students!