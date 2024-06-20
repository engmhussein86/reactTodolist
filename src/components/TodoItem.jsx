import React, { useState } from 'react';

const TodoItem = ({ index, todo, editIndex, onDelete, onToggleComplete, onEdit, onSave }) => {
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSave = () => {
    onSave(index, newTitle);
  };

  return (
    <li>
      {editIndex === index ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(index)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => onDelete(index)} disabled={!todo.completed}>
            Delete
          </button>
          <button onClick={() => onEdit(index)}>Edit</button>
        </>
      )}
    </li>
  );
};

export default TodoItem;