// import * as React from 'react';
// export default function RouterPrompt() {
//     const value = prompt("Please enter Password:");
//     return value
import * as React from 'react';

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid black",
  padding: "20px",
  backgroundColor: "white"
};

export default function RouterPrompt() {
  const value = prompt("Please enter Password:");
  return (
    <div style={boxStyle}>
      
    </div>
  );
}



