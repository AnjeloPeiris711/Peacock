import React from 'react'
import './about.css'
export default function about() {
  const asciiArt = `
  ___  ____ ____ ____ ____ ____ _ _    __  _
 |--' |===  |--| |___ [__] |___ |-:_  |__|.|`;
  const gradientBackground = {
    background: 'linear-gradient(to right, #ff4e50, #f9d423, #3cba92, #3e8e41, #7159a6, #0b0c0c)',
    'WebkitBackgroundClip': 'text',
    'WebkitTextFillColor': 'transparent',
  }  ;                                                                               
  return (
    <section id={"about"}>
    <div className="terminal">
      <div className="terminal-header">
        <div className="green-circle">-</div>
        <div className="yellow-circle">O</div>
        <div className="red-circle">X</div>
      </div>
      <div className="terminal-body">
        <div className="terminal-line">
        <div className='welocmemessage'>
          <pre style={gradientBackground}>{asciiArt}</pre>
        </div>
          <span className="prompt">peacock@website:~$</span> about_me
        </div>
        <div className="terminal-line">
          <span className="output">Hi there! My name is Anjelo Peiris, and I'm a undergraguate student. </span>
        </div>
        <div className="terminal-line">
          <span className="output">This is my final year project if you like this project,then follow this project on <a href='https://github.com/AnjeloPeiris711'>Github</a></span>
        </div>
        <div className="terminal-line">
          <span className="prompt">peacock@website:~$</span> what_is_peacock?
        </div>
        <div className="terminal-line">
          <span className="output">Peac🦚ck is browser extension that allows you to transfer files and share hardware resources between multiple computers without the need for additional software installations. It's designed to simplify the process of moving files and hardware resources across different devices, all through a simple and intuitive interface within your web browser.</span>
        </div>
        <div className="terminal-line">
          <span className="prompt">peacock@website:~$</span> what_is_the_importance_of_peacock?
        </div>
        <div className="terminal-line">
          <span className="output">The importance of Peacock lies in its ability to simplify and streamline the process of transferring files and sharing hardware resources between multiple computers. This can be especially helpful for people who work across multiple devices or for teams that need to collaborate on files and projects. By eliminating the need for additional software installations and providing a user-friendly interface within the web browser, Peacock can save users time and effort while also improving their overall productivity. Additionally, Peacock may also help to reduce the cost and environmental impact of hardware purchases by enabling the sharing of existing resources. Overall, Peacock has the potential to make a positive impact on the way people work and collaborate in today's digital age.
          </span>
        </div>
        <div className="terminal-line">
          <span className="prompt">peacock@website:~$</span> what_are_the_Limitations_of_the_system?
        </div>
        <div className="terminal-line">
          <span className="output" style={{color:'#db2c2c'}}>⚠️ you need to setup peacock server program in your target computer</span>
        </div>
        <div className="terminal-line">
        <span className="output" style={{color:'#d7e61c'}}>✅ your target computer already in localare no nead to setup anything</span>
        </div>
        <div className="terminal-line">
          <span className="output" style={{color:'#db2c2c'}}>⚠️ your target compute is cloud then you nead to setup <span style={{color:'#e6971c'}}>SDN(Recomeand Zerotier)</span></span>
        </div>
      </div>
    </div>
</section>
  )
}
