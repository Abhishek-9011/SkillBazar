import React from 'react';
import './sidebar.css';

function Sidebar() {
  return (
    <div className='sidebarContainer'>
    <div className="sidebar">
      <h2 className="sidebar-title">SkillBazar</h2>
      <ul className="sidebar-menu">
        <li className="menu-item">
          <i className="icon home-icon"></i>
          Home
        </li>
        <li className="menu-item">
          <i className="icon about-icon"></i>
          About
        </li>
        <li className="menu-item">
          <i className="icon services-icon"></i>
          Services
        </li>
        <li className="menu-item">
          <i className="icon contact-icon"></i>
          Contact
        </li>
      </ul>
    </div>
    </div>
  );
}

export default Sidebar;
