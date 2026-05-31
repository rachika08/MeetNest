import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function LandingPage(){
    let routeTo=useNavigate()
    return(
        <div className="landingPageContainer">
            <nav>
                <div className="navHeader">
                    <h2>Video Conferencing</h2>
                </div>
                <div className="navList">
                    <p onClick={()=>{
                        routeTo('/qwerguest')
                    }}>Join as Guest</p>
                    <p onClick={()=>{
                        routeTo('/auth')
                    }} >Register</p>
                    <div onClick={()=>{
                        routeTo('/auth')
                    }}role="button">
                        <p>Login</p>
                    </div>
                </div>
            </nav>
            <div className="landingMainContainer">
                <div>
                    <h1><span style={{color:'orange'}}>Connect with milllions!</span></h1>
                    <p>Cover a distance with V-Conferencing App</p>
                    
                    <div role="button">
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>

                    <img src="/mobile.png" alt="not found" />
                </div>
            </div>
        </div>
    )
}