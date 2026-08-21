import React from "react";

export default function Home({ hospitals, goTo, onSelectHospital, isSearching, setIsSearching }) {
  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 73px)', overflow: 'hidden', backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif', padding: '40px 24px' }}>
      
      {/* --- CSS Animations & Glassmorphism --- */}
      <style>{`
        /* Animated Background Orbs */
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.5; z-index: 0; animation: float 12s infinite ease-in-out alternate; pointer-events: none; }
        .orb-1 { width: 500px; height: 500px; background: #34D399; top: -100px; left: -100px; }
        .orb-2 { width: 400px; height: 400px; background: #60A5FA; bottom: -50px; right: -50px; animation-delay: -5s; }
        .orb-3 { width: 450px; height: 450px; background: #F87171; top: 30%; left: 40%; animation-duration: 18s; opacity: 0.3; }
        
        @keyframes float { 
          0% { transform: translate(0, 0) scale(1); } 
          100% { transform: translate(40px, 40px) scale(1.1); } 
        }
        
        /* Premium Glass Card */
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
        }
        .glass-card-hover:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); 
          border: 1px solid rgba(255, 255, 255, 1);
          cursor: pointer;
        }

        /* Emergency Button */
        .btn-emergency-premium {
          background: linear-gradient(135deg, #EF4444, #DC2626);
          color: white;
          padding: 20px 40px;
          font-size: 1.25rem;
          font-weight: 900;
          border-radius: 16px;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.5);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-emergency-premium:hover {
          transform: scale(1.03) translateY(-2px);
          box-shadow: 0 20px 35px -5px rgba(239, 68, 68, 0.6);
        }
        
        /* Pulse Indicator */
        .pulse-dot {
          width: 12px; height: 12px; background-color: #EF4444; border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          animation: pulseRed 2s infinite;
          display: inline-block;
          margin-right: 12px;
        }
        @keyframes pulseRed {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        /* Staggered Fade In */
        .fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(30px); } 
          to { opacity: 1; transform: translateY(0); } 
        }

        /* Layout Grids */
        .premium-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
      `}</style>

      {/* --- Animated Background Orbs --- */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {/* --- Foreground Content --- */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* HERO CARD */}
        <div className="glass-card fade-in-up" style={{ padding: '48px 24px', textAlign: 'center', marginBottom: '40px', animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
            <span className="pulse-dot"></span>
            <span style={{ fontWeight: '700', color: '#EF4444', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Emergency Network Active</span>
          </div>
          
          <h2 style={{ fontSize: '3rem', fontWeight: '900', color: '#0F172A', letterSpacing: '-1px', marginBottom: '16px' }}>Need help right now?</h2>
          <p style={{ color: '#475569', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
            Trigger the 60-second emergency response system, or browse our smart directory for specific care.
          </p>
          
          <button className="btn-emergency-premium" onClick={() => goTo("emergency")}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            EMERGENCY RESPONSE
          </button>
          
          <div style={{ marginTop: '32px' }}>
            {!isSearching ? (
              <button 
                onClick={() => setIsSearching(true)}
                style={{ background: 'transparent', border: 'none', color: '#059669', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', borderBottom: '2px solid rgba(5,150,105,0.3)', paddingBottom: '4px', transition: 'all 0.2s' }}
              >
                No Emergency — Search Hospitals ↓
              </button>
            ) : (
              <button 
                onClick={() => setIsSearching(false)}
                style={{ background: 'transparent', border: 'none', color: '#64748B', fontSize: '1.1rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                ↑ Hide Search Options
              </button>
            )}
          </div>
        </div>

        {/* SEARCH SECTION */}
        {isSearching && (
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            
            {/* Action Tools */}
            <div className="premium-grid" style={{ marginBottom: '48px' }}>
              
              <div className="glass-card glass-card-hover" onClick={() => goTo("symptoms")} style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: '#DBEAFE', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', color: '#2563EB' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '8px', fontWeight: '800' }}>Find by Symptom</h3>                <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>Match your specific symptoms to the right specialized department.</p>
              </div>

              <div className="glass-card glass-card-hover" onClick={() => goTo("search")} style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: '#E0E7FF', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', color: '#4F46E5' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '8px', fontWeight: '800' }}>General Search</h3>
                <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>Browse all available hospitals, clinics, and medical facilities directly.</p>
              </div>

              <div className="glass-card glass-card-hover" onClick={() => goTo("recommend")} style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: '#D1FAE5', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', color: '#059669' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"></path></svg>
                </div>
                <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '8px', fontWeight: '800' }}>AI Top Matches</h3>
                <p style={{ color: '#475569', lineHeight: '1.6', margin: 0 }}>Get instant, ranked recommendations based on current global capacity.</p>
              </div>

            </div>

            {/* Nearby Hospitals Display */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0F172A', margin: 0 }}>Nearby Facilities</h3>
              <button onClick={() => goTo("search")} style={{ background: 'transparent', border: 'none', color: '#059669', fontWeight: '800', cursor: 'pointer', fontSize: '1rem' }}>See all →</button>
            </div>
            
            <div className="premium-grid">
              {hospitals.slice(0, 6).map((h, i) => (
                <div
                  key={h.id}
                  className="glass-card glass-card-hover fade-in-up"
                  style={{ padding: '24px', animationDelay: `${0.3 + (i * 0.1)}s` }}
                  onClick={() => onSelectHospital(h.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', margin: 0, paddingRight: '10px' }}>{h.name}</h4>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: '800', 
                      textTransform: 'uppercase',
                      backgroundColor: h.crowdLevel === 'Low' ? '#D1FAE5' : h.crowdLevel === 'Medium' ? '#FEF3C7' : '#FEE2E2',
                      color: h.crowdLevel === 'Low' ? '#065F46' : h.crowdLevel === 'Medium' ? '#92400E' : '#991B1B'
                    }}>
                      {h.crowdLevel}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', color: '#64748B', fontSize: '0.95rem', fontWeight: '600' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px', color: '#059669' }}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {h.distanceKm} km away
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        )}

      </div>
    </div>
  );
}