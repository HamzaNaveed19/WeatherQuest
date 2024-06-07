import React, { useState, useEffect } from 'react';
import './Navbar.css'; // Import your CSS file for Navbar styling

const Navbar = ({ username }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="navbarContainer">
      <div className="userInfo">
        <h1 className="username">Hi, <span className="glow">{username}</span></h1>
      </div>
      <div className="dateTime">
        <h2 className="dateHeading">Today's Date:</h2>
        <div className="date">{currentDate}</div>
        <h2 className="timeHeading">Current Time:</h2>
        <div className="time">{currentTime}</div>
      </div>
    </div>
  );
};

export default Navbar;
