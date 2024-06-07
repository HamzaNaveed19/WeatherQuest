import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import Navbar from './Navbar';
import WeatherApp from './WeatherAPI';
import TodoList from './ToDoList';
import SplashScreen from './SplashScreen';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <div className="background-image">
      {username ? (
        <>
          <Navbar username={username} />
          <div className="WeatherToDoList">
            <div className="WeatherApp">
              <WeatherApp />
            </div>
            <div className="TodoList">
              <TodoList />
            </div>
          </div>
        </>
      ) : (
        <SplashScreen setUsername={setUsername} />
      )}
    </div>
  );
};

export default App;
