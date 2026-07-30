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
      const date = new Date(dateString);

      return date.toLocaleDateString("en-IN",{
          day:"2-digit",
          month:"long",
          year:"numeric"
      });
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
      <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>

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

                  <div style={{
                      display:"flex",
                      justifyContent:"space-between",
                      alignItems:"center"
                  }}>

                      <div style={{
                          display:'flex',
                          alignItems:'center',
                          gap:"14px"
                      }}>

                          <div style={{
                              width:44,
                              height:44,
                              borderRadius:'12px',
                              background:'#FEF3C7',
                              display:'flex',
                              alignItems:'center',
                              justifyContent:'center'
                          }}>
                              <MeetingRoomIcon 
                              sx={{
                                  color:'#F97316'
                              }}/>
                          </div>


                          <div>

                              <div className="meetingCode">
                                  {e.meetingCode}
                              </div>


                              <div className="meetingDate">

                                  <CalendarTodayIcon 
                                  sx={{
                                      fontSize:"0.8rem"
                                  }}/>

                                  {formatDate(e.createdAt)}

                              </div>

                          </div>

                      </div>


                      <span className="meetingBadge">
                          Completed
                      </span>


                  </div>


                  {/* Participants */}

                  <div style={{
                      marginTop:"15px",
                      fontSize:"0.9rem",
                      color:"#57534E"
                  }}>
                      <div className="sectionTitle">
                      👥 Participants
                      </div>

                      <div style={{
                      display:"flex",
                      gap:"8px",
                      flexWrap:"wrap"
                      }}>

                      {
                      e.participants?.map((person,index)=>(
                      <span
                      key={index}
                      style={{
                      background:"#FEF3C7",
                      padding:"6px 12px",
                      borderRadius:"20px",
                      fontSize:"0.8rem",
                      color:"#92400E"
                      }}
                      >
                      {person}
                      </span>
                      ))
                      }

                      </div>
                      {/* 👥 
                      {e.participants?.join(", ")} */}

                  </div>



                  {/* AI Summary */}
                  <div className="aiSection">

                  <h4 className="sectionTitle">
                  AI Summary
                  </h4>

                  <p className="summaryText">
                  {e.aiNotes?.summary}
                  </p>

                  </div>



                  {/* Key Points */}
                  <div className="aiSection">

                  <h4 className="sectionTitle">
                  Key Points
                  </h4>


                  <ul className="pointList">

                  {
                  e.aiNotes?.keyPoints?.map((p,index)=>(
                  <li key={index}>
                  {p}
                  </li>
                  ))
                  }

                  </ul>

                  </div>

                  {/* Action Items */}

                  {
                  e.aiNotes?.actionItems?.length>0 &&
                  <div className="aiSection">

                  <h4 className="sectionTitle">
                  Action Items
                  </h4>


                  <ul className="pointList">

                  {
                  e.aiNotes?.actionItems?.map((a,index)=>(
                  <li key={index}>
                  {a}
                  </li>
                  ))
                  }

                  </ul>

                  </div>


                  }



              </div>
          ))
          
        )}
      </div>
    </div>
  );
}
