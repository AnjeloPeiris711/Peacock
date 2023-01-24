import React,{useState} from 'react'
import './tab.css'
import Explorer from  "../File_explorer/Explorer"
function tab() {
    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
      setToggleState(index);
    };
    const addTab =()=>{
      if(toggleState === 1){
        document.getElementById('tab2').style.display = "";
        document.getElementById('tab2b').style.display = "";
        }
      else if(toggleState === 2){
          document.getElementById('tab3').style.display = "";
          document.getElementById('tab3b').style.display = "";
        }
      else if(toggleState === 3){
            document.getElementById('tab4').style.display = "";
            document.getElementById('tab4b').style.display = "";
        }
      else{
            alert("This version only have 4 tabs ");
        }
    };
    const closeTab =()=>{
      if(toggleState === 2){
        document.getElementById('tab2b').style.display = "none";
      }
      else if(toggleState === 3){
        document.getElementById('tab3b').style.display = "none";
      }
      else if(toggleState === 4){
        document.getElementById('tab4b').style.display = "none";
      }
    }
    return (
      <div className="container">
        <div className="bloc-tabs">
          <button
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Tab 1
          </button>
          <span 
            style={{display:"none"}}
            id = "tab2b"
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            <button className={toggleState === 2 ? "tabbutton active-tabs" :"tabbutton"}>Tab 2</button>
            <button className="close" onClick={() => closeTab()}>X</button>
          </span>
          <span
            style={{display:"none"}}
            id = "tab3b"
            className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(3)}
          >
            <button className={toggleState === 3 ? "tabbutton active-tabs" :"tabbutton"}>Tab 3</button>
            <button className="close" onClick={() => closeTab()}>X</button>
          </span>
          <span
            style={{display:"none"}}
            id = "tab4b"
            className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(4)}
          >
            <button className={toggleState === 4 ? "tabbutton active-tabs" :"tabbutton"}>Tab 4</button>
            <button className="close" onClick={() => closeTab()}>X</button>
          </span>
          <div className='add_tabs'>
          <button className='plus'  onClick={() => addTab()}>+</button>     
        </div>
        </div>
  
        <div className="content-tabs">
          <div
            className={toggleState === 1 ? "content  active-content" : "content"} 
          >
            <Explorer/>
          </div>
  
          <div
            id ="tab2"
            className={toggleState === 2 ? "content  active-content" : "content"}
          >
            <Explorer/>
          </div>
  
          <div
            id ="tab3"
            className={toggleState === 3 ? "content  active-content" : "content"}
          >
           <Explorer/>
          </div>
          <div
            id ="tab4"
            className={toggleState === 4 ? "content  active-content" : "content"}
          >
           <Explorer/>
          </div>
        </div>
      </div>
    );
  }


export default tab