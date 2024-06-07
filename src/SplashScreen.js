import React, { useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ setUsername }) => {
  const [name, setName] = useState('');

  const handleInputChange = (event) => {
    setName(event.target.innerText);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      setUsername(name);
    }
  };

  return (
    <div className="splash-screen">
      <h1 className="glow welcomeText">Welcome to WeatherQuest & Tasks</h1>
      <div className="username-input">
        <span className="glow-1">Enter Your Name:</span>
        <div
          className="username-line"
          contentEditable
          spellCheck="false"
          role="textbox"
          aria-multiline="false"
          aria-label="Your Name"
          onKeyDown={handleEnterKeyPress}
          onInput={handleInputChange}
        ></div>
      </div>
    </div>
  );
};

export default SplashScreen;
