import React, { useState } from "react"
import './structure.css'
function Structure({explorer}){ 
    const [expand ,setExpand] = useState(false);
    if(explorer.isFolder){
    return(
        <>
        <div className="folder"  onClick={()=>setExpand(!expand)}>
            <span style={{display:expand?"none":"inline"}}>📁</span><span style={{display:expand?"inline":"none"}}>📂</span><span>{explorer.name}</span>
        </div>
           <div style={{display:expand?"block":"none",paddingLeft:20}}>
            {explorer.items.map((exp)=>{
                return(
                    <Structure explorer={exp} key ={exp.id}/>
                )
            })}
           </div>
        </>
    );
    }else{
        return(
            <span className="file"> 📄 {explorer.name}</span>
        )
    }
}
export default Structure