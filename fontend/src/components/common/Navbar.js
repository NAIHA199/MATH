import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaBook, 
  FaGamepad, 
  FaTrophy, 
  FaUser, 
  FaBars, 
  FaTimes,
  FaSignOutAlt,
  FaChartLine
} from 'react-icons/fa';
import { getCurrentUser } from '../../utils/helpers';
import { images } from '../../assets';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Kiểm tra user đã đăng nhập
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [location]); // Re-check khi chuyển trang

  // Menu items cho học sinh
  const studentMenuItems = [
    { path: '/', label: 'Trang chủ', icon: <FaHome /> },
    { path: '/dashboard', label: 'Bảng điều khiển', icon: <FaChartLine /> },
    { path: '/games', label: 'Trò chơi', icon: <FaGamepad /> },
    { path: '/rewards', label: 'Phần thưởng', icon: <FaTrophy /> },
  ];

  // Menu items cho phụ huynh
  const parentMenuItems = [
    { path: '/dashboard', label: 'Bảng điều khiển', icon: <FaChartLine /> },
    { path: '/children', label: 'Quản lý con', icon: <FaUser /> },
    { path: '/reports', label: 'Báo cáo', icon: <FaBook /> },
    { path: '/settings', label: 'Cài đặt', icon: <FaTrophy /> },
  ];

  // Chọn menu dựa vào loại user
  const menuItems = user?.type === 'parent' ? parentMenuItems : studentMenuItems;

  // Kiểm tra menu active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Nếu chưa đăng nhập, hiện navbar đơn giản
  if (!user) {
    return (
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src={images.logo} 
                  alt="Math Kids" 
                  className="h-10 mr-3"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-2xl font-bold text-purple-600">Math Kids</span>';
                  }}
                />
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-purple-600 font-medium"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Navbar cho user đã đăng nhập
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={images.logo} 
                alt="Math Kids" 
                className="h-10 mr-3"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<span class="text-2xl font-bold text-purple-600">Math Kids</span>';
                }}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 ml-6 border-l pl-6">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                <span className="text-2xl">{user.avatar || '🦄'}</span>
                <span className="text-sm font-medium">
                  {user.username}
                  {user.type === 'student' && user.grade && (
                    <span className="text-xs text-gray-500 block">Lớp {user.grade}</span>
                  )}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Đăng xuất"
              >
                <FaSignOutAlt className="text-xl" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
            
            <div className="border-t pt-3 mt-3">
              <div className="flex items-center px-3 py-2">
                <span className="text-2xl mr-3">{user.avatar || '🦄'}</span>
                <div className="flex-1">
                  <p className="font-medium">{user.username}</p>
                  {user.type === 'student' && user.grade && (
                    <p className="text-xs text-gray-500">Lớp {user.grade}</p>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md flex items-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;