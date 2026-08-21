export default function HospitalDetail({ hospital, goTo, onBook, backRoute }) {
  const r = hospital.resources;

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 73px)', overflow: 'hidden', backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif', padding: '40px 24px' }}>
      
      {/* --- CSS Animations & Glassmorphism --- */}
      <style>{`
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.5; z-index: 0; animation: float 12s infinite ease-in-out alternate; pointer-events: none; }
        .orb-1 { width: 500px; height: 500px; background: #34D399; top: -100px; left: -100px; }
        .orb-2 { width: 400px; height: 400px; background: #60A5FA; bottom: -50px; right: -50px; animation-delay: -5s; }
        
        @keyframes float { 
          0% { transform: translate(0, 0) scale(1); } 
          100% { transform: translate(40px, 40px) scale(1.1); } 
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
        }

        .fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }

        .tag-pill {
          background: rgba(255,255,255,0.8);
          border: 1px solid #E2E8F0;
          color: #475569;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
      `}</style>

      {/* --- Animated Background Orbs --- */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto' }}>
        
        <button 
          onClick={() => goTo(backRoute)}
          style={{ background: 'transparent', border: 'none', color: '#64748B', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back
        </button>

        {/* Header */}
        <div className="glass-card fade-in-up" style={{ padding: '40px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', margin: '0 0 12px 0', letterSpacing: '-1px' }}>{hospital.name}</h2>
            <div style={{ display: 'flex', alignItems: 'center', color: '#475569', fontSize: '1.1rem', fontWeight: '600' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '8px', color: '#059669' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg>
              {hospital.distanceKm} km away from your location
            </div>
          </div>
          <span style={{ 
            padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase',
            backgroundColor: hospital.crowdLevel === 'Low' ? '#D1FAE5' : hospital.crowdLevel === 'Medium' ? '#FEF3C7' : '#FEE2E2',
            color: hospital.crowdLevel === 'Low' ? '#065F46' : hospital.crowdLevel === 'Medium' ? '#92400E' : '#991B1B'
          }}>
            {hospital.crowdLevel} Crowd
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          
          {/* Left Column: Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-card fade-in-up" style={{ padding: '32px', animationDelay: '0.1s' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '20px', fontWeight: '800' }}>Departments</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {hospital.departments.map(dept => <span key={dept} className="tag-pill">{dept}</span>)}
              </div>
            </div>

            <div className="glass-card fade-in-up" style={{ padding: '32px', animationDelay: '0.2s' }}>
              <h3 style={{ fontSize: '1.4rem', color: '#0F172A', marginBottom: '20px', fontWeight: '800' }}>Specialists on Duty</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(hospital.doctors).map(([dept, docs]) => (
                  <div key={dept} style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
                    <span style={{ display: 'block', color: '#059669', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '4px' }}>{dept}</span>
                    <span style={{ color: '#0F172A', fontWeight: '600', fontSize: '1.1rem' }}>{docs.join(", ")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live Tracking */}
          <div className="glass-card fade-in-up" style={{ padding: '32px', display: 'flex', flexDirection: 'column', animationDelay: '0.3s', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ width: '12px', height: '12px', backgroundColor: '#EF4444', borderRadius: '50%', boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)' }}></span>              <h3 style={{ fontSize: '1.6rem', color: '#0F172A', margin: 0, fontWeight: '900' }}>Live Resources</h3>
            </div>
            <p style={{ color: '#64748B', fontWeight: '500', marginBottom: '32px' }}>Data synced in real-time with facility staff.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', flex: 1 }}>
              <ResourceStat label="Available Beds" value={r.beds} />
              <ResourceStat label="ICU Capacity" value={r.icuBeds} />
              <ResourceStat label="Oxygen Units" value={r.oxygenUnits} />
              <ResourceStat label="Ambulances" value={r.ambulances} />
            </div>

            <button onClick={onBook} style={{ width: '100%', padding: '20px', marginTop: '32px', backgroundColor: '#0F172A', color: '#fff', fontSize: '1.15rem', fontWeight: '800', borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 10px 20px -5px rgba(15, 23, 42, 0.3)', transition: 'all 0.3s' }}>
              Book Appointment →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function ResourceStat({ label, value }) {
  const isLow = value <= 3;
  return (
    <div style={{ backgroundColor: isLow ? '#FEF2F2' : '#F1F5F9', padding: '20px', borderRadius: '16px', border: `1px solid ${isLow ? '#FECACA' : '#E2E8F0'}` }}>
      <span style={{ display: 'block', fontSize: '2rem', fontWeight: '900', color: isLow ? '#EF4444' : '#0F172A', marginBottom: '4px' }}>{value}</span>
      <span style={{ fontSize: '0.9rem', fontWeight: '700', color: isLow ? '#991B1B' : '#64748B' }}>{label}</span>
    </div>
  );
}