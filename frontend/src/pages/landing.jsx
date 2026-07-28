import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../App.css";

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 520 600"
      xmlns="http://www.w3.org/2000/svg"
      style={{ height: "68vh", width: "auto" }}
    >
      <defs>
        <linearGradient id="cardBg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>
        <linearGradient id="cardBg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="avatarA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="avatarB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* soft background blobs */}
      <circle cx="90" cy="90" r="70" fill="#FDE68A" opacity="0.55" />
      <circle cx="460" cy="520" r="90" fill="#FB923C" opacity="0.18" />

      {/* floating connection dots */}
      <circle cx="60" cy="260" r="7" fill="#F97316" opacity="0.7" />
      <circle cx="40" cy="300" r="4" fill="#FBBF24" opacity="0.7" />
      <circle cx="470" cy="180" r="6" fill="#F59E0B" opacity="0.6" />
      <path d="M60 260 L40 300" stroke="#FDBA74" strokeWidth="1.5" strokeDasharray="4 5" />

      {/* Back call card */}
      <g transform="rotate(6 300 300)">
        <rect x="230" y="120" width="230" height="420" rx="28" fill="url(#cardBg2)" stroke="#FBBF24" strokeWidth="1.5" />
        {/* status bar */}
        <circle cx="255" cy="150" r="3" fill="#B45309" opacity="0.5" />
        <circle cx="267" cy="150" r="3" fill="#B45309" opacity="0.5" />
        <circle cx="279" cy="150" r="3" fill="#B45309" opacity="0.5" />
        {/* abstract avatar */}
        <circle cx="345" cy="290" r="70" fill="url(#avatarB)" />
        <circle cx="345" cy="266" r="26" fill="#FFFBEB" opacity="0.9" />
        <path d="M300 340 Q345 305 390 340 L390 360 Q345 385 300 360 Z" fill="#FFFBEB" opacity="0.9" />
        {/* bottom controls */}
        <circle cx="300" cy="500" r="20" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1" />
        <rect x="292" y="492" width="16" height="16" rx="4" fill="#57534E" opacity="0.6" />
        <circle cx="345" cy="500" r="20" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1" />
        <circle cx="345" cy="500" r="7" fill="#57534E" opacity="0.6" />
        <circle cx="390" cy="500" r="20" fill="#EF4444" />
        <path d="M382 492 L398 508 M398 492 L382 508" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Front call card */}
      <g transform="rotate(-5 220 320)">
        <rect x="70" y="150" width="230" height="420" rx="28" fill="url(#cardBg1)" stroke="#FB923C" strokeWidth="1.5" />
        {/* status bar */}
        <text x="90" y="180" fontFamily="'Sora', sans-serif" fontSize="14" fill="#57534E">9:41</text>
        <circle cx="270" cy="176" r="3" fill="#57534E" opacity="0.5" />
        <circle cx="280" cy="176" r="3" fill="#57534E" opacity="0.5" />
        {/* abstract avatar */}
        <circle cx="185" cy="320" r="78" fill="url(#avatarA)" />
        <circle cx="185" cy="294" r="28" fill="#FFF7ED" />
        <path d="M136 380 Q185 340 234 380 L234 402 Q185 430 136 402 Z" fill="#FFF7ED" />
        {/* connecting badge */}
        <rect x="120" y="470" width="130" height="30" rx="15" fill="#FFEDD5" stroke="#FB923C" strokeWidth="1" />
        <circle cx="138" cy="485" r="5" fill="#22C55E" />
        <text x="152" y="490" fontFamily="'DM Sans', sans-serif" fontSize="13" fill="#9A3412">Connected</text>
        {/* bottom controls */}
        <circle cx="130" cy="540" r="20" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1" />
        <path d="M122 532 L138 548 M138 532 L122 548" stroke="#57534E" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <circle cx="185" cy="540" r="22" fill="#F97316" />
        <circle cx="185" cy="540" r="8" fill="#FFFFFF" />
        <circle cx="240" cy="540" r="20" fill="#EF4444" />
        <path d="M232 532 L248 548 M248 532 L232 548" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

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
          <HeroIllustration />
        </div>
      </div>
    </div>
  );
}
