// import { Link, useNavigate } from "react-router-dom";
// import React from "react";

// export default function LandingPage(){
//     let routeTo=useNavigate()
//     return(
//         <div className="landingPageContainer">
//             <nav>
//                 <div className="navHeader">
//                     <h2>Video Conferencing</h2>
//                 </div>
//                 <div className="navList">
//                     <p onClick={()=>{
//                         routeTo('/qwerguest')
//                     }}>Join as Guest</p>
//                     <p onClick={()=>{
//                         routeTo('/auth')
//                     }} >Register</p>
//                     <div onClick={()=>{
//                         routeTo('/auth')
//                     }}role="button">
//                         <p>Login</p>
//                     </div>
//                 </div>
//             </nav>
//             <div className="landingMainContainer">
//                 <div>
//                     <h1><span style={{color:'orange'}}>Connect with milllions!</span></h1>
//                     <p>Cover a distance with V-Conferencing App</p>
                    
//                     <div role="button">
//                         <Link to={"/auth"}>Get Started</Link>
//                     </div>
//                 </div>
//                 <div>

//                     <img src="/mobile.png" alt="not found" />
//                 </div>
//             </div>
//         </div>
//     )
// }

// import { Link, useNavigate } from "react-router-dom";
// import React from "react";
// import "../App.css";

// export default function LandingPage() {
//   let routeTo = useNavigate();

//   return (
//     <div className="landingPageContainer">
//       <nav>
//         <div className="navHeader">
//           <h2>Meet<span>Nest</span></h2>
//         </div>
//         <div className="navList">
//           <button
//             className="navPill"
//             onClick={() => { routeTo('/qwerguest'); }}
//           >
//             Join as Guest
//           </button>
//           <button
//             className="navPill"
//             onClick={() => { routeTo('/auth'); }}
//           >
//             Register
//           </button>
//           <button
//             className="navPillPrimary"
//             onClick={() => { routeTo('/auth'); }}
//           >
//             Login
//           </button>
//         </div>
//       </nav>

//       <div className="landingMainContainer">
//         <div className="landingHeroText">
//           <span className="landingTagline">✦ Video Conferencing</span>
//           <h1>
//             Connect with <span>millions</span> of people
//           </h1>
//           <p>
//             High-quality video meetings, seamless collaboration, and crystal-clear audio — all in one place. Bridge every distance effortlessly.
//           </p>
//           <Link to="/auth" className="heroBtn">
//             Get Started →
//           </Link>
//         </div>

//         <div className="landingHeroImg">
//           <img src="/mobile.png" alt="App preview" />
//         </div>
//       </div>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../App.css";

export default function LandingPage() {
  let routeTo = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>Meet<span>Nest</span></h2>
        </div>

        {/* Desktop nav */}
        <div className="navList">
          <button className="navPill hideTablet" onClick={() => routeTo('/qwerguest')}>
            Join as Guest
          </button>
          <button className="navPill hideTablet" onClick={() => routeTo('/auth')}>
            Register
          </button>
          <button className="navPillPrimary" onClick={() => routeTo('/auth')}>
            Login
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', zIndex: 200,
          display: 'flex', flexDirection: 'column',
        }} onClick={() => setMenuOpen(false)}>
          <div style={{
            background: 'white', padding: '1.5rem',
            display: 'flex', flexDirection: 'column', gap: '0.75rem',
            borderBottom: '1px solid #FDE68A',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' }}>
              <span style={{ fontFamily:"'Sora',sans-serif", fontWeight:700, fontSize:'1.1rem' }}>
                Meet<span style={{color:'#F97316'}}>Nest</span>
              </span>
              <button onClick={() => setMenuOpen(false)} style={{
                background:'none', border:'none', fontSize:'1.4rem', cursor:'pointer', color:'#57534E'
              }}>✕</button>
            </div>
            {[
              { label: 'Join as Guest', action: () => { routeTo('/qwerguest'); setMenuOpen(false); } },
              { label: 'Register',      action: () => { routeTo('/auth');       setMenuOpen(false); } },
              { label: 'Login',         action: () => { routeTo('/auth');       setMenuOpen(false); } },
            ].map(item => (
              <button key={item.label} onClick={item.action} style={{
                padding: '0.85rem 1rem', borderRadius: '12px',
                border: '1px solid #FDE68A', background: '#FFFBEB',
                fontFamily: "'DM Sans',sans-serif", fontWeight: 500,
                fontSize: '0.95rem', cursor: 'pointer', textAlign: 'left', color: '#292524',
              }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="landingMainContainer">
        <div className="landingHeroText">
          <span className="landingTagline">✦ Video Conferencing</span>
          <h1>Connect with <span>millions</span> of people</h1>
          <p>
            High-quality video meetings, seamless collaboration, and crystal-clear audio — all in one place. Bridge every distance effortlessly.
          </p>
          <Link to="/auth" className="heroBtn">Get Started →</Link>
        </div>

        <div className="landingHeroImg">
          <img src="/mobile.png" alt="App preview" />
        </div>
      </div>
    </div>
  );
}
