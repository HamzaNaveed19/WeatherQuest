import React, { useState, useEffect } from 'react';
import './ToDoList.css';

const TodoList = () => {
  const loadTasksFromStorage = () => {
    const storedItems = localStorage.getItem('tasks');
    return storedItems ? JSON.parse(storedItems) : [];
  };

  const [items, setItems] = useState(loadTasksFromStorage);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevItems) => [...prevItems]);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const addNewItem = () => {
    if (inputValue === '') {
      alert('You must write something!');
    } else {
      setItems([...items, { text: inputValue, checked: false, timestamp: Date.now() }]);
      setInputValue('');
    }
  };

  const toggleCheck = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const getTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = Math.floor((now - timestamp) / 60000);
    return `${diff} minute${diff !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="todoContainer">
      <div className="header">
        <h2>My To Do List</h2>
        <input
          type="text"
          id="myInput"
          placeholder="Enter New Task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <span onClick={addNewItem} className="addBtn">Add</span>
      </div>

      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={item.checked ? 'checked' : ''}
            onClick={() => toggleCheck(index)}
          >
            {item.text}
            <div className="timeAgo">{getTimeAgo(item.timestamp)}</div>
            <div className="buttons">
              <button
                className="doneBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCheck(index);
                }}
              >
                {item.checked ? 'Undo' : 'Done'}
              </button>
              <button
                className="removeBtn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(index);
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
