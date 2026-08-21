import React from "react";

export default function LandingPage({ enterApp, setMode }) {
  const team = [
    { name: "Navneet", role: "Backend & Data", desc: "Powering the platform's brain by handling data aggregation, APIs, and backend infrastructure." },
    { name: "Omkar", role: "Frontend & Dashboards", desc: "Architecting the entire user interface and building the dynamic dashboards across all screens." },
    { name: "Bharat", role: "Frontend & GitHub", desc: "Co-piloting the frontend development and keeping the codebase pristine via version control." },
    { name: "Shiveksha", role: "Visuals & PPT", desc: "Designing the visual identity, UI assets, and crafting the high-impact pitch deck." },
    { name: "Laxmi", role: "Vocab & Presentation", desc: "Mastering the project narrative, refining the vocabulary, and delivering the winning presentation." },
    { name: "Rohan", role: "Backend & Routing", desc: "Engineering the core logic, intelligent suggestions, and the real-time symptom routing model." },
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      
      {/* --- CSS Animations & Glassmorphism --- */}
      <style>{`
        /* Animated Background Orbs */
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.6; z-index: 0; animation: float 12s infinite ease-in-out alternate; }
        .orb-1 { width: 600px; height: 600px; background: #34D399; top: -150px; left: -100px; }
        .orb-2 { width: 500px; height: 500px; background: #60A5FA; bottom: -100px; right: -100px; animation-delay: -5s; }
        .orb-3 { width: 400px; height: 400px; background: #818CF8; top: 40%; left: 30%; animation-duration: 15s; }
        
        @keyframes float { 
          0% { transform: translate(0, 0) scale(1); } 
          100% { transform: translate(60px, 60px) scale(1.1); } 
        }
        
        /* Premium Glass Card */
        .glass-card {
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
        }
        .glass-card:hover { 
          transform: translateY(-10px); 
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); 
          border: 1px solid rgba(255, 255, 255, 1);
        }

        /* Hover Buttons */
        .btn-glow { transition: all 0.3s ease; }
        .btn-glow:hover { transform: scale(1.05); box-shadow: 0 15px 30px rgba(5, 150, 105, 0.3); }
        .btn-outline { transition: all 0.3s ease; }
        .btn-outline:hover { transform: scale(1.05); background: rgba(255,255,255,0.9); box-shadow: 0 15px 30px rgba(0,0,0,0.05); }

        /* Staggered Fade In */
        .fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(40px); } 
          to { opacity: 1; transform: translateY(0); } 
        }

        /* 3-Up 3-Down Grid for Desktop */
        .perfect-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .perfect-grid { grid-template-columns: 1fr; }
        }

        /* Infinite Scrolling Marquee */
        .carousel-wrapper {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
          padding: 40px 0;
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
        .carousel-track {
          display: inline-block;
          animation: scrollMarquee 25s linear infinite;
        }
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-text {
          font-size: 4.5rem;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 2px rgba(15, 23, 42, 0.15);
          text-transform: uppercase;
          letter-spacing: -2px;
          padding: 0 30px;
          display: inline-flex;
          align-items: center;
        }
        .carousel-highlight {
          color: rgba(15, 23, 42, 0.8);
          -webkit-text-stroke: 0;
          margin-left: 12px;
        }
        .carousel-dot {
          width: 16px;
          height: 16px;
          background-color: #059669;
          border-radius: 50%;
          display: inline-block;
          margin: 0 20px;
        }
      `}</style>

      {/* --- Animated Background Orbs --- */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {/* --- HERO WRAPPER WITH VIDEO BACKGROUND --- */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingBottom: '40px' }}>
        
        {/* The Video Element - MUCH CLEARER NOW */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
            /* Dialed back the blur massively, kept brightness at 0.8 for text readability */
            filter: 'blur(3px) brightness(0.8)',
            transform: 'scale(1.05)', 
            opacity: 0.9 
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay so the video fades seamlessly into the page background */}
        <div style={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          width: '100%', 
          height: '150px', 
          background: 'linear-gradient(to bottom, transparent, #F8FAFC)', 
          zIndex: 1 
        }}></div>

        {/* Foreground Hero Content (Z-Index ensures it sits ON TOP of the video) */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
          
          {/* Navigation */}
          <nav className="fade-in-up" style={{ display: 'flex', justifyContent: 'center', padding: '32px', animationDelay: '0.1s' }}>
            <img src="/logo.png" alt="MediBuddy Logo" style={{ height: '70px', filter: 'drop-shadow(0px 4px 6px rgba(255,255,255,0.4))' }} />
          </nav>

          {/* Hero Section */}
          <header className="fade-in-up" style={{ textAlign: 'center', padding: '60px 20px 40px 20px', maxWidth: '900px', margin: '0 auto', animationDelay: '0.2s' }}>
            <h1 style={{ fontSize: '5rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-2px', lineHeight: '1.05', marginBottom: '24px', filter: 'drop-shadow(0px 4px 15px rgba(255,255,255,0.7))' }}>
              Intelligent Care.<br/>
              <span style={{ background: 'linear-gradient(135deg, #059669, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0px 2px 10px rgba(255,255,255,0.8))' }}>Delivered Instantly.</span>
            </h1>
            <p style={{ fontSize: '1.3rem', color: '#0F172A', lineHeight: '1.6', marginBottom: '48px', maxWidth: '750px', margin: '0 auto 48px auto', fontWeight: '700', textShadow: '0 2px 12px rgba(255,255,255,0.9)' }}>
              A real-time decision support platform bridging the critical gap between medical emergencies and immediate hospital care. Track resources, route symptoms, and save lives.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button 
                className="btn-glow"
                onClick={() => { setMode("patient"); enterApp("home"); }} 
                style={{ padding: '18px 40px', backgroundColor: '#059669', color: '#fff', fontSize: '1.15rem', fontWeight: '800', borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}
              >
                Launch Patient App
              </button>
              <button 
                className="btn-outline glass-card"
                onClick={() => { setMode("staff"); enterApp("home"); }} 
                style={{ padding: '18px 40px', color: '#0F172A', fontSize: '1.15rem', fontWeight: '800', borderRadius: '16px', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.85)' }}
              >
                Staff Dashboard
              </button>
            </div>
          </header>
        </div>
      </div>
      {/* --- END HERO WRAPPER --- */}

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Features Section */}
        <section style={{ padding: '40px 24px' }}>
          <div className="perfect-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            
            <div className="glass-card fade-in-up" style={{ padding: '40px', animationDelay: '0.3s' }}>
              <div style={{ width: '56px', height: '56px', backgroundColor: '#D1FAE5', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', color: '#059669' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '12px', fontWeight: '800' }}>60-Second Dispatch</h3>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem' }}>Automated geolocation sharing and countdown triggers for unresponsive patients.</p>
            </div>

            <div className="glass-card fade-in-up" style={{ padding: '40px', animationDelay: '0.4s' }}>
              <div style={{ width: '56px', height: '56px', backgroundColor: '#DBEAFE', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', color: '#2563EB' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '12px', fontWeight: '800' }}>Smart Symptom Routing</h3>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem' }}>Algorithmic matching of patient symptoms to specific hospital departments.</p>
            </div>

            <div className="glass-card fade-in-up" style={{ padding: '40px', animationDelay: '0.5s' }}>
              <div style={{ width: '56px', height: '56px', backgroundColor: '#F3E8FF', borderRadius: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px', color: '#9333EA' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#0F172A', marginBottom: '12px', fontWeight: '800' }}>Live Resource Tracking</h3>
              <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1.05rem' }}>Real-time synchronization of critical hospital inventory and ICU availability.</p>
            </div>

          </div>
        </section>

        {/* Infinite Carousel */}
        <section className="fade-in-up" style={{ animationDelay: '0.55s' }}>
          <div className="carousel-wrapper">
            <div className="carousel-track">
              <span className="carousel-text">EMERGENCY <span className="carousel-highlight">One tap is enough</span></span>
              <span className="carousel-dot"></span>
              <span className="carousel-text">RESOURCES <span className="carousel-highlight">Real-time impact</span></span>
              <span className="carousel-dot"></span>
              <span className="carousel-text">TRIAGE <span className="carousel-highlight">AI precision</span></span>
              <span className="carousel-dot"></span>
              <span className="carousel-text">DISPATCH <span className="carousel-highlight">Faster than ever</span></span>
              <span className="carousel-dot"></span>
              <span className="carousel-text">EMERGENCY <span className="carousel-highlight">One tap is enough</span></span>
              <span className="carousel-dot"></span>
              <span className="carousel-text">RESOURCES <span className="carousel-highlight">Real-time impact</span></span>
              <span className="carousel-dot"></span>
              <span className="carousel-text">TRIAGE <span className="carousel-highlight">AI precision</span></span>
              <span className="carousel-dot"></span>
              <span className="carousel-text">DISPATCH <span className="carousel-highlight">Faster than ever</span></span>
              <span className="carousel-dot"></span>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="fade-in-up" style={{ padding: '60px 24px 120px 24px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center', animationDelay: '0.6s' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', marginBottom: '60px' }}>The Architecture Team</h2>
          
          <div className="perfect-grid">
            {team.map((member, i) => (
              <div key={i} className="glass-card" style={{ padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                <span style={{ alignSelf: 'flex-start', padding: '6px 14px', backgroundColor: 'rgba(255,255,255,0.8)', color: '#0F172A', fontWeight: '800', borderRadius: '20px', fontSize: '0.85rem', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  {member.role}
                </span>
                <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0F172A', marginBottom: '12px' }}>{member.name}</h3>
                <p style={{ color: '#475569', lineHeight: '1.7', fontSize: '1rem', fontWeight: '500' }}>{member.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}