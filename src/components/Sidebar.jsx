import React from 'react';
import { ChefHat, BookOpen, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const SidebarComp = () => {
    const location = useLocation()
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <ChefHat size={24} color="white" />
        <h2>Recipe Admin</h2>
      </div>
      <Link to='/admin/recipes'   className={`nav-link ${location.pathname === '/admin/recipes' ? 'active' : ''}`}>
        <BookOpen size={20} />
        Recipes
      </Link>
      <Link to='/admin/users'   className={`nav-link ${location.pathname === '/admin/users' ? 'active' : ''}`}>
      <Users size={20} />
        Users
      </Link>
    </aside>
  );
};

export default SidebarComp;
