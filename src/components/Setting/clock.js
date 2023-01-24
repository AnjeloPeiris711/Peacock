import React, { useState ,useEffect} from 'react'
import './clock.css'
function setting(){
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const [second, setSecond] = useState(new Date().getSeconds());

  function updateTime() {
    setInterval(() => {
        setHour(new Date().getHours());
        setMinute(new Date().getMinutes());
        setSecond(new Date().getSeconds());
    }, 1000);
}
useEffect(updateTime, []);
return (
  <section id={"setting"}>
    <div className='clock'>
      <div className='hour'>
        <div className='hr' id='hr' style={{ transform: `rotate(${hour * 30}deg)` }}>

        </div>
      </div>
      <div className='min'>
        <div className='mn' id='mn' style={{ transform: `rotate(${minute * 6}deg)` }}>

        </div>
      </div>
      <div className='sec'>
        <div className='sc' id='sc' style={{ transform: `rotate(${second * 6}deg)` }}>

        </div>
      </div>
      
    </div>      
  </section>
  )
}
export default setting; 
