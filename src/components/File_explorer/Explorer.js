import React from 'react'
import './explorer.css'
import File from '../fileData/file';
const cloud ="iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFh0lEQVR4nO2XuVMbdxTHlSLJSIA4xCVuDAZjgjFSXKRKJkVSpMhkUidNukyuf8DjFBIxQhwiHAYM5g6HgXA4gYA2RZoUzrjxeLSSQEIIIRCwC5ncg1/m/Va7Wq0WBAaPKfbNvJLh+/m97/e9lUqllFJKKaWUUkrFlr5zIz2rw/tJRptnJqN19Ul6q2dfZ1v5I8226kxtci+mNLo+T7W68lUXrTJatxL13WtfZ3d5/8y+swZZHV7IbPdCRqsH0r/1gK5lFdJsq5DatAIpje7D5Ab3gKbRq1ddhMrr9VXl9vi8OXd9kNPtA33nGggQbRKIZgECtFb3QVI9/d4LFV8wsP52/r313/N61yG3Zx0QQt/lg+zONchCiHYxxCrobAixwkE0uCHZ6v4vyeL6+AWJ3ywu7PeHCvr8kH/PDwIETqFrjYPgrdQWmYKOh2gMQ9S7/02sc7753ITWLO2/YaTYpppl1l69sPdr5fzOdMXUzpdFg4HHhYMbUNDvh3wCsc5B8FZCiLh5WOEgLK5Axq3Hiecq/MbSvs5IsbNGigVsg52F6sU9eO3BDlwaCUBerx8QoHAgAiG20rF5sEXnIdnqBq3FefPcxBt/Pkg3UAzNi5cC5PVwr43ii4YCEQixlSR5wClktnk4iJbYPGitLlZlc756LgAGinkgFi8GKJ/cBn23TwAoHg6QJhDiPIitdEQe0iR50Fpd757D6zNvXceXntuBqzMhqJgJQeVsCKp+2IXqhV0oHgmQl0WR+OoovmR0E2Ly0HPCPDRH8qC1uprOJP51ivmwYm77n8sTQSjDvr8V1eX3tyCXCIoFKB45Og/6I/Kga1mFlIYV0Na7IanOiR1Umxzvqxp86lMJvzoOrxgotgetgq9+ZWobrkzLN//Pc+5GA5R8twlF4lDHrFY+D17y92gbrcUFSXUuSLzthIRvsGnQmGlQm+gDjclx82QgAC8ZKWaM93olWmc2FNWVfM+FyCuiDbI7vOSlBYDRTRJoAeKI1ZrZ7hEfMtDWuyDJwkEk3XYSAL7VZsdvahOde6x+wzLzlTisVT/ukk2DXSX0LskANrFE5xoRlNvrg+KhCADCFA1tROUhT5QHhNeJtw+/QutdZBpaSzRAGOJJ2i2nVlZ81S9sqtHO7okBan7ag+oFSS9GGgWjIHxdYqHBDcFCeB8ECEke0HLCBrJFhzd8kQmIFCBsqQFZAOMy+5l0XRKIJSbSy1wbwo02QmFoFX6F8hO4xEOIrRTOA7FPm/xFTuXXqEUeQGN2HCaYHddiAShmUQ4gXuMLo9jSsU24PB4kXToWFCC4KQQil7rPH//bqHkFEmrlxAtWssT63876ngUAtxFZtZNbUDbBrdgoCKmVwhOQQmSIrjJOIg7AI7kJ/P0sANhlE9tQPrkF5VNbBASBOAhJHjDQff7oq3xH8qnd6uFW6bEA9G4sgJ3ZPrFoO9eYC/JNNL8DFd9ztwFByBQmglA6HozJQ0H/RtT3kV501LBTm9xxATRmx18yE2AfngaAF38tvGrxNhCIKQmEJA+YhZgv1S6E8EF6i4dsn7gAJtojNwHzuQBMiyAm+DyEN9NIAIqGA8RG4puQ0+0DXSt+SnDrM/4E6PEYgBv23UojxRyeFQBzQLIwFZmCNA/i66zvxpcP34GTAtQ6PpK9BQaKGTgPABSO1ikdDUIJCg9PoHiE+0bCe4Cvn93uFY7ZiQHQPp0PXz7mGjOuUwPMywOUiHxPRIe/hdDz/A+b9FMBOA41tc53ZMULVlraLzNSjPuFAViOADA5nqpN9BfHihdB6IwUM2y0M08vAoDaTAfUJvoD1Wnrun2v2kixFoOdfWSgmB3xT8rnDaAx0yG1mbarTY5Pj/wCVUoppZRSSimllFKdqf4Hkwfn1FwFAyEAAAAASUVORK5CYII="
function filemanager (){
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
                    <div className="side-title">Apps</div>
                    <div className='file_structure'>
                        <File/>
                      </div>
                    <div className="side-menu">
                      <a href="#">
                        <svg viewBox="0 0 512 512">
                          
                          
                        </svg>
                     
                      </a>
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
