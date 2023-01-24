import React, { useState,useEffect } from "react";
import './form.css'
import Clock from './clock'
const handleInput = (e) =>{
  const name = e.target[0].value
  chrome.storage.sync.set({name},()=>{
    console.log(`name is ${name}`)
  });
}
const form=()=>{
  useEffect(()=>{
    // chrome.storage.sync.get(["name"],(res)=>{
    //   console.log(res.name)
    // })
  },[]);
return (
  <div>
    <form onSubmit={handleInput}>
        {/* <label className="name">Username</label>
        <input type="text" className='username' name="name"/>
        <label className="name">Hostname</label>
        <input type="text" className='hostname' name="hname"/> */}
        <div className="row">
          <div className="col-25">
            <label className="uname">User_Name</label>
          </div>
          <div className="col-75">
            <input type="text" id="uname" name="uname" placeholder="SSH username.." required/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label className="hname">Host_Name</label>
          </div>
          <div className="col-75">
            <input type="text" id="hname" name="hname" placeholder="SSH hostname.." required/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label className="Expire_Time">Expire_Time</label>
          </div>
          <div className="col-75">
            <select id="expire" name="expire" className="expire" required>
              <option value="notselect">⏱️</option>
              <option value="test">Test-2_minits</option>
              <option value="5minits">5_minits</option>
              <option value="24hr">24_hours</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label className="sshkey">SSH_KEY</label>
          </div>
          <div className="col-75">
            <textarea id="subject" name="subject" placeholder="Paste SSH Key" style={{height:"200px"}} required/>
          </div>
        </div>
        <div className="row">
          <div className="col-75">
            <label class="switch">
              <input type="checkbox"/>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </form> 
  </div>
  )
}
export default form;
