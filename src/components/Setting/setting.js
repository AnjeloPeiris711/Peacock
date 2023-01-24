import React from 'react'
import './setting.css'
import Clock from './clock'
import Form from './form'
function setting(){
return (
  <section id={"setting"}>
    <div className="apps">
      <div className="header">
        <div className="home">
          <img src="" alt="" />
        </div>
      <div className="header-menu"></div>
      <div className="Analog-clock">
        <Clock/> 
      </div>
      <div className="header-profile">
        <img className="profile-img" src={``} alt="" />
      </div>
    </div>
    <div className="wrapper">
      <div className="left-side">
        <div className="side-wrapper">
          <div className="side-title">Apps</div>
          <div className='file_structure'></div>
          <div className="side-menu">
            <a href="#">
              <svg viewBox="0 0 512 512">
                
              </svg>
           
            </a>
          </div>
        </div>
      </div>
      <div className='right-side'>
        <Form/>
      </div>
    </div>
    </div>
  <div className="overlay-app" />
  </section>
  )
}
export default setting; 
