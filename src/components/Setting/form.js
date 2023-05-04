import React, { useState,useEffect } from "react";
import './form.css'
const handleInput = (e) =>{
  if(e.target.checked){
    var formValues = {
      uname: document.getElementById('uname').value,
      hname: document.getElementById('hname').value,
      expire: document.getElementById('expire').value,
      subject: document.getElementById('subject').value

    };
    const delayInMinutes = Math.max(parseInt(formValues.expire, 10) / (60 * 1000), 1);
    chrome.storage.sync.set({formValues},()=>{
      console.log("Form data saved")
    });
    chrome.alarms.create("deleteItemAlarm", { delayInMinutes });
    chrome.storage.sync.set({isChecked: true});
  }
  else{
    console.log('The checkbox is not checked.');
    chrome.storage.sync.set({isChecked: false});
  }
}
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "deleteItemAlarm") {
    chrome.storage.sync.remove(['formValues']);
    alert("Expire ssh key");
    document.getElementById('myform').reset();
  }
});
const form=()=>{
  const [isBlurred, setIsBlurred] = useState(false);
  const handleCheckboxChange = (e) => {
    handleInput(e)
    setIsBlurred(e.target.checked);
  };
  const displayStyle ={filter: isBlurred ? 'blur(5px)' : 'none'};
  const [formData, setFormData] = useState({
    uname: "",
    hname: "",
    expire: "",
    subject: ""
  });
  useEffect(()=>{
    chrome.storage.sync.get(['formValues'], function(data){
      if (data.formValues) {
        document.getElementById('uname').value = data.formData.uname;
        document.getElementById('hname').value = data.formData.hname;
        document.getElementById('subject').value = data.formData.subject;
        setFormData(data.formValues);
      }
      if (data.isChecked !== undefined) {
        setChecked(data.isChecked);
      }
    });
  },[]);

return (
  <div>
    <form id="myform" onSubmit={(e) => handleInput(e, formData, setFormData)}>
        <div className="row">
          <div className="col-25">
            <label className="uname">User_Name</label>
          </div>
          <div className="col-75">
            <input type="text" id="uname" name="uname" placeholder="SSH username.." required  
              value={formData.uname}
              style={displayStyle}
              onChange={(e) => setFormData({ ...formData, uname: e.target.value })}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label className="hname">Host_Name</label>
          </div>
          <div className="col-75">
            <input type="text" id="hname" name="hname" placeholder="SSH hostname.." required 
              value={formData.hname}
              style={displayStyle}
              onChange={(e) => setFormData({ ...formData, hname: e.target.value })}/>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label className="Expire_Time">Expire_Time</label>
          </div>
          <div className="col-75">
            <select id="expire" name="expire" className="expire" required 
              value={formData.expire}
              style={displayStyle}
              onChange={(e) => setFormData({ ...formData,expire: e.target.value })}>
              <option value="notselect">⏱️</option>
              <option value="2 * 60 * 1000">Test-2_minits</option>
              <option value="5 * 60 * 1000">5_minits</option>
              <option value="24 * 60 * 60 * 1000">24_hours</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label className="sshkey">SSH_KEY</label>
          </div>
          <div className="col-75">
            <textarea id="subject" className="SSHKEY" name="subject" placeholder="Paste SSH Key"  required 
              value={formData.subject} 
              style={displayStyle}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}/>
          </div>
        </div>
        <div className="row">
          <div className="col-75">
            <label className="switch">
              <input type="checkbox" onChange={handleCheckboxChange} required/>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </form> 
  </div>
  )
}
export default form;
