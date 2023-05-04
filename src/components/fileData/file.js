import React,{useState, useEffect} from "react";
// import {explorer} from './data';
// import { getExplorer } from './data';
import Structure from "./structure";
function file(){
    const [explorerData,setExplorerData] = useState([]);
    useEffect(() => {
        fetch("data/file.json")
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            setExplorerData(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }, []);
    return(
        <div>
            <Structure explorer={explorerData}/>
        </div>
    )
}
export default file;
