// import React, { useContext, useState } from "react";
// import withAuth from "../utils/withAuth";
// import { useNavigate } from "react-router-dom";
// import "../App.css";
// import {IconButton,TextField,Button} from '@mui/material';
// import RestoreIcon from '@mui/icons-material/Restore';
// import { AuthContext } from "../contexts/AuthContext";
// function HomeComponent(params) {
//     let navigate=useNavigate();

//     const [meetingCode,setMeetingCode]=useState("");
//     const {addToHistory}= useContext(AuthContext);

//     let handleJoinVideoCall = async (params) => {
//         await addToHistory(meetingCode)
//         navigate(`/${meetingCode}`)
//     }
//     return(
//         <>
//             <div className="navBar">
//                 <div style={{display :"flex",alignItems:"center"}}>
//                     <h3>MeetNest</h3>
//                 </div>
//                 <div style={{display:"flex",alignItems:"center"}}>
//                     <IconButton onClick={()=>{
//                         navigate('/history')
//                     }}>
//                         <RestoreIcon/>
                        
//                     </IconButton>
//                     <p>History</p>
//                     <Button onClick={()=>{
//                         console.log(localStorage.getItem("token"));
//                         localStorage.removeItem("token")
//                         navigate("/auth")
//                     }}>Log out</Button>
//                 </div>
//             </div>
//             <div className="meetContainer">
//                 <div className="leftPanel">
//                     <div>
//                         <h2>Providing Video Call Just like quality eduction</h2>
//                         <div style={{display:"flex",gap:"10px"}}>
//                             <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Enter your meeting code" variant="outlined" />
//                             <Button onClick={handleJoinVideoCall} variant="contained">Join</Button>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="rightPanel">
//                     <div>
//                         <img src="/meetingimage.png" alt="not found image" />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default withAuth(HomeComponent);

// import React, { useContext, useState } from "react";
// import withAuth from "../utils/withAuth";
// import { useNavigate } from "react-router-dom";
// import "../App.css";
// import { IconButton, TextField, Button } from '@mui/material';
// import RestoreIcon from '@mui/icons-material/Restore';
// import LogoutIcon from '@mui/icons-material/Logout';
// import VideoCallIcon from '@mui/icons-material/VideoCall';
// import { AuthContext } from "../contexts/AuthContext";

// function HomeComponent() {
//   let navigate = useNavigate();
//   const [meetingCode, setMeetingCode] = useState("");
//   const { addToHistory } = useContext(AuthContext);

//   // ── LOGIC UNTOUCHED ──
//   let handleJoinVideoCall = async () => {
//     await addToHistory(meetingCode);
//     navigate(`/${meetingCode}`);
//   };

//   return (
//     <>
//       {/* ── NAVBAR ── */}
//       <div className="navBar">
//         <div className="navBrand">
//           Meet<span>Nest</span>
//         </div>
//         <div className="navActions">
//           <IconButton
//             onClick={() => navigate('/history')}
//             sx={{
//               color: '#57534E',
//               '&:hover': { background: '#FEF3C7' }
//             }}
//           >
//             <RestoreIcon />
//           </IconButton>
//           <span style={{ fontSize: '0.85rem', color: '#57534E', marginRight: '8px' }}>History</span>

//           <Button
//             onClick={() => {
//               // ── LOGIC UNTOUCHED ──
//               console.log(localStorage.getItem("token"));
//               localStorage.removeItem("token");
//               navigate("/auth");
//             }}
//             startIcon={<LogoutIcon />}
//             sx={{
//               color: '#57534E',
//               fontSize: '0.85rem',
//               textTransform: 'none',
//               borderRadius: '50px',
//               padding: '6px 16px',
//               '&:hover': { background: '#FEF3C7' }
//             }}
//           >
//             Log out
//           </Button>
//         </div>
//       </div>

//       {/* ── HERO ── */}
//       <div className="meetContainer">
//         <div className="leftPanel">
//           <span className="landingTagline">✦ Ready to connect?</span>
//           <h2>
//             Start or join a <span>meeting</span> in seconds
//           </h2>
//           <p>Enter your meeting code below and jump right in — no downloads, no fuss.</p>

//           <div className="joinCard">
//             <label>Meeting Code</label>
//             <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
//               <TextField
//                 onChange={e => setMeetingCode(e.target.value)}
//                 value={meetingCode}
//                 id="outlined-basic"
//                 placeholder="e.g. abc-xyz-123"
//                 variant="outlined"
//                 fullWidth
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: '12px',
//                     background: '#FFFBEB',
//                     '&:hover fieldset': { borderColor: '#FBBF24' },
//                     '&.Mui-focused fieldset': { borderColor: '#F97316' },
//                   }
//                 }}
//               />
//               <Button
//                 onClick={handleJoinVideoCall}
//                 variant="contained"
//                 startIcon={<VideoCallIcon />}
//                 sx={{
//                   background: '#F97316',
//                   borderRadius: '12px',
//                   padding: '14px 24px',
//                   textTransform: 'none',
//                   fontWeight: 600,
//                   fontSize: '0.95rem',
//                   whiteSpace: 'nowrap',
//                   boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
//                   '&:hover': {
//                     background: '#EA580C',
//                     boxShadow: '0 6px 20px rgba(249,115,22,0.4)',
//                   }
//                 }}
//               >
//                 Join
//               </Button>
//             </div>

//             <div style={{
//               marginTop: '1.2rem',
//               paddingTop: '1.2rem',
//               borderTop: '1px solid #FDE68A',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}>
//               <VideoCallIcon sx={{ color: '#F59E0B', fontSize: '1rem' }} />
//               <span style={{ fontSize: '0.82rem', color: '#78716C' }}>
//                 HD video · Up to 100 participants · Secure & encrypted
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="rightPanel">
//           <img src="/meetingimage.png" alt="Meeting illustration" />
//         </div>
//       </div>
//     </>
//   );
// }

// export default withAuth(HomeComponent);


import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { IconButton, TextField, Button } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import LogoutIcon from '@mui/icons-material/Logout';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToHistory } = useContext(AuthContext);

  // ── LOGIC UNTOUCHED ──
  let handleJoinVideoCall = async () => {
    await addToHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      {/* ── NAVBAR ── */}
      <div className="navBar">
        <div className="navBrand">Meet<span>Nest</span></div>
        <div className="navActions">
          <IconButton
            onClick={() => navigate('/history')}
            sx={{ color: '#57534E', '&:hover': { background: '#FEF3C7' } }}
          >
            <RestoreIcon />
          </IconButton>
          {/* Hide "History" text on mobile */}
          <span style={{ fontSize: '0.85rem', color: '#57534E', marginRight: '4px' }}
            className="hideOnMobile">History</span>

          <Button
            onClick={() => {
              // ── LOGIC UNTOUCHED ──
              console.log(localStorage.getItem("token"));
              localStorage.removeItem("token");
              navigate("/auth");
            }}
            startIcon={<LogoutIcon />}
            sx={{
              color: '#57534E',
              fontSize: '0.85rem',
              textTransform: 'none',
              borderRadius: '50px',
              padding: '6px 12px',
              minWidth: 'auto',
              '&:hover': { background: '#FEF3C7' },
              '& .MuiButton-startIcon': { marginRight: { xs: 0, sm: '6px' } },
              '& .logoutLabel': { display: { xs: 'none', sm: 'inline' } },
            }}
          >
            <span className="logoutLabel">Log out</span>
          </Button>
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="meetContainer">
        <div className="leftPanel">
          <span className="landingTagline">✦ Ready to connect?</span>
          <h2>Start or join a <span>meeting</span> in seconds</h2>
          <p>Enter your meeting code below and jump right in — no downloads, no fuss.</p>

          <div className="joinCard">
            <label>Meeting Code</label>
            <div className="joinInputRow">
              <TextField
                onChange={e => setMeetingCode(e.target.value)}
                value={meetingCode}
                placeholder="e.g. abc-xyz-123"
                variant="outlined"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    background: '#FFFBEB',
                    '&:hover fieldset': { borderColor: '#FBBF24' },
                    '&.Mui-focused fieldset': { borderColor: '#F97316' },
                  }
                }}
              />
              <Button
                onClick={handleJoinVideoCall}
                variant="contained"
                startIcon={<VideoCallIcon />}
                fullWidth
                sx={{
                  background: '#F97316',
                  borderRadius: '12px',
                  padding: '14px 24px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
                  '&:hover': {
                    background: '#EA580C',
                    boxShadow: '0 6px 20px rgba(249,115,22,0.4)',
                  }
                }}
              >
                Join
              </Button>
            </div>

            <div style={{
              marginTop: '1.2rem', paddingTop: '1.2rem',
              borderTop: '1px solid #FDE68A',
              display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap',
            }}>
              <VideoCallIcon sx={{ color: '#F59E0B', fontSize: '1rem' }} />
              <span style={{ fontSize: '0.82rem', color: '#78716C' }}>
                HD video · Up to 100 participants · Secure & encrypted
              </span>
            </div>
          </div>
        </div>

        <div className="rightPanel">
          <img src="/meetingimage.png" alt="Meeting illustration" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
