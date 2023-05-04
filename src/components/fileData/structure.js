import React, { useState,useEffect } from "react"
import './structure.css'
function Structure({explorer}){ 
    const [expand ,setExpand] = useState(false);

    const handleDownload = () => {
        chrome.runtime.sendMessage({
          type:'requestSFile',
          value: 'fname'+explorer.name,
        });
        alert("your file" +explorer.name+ "preparing to download it will download automatically after 5 second");
        setTimeout(() =>{
        const fileUrl =  `data/${explorer.name}`;
        fetch(fileUrl)
          .then((response) => response.text())
          .then((data) => {
            console.log(data);
            const blob = new Blob([data], { type: 'text/plain' });
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
  
            // Specify the file name and extension here
            a.setAttribute('download', explorer.name);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        },5000);
      };
    if(explorer.isFolder=="true"){
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
            <span className="file">📄{explorer.name}<a className="exploredownlord" onClick={handleDownload}>⬇️</a></span>
            )
    }
}
export default Structure