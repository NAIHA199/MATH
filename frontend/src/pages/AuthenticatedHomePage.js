import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/helpers';
import AuthenticatedNavbar from '../components/layout/AuthenticatedNavbar';
import StudentHome from '../components/home/StudentHome';
import TeacherHome from '../components/home/TeacherHome';
import ParentHome from '../components/home/ParentHome';

const AuthenticatedHomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  // Render content based on user type
  const renderContent = () => {
    switch(user?.userType) {
      case 'student':
        return <StudentHome user={user} />;
      case 'teacher':
        return <TeacherHome user={user} />;
      case 'parent':
        return <ParentHome user={user} />;
      default:
        return <StudentHome user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Space Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-black" />
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <AuthenticatedNavbar user={user} />
        
        {/* Content Area */}
        <div className="pt-20">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedHomePage;