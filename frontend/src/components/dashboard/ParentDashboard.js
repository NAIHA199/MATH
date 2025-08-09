import React from 'react';

const ParentDashboard = ({ user }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard Phụ huynh</h1>
      <p className="text-gray-400 mt-2">Xin chào, {user?.username}!</p>
      {/* TODO: Implement parent dashboard */}
    </div>
  );
};

export default ParentDashboard;