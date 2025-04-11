import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SidebarComp from '../../components/Sidebar';

const AdminUsers = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <SidebarComp />

      <main className="main-content">
        <button className="back-button" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
          Back to Home
        </button>

        <h2 className="form-title">User Management</h2>
        <p>user management stuff</p>
      </main>
    </div>
  );
};

export default AdminUsers;
