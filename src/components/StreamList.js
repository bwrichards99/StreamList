// src/components/StreamList.js
import React, { useState } from "react";

const StreamList = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    console.log("User input:", input);
  };

  return (
    <div className="streamlist-container">
      <h2>StreamList Page</h2>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter something..."
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StreamList;