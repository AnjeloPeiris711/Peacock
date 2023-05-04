import React ,{ useState }from 'react'
import './explorer.css'
import File from '../fileData/file';
import DropFileInput from './dropfileinput';
const cloud ="iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFh0lEQVR4nO2XuVMbdxTHlSLJSIA4xCVuDAZjgjFSXKRKJkVSpMhkUidNukyuf8DjFBIxQhwiHAYM5g6HgXA4gYA2RZoUzrjxeLSSQEIIIRCwC5ncg1/m/Va7Wq0WBAaPKfbNvJLh+/m97/e9lUqllFJKKaWUUkrFlr5zIz2rw/tJRptnJqN19Ul6q2dfZ1v5I8226kxtci+mNLo+T7W68lUXrTJatxL13WtfZ3d5/8y+swZZHV7IbPdCRqsH0r/1gK5lFdJsq5DatAIpje7D5Ab3gKbRq1ddhMrr9VXl9vi8OXd9kNPtA33nGggQbRKIZgECtFb3QVI9/d4LFV8wsP52/r313/N61yG3Zx0QQt/lg+zONchCiHYxxCrobAixwkE0uCHZ6v4vyeL6+AWJ3ywu7PeHCvr8kH/PDwIETqFrjYPgrdQWmYKOh2gMQ9S7/02sc7753ITWLO2/YaTYpppl1l69sPdr5fzOdMXUzpdFg4HHhYMbUNDvh3wCsc5B8FZCiLh5WOEgLK5Axq3Hiecq/MbSvs5IsbNGigVsg52F6sU9eO3BDlwaCUBerx8QoHAgAiG20rF5sEXnIdnqBq3FefPcxBt/Pkg3UAzNi5cC5PVwr43ii4YCEQixlSR5wClktnk4iJbYPGitLlZlc756LgAGinkgFi8GKJ/cBn23TwAoHg6QJhDiPIitdEQe0iR50Fpd757D6zNvXceXntuBqzMhqJgJQeVsCKp+2IXqhV0oHgmQl0WR+OoovmR0E2Ly0HPCPDRH8qC1uprOJP51ivmwYm77n8sTQSjDvr8V1eX3tyCXCIoFKB45Og/6I/Kga1mFlIYV0Na7IanOiR1Umxzvqxp86lMJvzoOrxgotgetgq9+ZWobrkzLN//Pc+5GA5R8twlF4lDHrFY+D17y92gbrcUFSXUuSLzthIRvsGnQmGlQm+gDjclx82QgAC8ZKWaM93olWmc2FNWVfM+FyCuiDbI7vOSlBYDRTRJoAeKI1ZrZ7hEfMtDWuyDJwkEk3XYSAL7VZsdvahOde6x+wzLzlTisVT/ukk2DXSX0LskANrFE5xoRlNvrg+KhCADCFA1tROUhT5QHhNeJtw+/QutdZBpaSzRAGOJJ2i2nVlZ81S9sqtHO7okBan7ag+oFSS9GGgWjIHxdYqHBDcFCeB8ECEke0HLCBrJFhzd8kQmIFCBsqQFZAOMy+5l0XRKIJSbSy1wbwo02QmFoFX6F8hO4xEOIrRTOA7FPm/xFTuXXqEUeQGN2HCaYHddiAShmUQ4gXuMLo9jSsU24PB4kXToWFCC4KQQil7rPH//bqHkFEmrlxAtWssT63876ngUAtxFZtZNbUDbBrdgoCKmVwhOQQmSIrjJOIg7AI7kJ/P0sANhlE9tQPrkF5VNbBASBOAhJHjDQff7oq3xH8qnd6uFW6bEA9G4sgJ3ZPrFoO9eYC/JNNL8DFd9ztwFByBQmglA6HozJQ0H/RtT3kV501LBTm9xxATRmx18yE2AfngaAF38tvGrxNhCIKQmEJA+YhZgv1S6E8EF6i4dsn7gAJtojNwHzuQBMiyAm+DyEN9NIAIqGA8RG4puQ0+0DXSt+SnDrM/4E6PEYgBv23UojxRyeFQBzQLIwFZmCNA/i66zvxpcP34GTAtQ6PpK9BQaKGTgPABSO1ikdDUIJCg9PoHiE+0bCe4Cvn93uFY7ZiQHQPp0PXz7mGjOuUwPMywOUiHxPRIe/hdDz/A+b9FMBOA41tc53ZMULVlraLzNSjPuFAViOADA5nqpN9BfHihdB6IwUM2y0M08vAoDaTAfUJvoD1Wnrun2v2kixFoOdfWSgmB3xT8rnDaAx0yG1mbarTY5Pj/wCVUoppZRSSimllFKdqf4Hkwfn1FwFAyEAAAAASUVORK5CYII="
const refesh ="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"
function filemanager (){
  const [file, setFile] = useState(null);

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }
  function Refresh(){
    console.log("Refreshing....")
    chrome.runtime.sendMessage({
      type:'Serverfiledata',
      value: 'dowfd'
    });
  }
  function handleDownload() {
    chrome.runtime.onMessage.addListener(function (request) {
      if (request.type == 'Sfile_data') {
        console.log("Recived filedata:" + request.value)
        const data = "hello";
        const blob = new Blob([data], { type: 'text/plain' });
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
  
        // Specify the file name and extension here
        a.setAttribute('download', 'file.txt');
  
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }  
    })

    // const data = "hello"; // Specify the data to be downloaded here
    // const blob = new Blob([data], { type: 'text/plain' });
    // const blobUrl = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = blobUrl;
  
    // // Specify the file name and extension here
    // a.setAttribute('download', 'file.txt');
  
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
    // URL.revokeObjectURL(blobUrl);
  }
  
  return (
          <div>
            <div className="app">
               <div className="header">
                <div className="home">
                <img src="https://www.elevenforum.com/data/attachments/31/31498-c9f25938bd40f9c2e3af267cc96b3e28.jpg" alt="" />
                </div>
                <div className="header-menu">
                </div>
                <div className="search-bar">
                  <input type="text" placeholder="Search" />
                </div>
                <div className="header-profile">
                  <img className="profile-img" src={`data:image/png;base64,${cloud}`} alt="" />
                </div>
              </div>
              <div className="wrapper">
                <div className="left-side">
                  <div className="side-wrapper">
                    <div className="side-title">Cloud Files</div>
                    <div className='side-title-refesh'>
                      <a href={"#"} onClick={()=> Refresh()} ><img className='side-title-reimg'src={`data:image/png;base64,${refesh}`} /></a>
                    </div>
                    <div className='file_structure'>
                        <File/>
                    </div>
                    <div className="side-menu">
                    <div>
                      <button className = "downlord" onClick={handleDownload}>Download</button>
                    </div>
                    </div>
                  </div>
                </div>
                <div className="main-container">
                  <div className="main-header">
                    <div className="header-menu">
                        <DropFileInput/>
                    </div>
                  </div>
                </div>
              </div>
              
            <div className="overlay-app" />
            </div> 
          </div>
        );
      }
export default filemanager;
