import React from 'react';

const TeacherDashboard = ({ user }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard Giáo viên</h1>
      <p className="text-gray-400 mt-2">Xin chào, {user?.username}!</p>
      {/* TODO: Implement teacher dashboard */}
    </div>
  );
};

export default TeacherDashboard;