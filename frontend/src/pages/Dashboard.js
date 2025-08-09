import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/helpers';
import MainLayout from '../components/layout/MainLayout';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';
import ParentDashboard from '../components/dashboard/ParentDashboard';
import Loading from '../components/common/Loading';

const Dashboard = ({ userType }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Set user với userType từ props hoặc từ localStorage
    setUser({
      ...currentUser,
      userType: userType || currentUser.userType
    });
    
    setIsLoading(false);
  }, [navigate, userType]);

  if (isLoading) {
    return <Loading />;
  }

  // Render dashboard content based on user type
  const renderDashboardContent = () => {
    const type = user?.userType || userType;
    
    switch(type) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'teacher':
        return <TeacherDashboard user={user} />;
      case 'parent':
        return <ParentDashboard user={user} />;
      default:
        return <StudentDashboard user={user} />;
    }
  };

  return (
    <MainLayout user={user}>
      {renderDashboardContent()}
    </MainLayout>
  );
};

export default Dashboard;