import React, { useState,useRef } from 'react';
import './sshterminal.css'
const sshterminal = (props) => {
  const handleExit = () => {
    props.onExit();
  };
  const [inputValue, setInputValue] = useState('');
  const [output, setOutput] = useState([]);
  const termdisplay = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue === 'clear') {
      setOutput([]);
    }
    else if(inputValue === 'exit'){
      handleExit()
      termdisplay.current.style.display = "none";
    } 
    else {
      setOutput([...output, { command: inputValue, result: `You entered: ${inputValue}` }]);
    }

    setInputValue('');
  };

  return (
    <div ref={termdisplay}className="terminal-container">
      <div className="terminal-output">
        {output.map((item, index) => (
          <div key={index}>
            <p className="terminal-command">{item.command}</p>
            <p className="terminal-result">{item.result}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="terminal-input-container">
        <p className='prompt'>{'junior>'}</p>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="terminal-input"
        />
        <button type="submit" className="terminal-submit-button">
          Execute
        </button>
      </form>
    </div>
  );
};

export default sshterminal ;
