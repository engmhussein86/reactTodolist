// App.js
import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';


const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Fetch initial todos from an API
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => {
        // Assuming data is an array of todos
        setTodos(data.slice(0, 5)); // Example: use first 5 todos
      });
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodos = [{ title: newTodo, completed: false }, ...todos];
      setTodos(newTodos);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleSave = (index, newTitle) => {
    const updatedTodos = [...todos];
    updatedTodos[index].title = newTitle;
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            editIndex={editIndex}
            onDelete={handleDeleteTodo}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onSave={handleSave}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
