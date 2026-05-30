import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {IconButton,TextField,Button} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from "../contexts/AuthContext";
function HomeComponent(params) {
    let navigate=useNavigate();

    const [meetingCode,setMeetingCode]=useState("");
    const {addToHistory}= useContext(AuthContext);

    let handleJoinVideoCall = async (params) => {
        await addToHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }
    return(
        <>
            <div className="navBar">
                <div style={{display :"flex",alignItems:"center"}}>
                    <h3>MeetNest</h3>
                </div>
                <div style={{display:"flex",alignItems:"center"}}>
                    <IconButton>
                        <RestoreIcon/>
                        
                    </IconButton>
                    <p>History</p>
                    <Button onClick={()=>{
                        console.log(localStorage.getItem("token"));
                        localStorage.removeItem("token")
                        navigate("/auth")
                    }}>Log out</Button>
                </div>
            </div>
            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Providing Video Call Just like quality eduction</h2>
                        <div style={{display:"flex",gap:"10px"}}>
                            <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Enter your chat" variant="outlined" />
                            <Button onClick={handleJoinVideoCall} variant="contained">Join</Button>
                        </div>
                    </div>
                </div>
                <div className="rightPanel">
                    <div>
                        <img src="/meetingimage.png" alt="not found image" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default withAuth(HomeComponent);