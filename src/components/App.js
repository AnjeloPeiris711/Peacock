import React,{Component, useEffect, useState} from "react";
import Setting from "./Setting/setting"
import Tab from "./tab/tab";
import About from "./About/about"
import Nav from "./nav/Nav"
class App extends Component{
    render(){
        return(
    
        <>
            <Tab/>
            <Setting/>
            <About/>
            <Nav/>
        </>
        )
    }
}
export default App;