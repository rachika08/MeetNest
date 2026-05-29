import React, { useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
function HomeComponent(params) {
    let navigate=useNavigate();
    const [meetingCode,setMeetingCode]=useState("");
    let handleJoinVideoCall = async (params) => {
        navigate(`/${meetingCode}`)
    }
    return(
        <>
            <div className="navBar">
                <div style={{display :"flex",alignItems:"center"}}>
                    <h3>MeetNest</h3>


                </div>
            </div>
        </>
    )
}

export default withAuth(HomeComponent);