import React,{useState} from "react";
import explorer from './data'
import Structure from "./structure";
function file(){
    const [explorerData,setExplorerData] = useState(explorer);
    return(
        <div>
            <Structure explorer={explorerData}/>
        </div>
    )
}
export default file;
