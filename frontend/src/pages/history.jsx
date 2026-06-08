// import React from "react";
// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import {IconButton,TextField} from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Box from '@mui/material/Box';
// import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// export default function History(){
//     const {getHistoryOfUser}=useContext(AuthContext);
//     const [meetings,setMeetings]=useState([]);
//     const routeTo=useNavigate();
//     useEffect(()=>{
//         const fetchHistory=async () =>{
//             try{
//                 const history=await getHistoryOfUser();
//                 console.log(history);
//                 setMeetings(history);
//             }catch(error){
//                 //snakbar
//                 console.log(error);
//             }
//         }
//         fetchHistory();
//     },[])

//     let formatDate=(dateString)=>{
//         const date=new Date(Number(dateString));
//         const day=date.getDate().toString().padStart(2,"0");
//         const month=(date.getMonth()+1).toString().padStart(2,"0");
//         const year=date.getFullYear();

//         return `${day}/${month}/${year}`;
//     }
//     return (
//         <div>
//            <IconButton onClick={()=>{
//                             routeTo('/home');
//                         }}>
//                             <HomeIcon/>
//                         </IconButton>
//             {
                
//                 meetings.map((e,i) =>{
//                     return(
//                     <>
                        
//                         <Card key={i} variant="outlined">
//                             <CardContent>
//                                 <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
//                                     Code: {e.meetingCode}
//                                 </Typography>
//                                 <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Date:{formatDate(e.date)}</Typography>
//                                 <Typography variant="body2">
//                                     your history.
                                    
//                                 </Typography>
//                             </CardContent>
                            
//                         </Card>
//                     </>)
//                 })
//             }
//         </div>
//     )

// }

import React from "react";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import "../App.css";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  // ── LOGIC UNTOUCHED ──
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(Number(dateString));
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFFBEB' }}>
      {/* ── HEADER ── */}
      <div style={{
        background: 'white',
        borderBottom: '1px solid #FDE68A',
        padding: '1rem 2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 1px 4px rgba(251,191,36,0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <IconButton
          onClick={() => routeTo('/home')}
          sx={{
            background: '#FEF3C7',
            color: '#D97706',
            '&:hover': { background: '#FDE68A' },
            borderRadius: '10px',
          }}
        >
          <HomeIcon />
        </IconButton>
        <div>
          <div style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: '1.3rem',
            color: '#292524',
            letterSpacing: '-0.02em',
          }}>
            Meeting History
          </div>
          <div style={{ fontSize: '0.8rem', color: '#78716C' }}>
            {meetings.length} meeting{meetings.length !== 1 ? 's' : ''} attended
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: '2rem', maxWidth: 700, margin: '0 auto' }}>

        {meetings.length === 0 ? (
          <div style={{
            textAlign: 'center',
            paddingTop: '5rem',
            color: '#A8A29E',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <div style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#57534E',
              marginBottom: '0.5rem',
            }}>
              No meetings yet
            </div>
            <div style={{ fontSize: '0.9rem' }}>
              Join your first meeting from the home page!
            </div>
          </div>
        ) : (
          meetings.map((e, i) => (
            <div key={i} className="meetingCard">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: '#FEF3C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <MeetingRoomIcon sx={{ color: '#F97316', fontSize: '1.3rem' }} />
                </div>
                <div>
                  <div className="meetingCode">{e.meetingCode}</div>
                  <div className="meetingDate" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '3px',
                  }}>
                    <CalendarTodayIcon sx={{ fontSize: '0.7rem', color: '#A8A29E' }} />
                    {formatDate(e.date)}
                  </div>
                </div>
              </div>
              <span className="meetingBadge">Attended</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
