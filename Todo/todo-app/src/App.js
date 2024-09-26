import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskInput, setEditTaskInput] = useState('');

  // Handle input change for adding a new task
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  // Handle input change for editing a task
  const handleEditInputChange = (e) => {
    setEditTaskInput(e.target.value);
  };

  // Add a new task
  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput(''); // Clear the input field after adding
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Enable task editing
  const editTask = (index) => {
    setEditIndex(index);
    setEditTaskInput(tasks[index].text); // Pre-fill the input with the current task text
  };

  // Save edited task
  const saveTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].text = editTaskInput;
    setTasks(newTasks);
    setEditIndex(null); // Exit edit mode
  };

  // Delete a task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h1>My To-Do List</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editTaskInput}
                  onChange={handleEditInputChange}
                />
                <button onClick={() => saveTask(index)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleTaskCompletion(index)}>
                  {task.text}
                </span>
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
