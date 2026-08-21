export default function Compare({ hospitals, goTo, onSelectHospital }) {
  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 73px)', overflow: 'hidden', backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif', padding: '40px 24px' }}>
      
      {/* --- CSS Animations & Glassmorphism --- */}
      <style>{`
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; z-index: 0; animation: float 12s infinite ease-in-out alternate; pointer-events: none; }
        .orb-1 { width: 500px; height: 500px; background: #60A5FA; top: -100px; right: -100px; }
        .orb-2 { width: 400px; height: 400px; background: #34D399; bottom: -50px; left: -50px; animation-delay: -5s; }
        
        @keyframes float { 
          0% { transform: translate(0, 0) scale(1); } 
          100% { transform: translate(-40px, 40px) scale(1.1); } 
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
        }

        .fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <button 
            onClick={() => goTo("search")}
            style={{ background: 'transparent', border: 'none', color: '#64748B', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Search
          </button>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', margin: 0, letterSpacing: '-1px' }}>Facility Comparison</h2>
          <div style={{ width: '100px' }}></div> {/* Spacer for center alignment */}
        </div>

        <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', paddingBottom: '24px' }}>
          {hospitals.map((h, i) => (
            <div key={h.id} className="glass-card fade-in-up" style={{ minWidth: '320px', flex: 1, padding: '32px', animationDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column' }}>
              
              <h3 style={{ fontSize: '1.6rem', color: '#0F172A', margin: '0 0 8px 0', fontWeight: '900' }}>{h.name}</h3>
              <p style={{ color: '#059669', fontWeight: '800', margin: '0 0 24px 0', fontSize: '1.1rem' }}>{h.distanceKm} km away</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                <CompareStat label="Standard Beds" value={h.resources.beds} />
                <CompareStat label="ICU Beds" value={h.resources.icuBeds} highlight={h.resources.icuBeds > 5} />
                <CompareStat label="Oxygen Units" value={h.resources.oxygenUnits} />
                <CompareStat label="Ambulances" value={h.resources.ambulances} />
                
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
                  <span style={{ display: 'block', fontSize: '0.9rem', color: '#64748B', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Key Departments</span>
                  <p style={{ margin: 0, color: '#0F172A', fontWeight: '600', lineHeight: '1.5' }}>{h.departments.slice(0,4).join(', ')}</p>
                </div>
              </div>

              <button 
                onClick={() => onSelectHospital(h.id)} 
                style={{ width: '100%', padding: '16px', marginTop: '32px', backgroundColor: '#0F172A', color: '#fff', fontSize: '1.05rem', fontWeight: '800', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
              >
                View Details
              </button>

            </div>
          ))}
          {hospitals.length === 0 && (
            <div style={{ width: '100%', textAlign: 'center', padding: '60px', color: '#64748B', fontWeight: '600', fontSize: '1.2rem' }}>
              No facilities selected for comparison.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompareStat({ label, value, highlight }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: highlight ? '#D1FAE5' : '#F1F5F9', padding: '16px', borderRadius: '12px' }}>
      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: highlight ? '#065F46' : '#475569' }}>{label}</span>
      <span style={{ fontSize: '1.2rem', fontWeight: '900', color: highlight ? '#059669' : '#0F172A' }}>{value}</span>
    </div>
  );
}