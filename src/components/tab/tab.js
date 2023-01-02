import React,{useState} from 'react'
import './tab.css'
import Explorer from  "../File_explorer/Explorer"
function tab() {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    };
  
    return (
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Tab 1
          </button>
          <button
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Tab 2
            <button className="close">X</button>
          </button>
          <button
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            Tab 3
          </button>
        </div>
  
        <div className="content-tabs">
          <div
            className={toggleState === 1 ? "content  active-content" : "content"}
          >
            <Explorer/>
          </div>
  
          <div
            className={toggleState === 2 ? "content  active-content" : "content"}
          >
            <Explorer/>
          </div>
  
          <div
            className={toggleState === 3 ? "content  active-content" : "content"}
          >
           <Explorer/>
          </div>
        </div>
      </div>
    );
  }


export default tab