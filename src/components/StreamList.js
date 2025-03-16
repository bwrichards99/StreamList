// src/components/StreamList.js
import React, { useState } from 'react';

function StreamList() {
  const [input, setInput] = useState('');
  const [streamList, setStreamList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Add Item
  const handleAdd = () => {
    if (input.trim()) {
      setStreamList([...streamList, { text: input, completed: false }]);
      setInput('');
    }
  };

  // Delete Item
  const handleDelete = (index) => {
    const updatedList = streamList.filter((_, i) => i !== index);
    setStreamList(updatedList);
  };

  // Edit Item
  const handleEdit = (index) => {
    setEditingIndex(index);
    setInput(streamList[index].text);
  };

  // Save Edited Item
  const handleSaveEdit = () => {
    const updatedList = [...streamList];
    updatedList[editingIndex].text = input;
    setStreamList(updatedList);
    setEditingIndex(null);
    setInput('');
  };

  // Mark Item as Completed
  const handleComplete = (index) => {
    const updatedList = [...streamList];
    updatedList[index].completed = !updatedList[index].completed;
    setStreamList(updatedList);
  };

  return (
    <div>
      <h1>StreamList</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter stream item"
      />
      <button onClick={editingIndex !== null ? handleSaveEdit : handleAdd}>
        {editingIndex !== null ? 'Save' : 'Add'}
      </button>

      <ul>
        {streamList.map((item, index) => (
          <li key={index}>
            <span
              style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
            >
              {item.text}
            </span>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleComplete(index)}>
              {item.completed ? 'Unmark' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default StreamList;
