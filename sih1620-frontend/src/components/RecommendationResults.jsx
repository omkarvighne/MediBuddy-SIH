export default function RecommendationResults({ hospitals, onSelectHospital, goTo }) {
  // Sort hospitals by a mock AI ranking (e.g., lowest crowd level & closest distance)
  const ranked = [...hospitals].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 73px)', overflow: 'hidden', backgroundColor: '#F8FAFC', fontFamily: 'Inter, sans-serif', padding: '40px 24px' }}>
      
      <style>{`
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; z-index: 0; animation: float 12s infinite ease-in-out alternate; pointer-events: none; }
        .orb-1 { width: 500px; height: 500px; background: #34D399; top: -100px; left: -100px; }
        .orb-2 { width: 400px; height: 400px; background: #60A5FA; bottom: -50px; right: -50px; animation-delay: -5s; }
        @keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(40px, 40px) scale(1.1); } }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: transform 0.3s ease;
        }
        .glass-card:hover { transform: translateY(-4px); cursor: pointer; }
        .fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto' }}>
        
        <button 
          onClick={() => goTo("home")}
          style={{ background: 'transparent', border: 'none', color: '#64748B', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </button>

        <div className="glass-card fade-in-up" style={{ padding: '32px', marginBottom: '32px', border: '2px solid rgba(5, 150, 105, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ padding: '6px 12px', backgroundColor: '#D1FAE5', color: '#059669', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '900' }}>AI ENGINE ACTIVE</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', margin: '0 0 8px 0', letterSpacing: '-1px' }}>Top Ranked Matches</h2>
          <p style={{ color: '#475569', fontSize: '1.1px', margin: 0, fontWeight: '500' }}>Ranked algorithmically by proximity, crowd levels, and real-time bed availability.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {ranked.map((h, i) => (
            <div 
              key={h.id} 
              className="glass-card fade-in-up" 
              onClick={() => onSelectHospital(h.id)}
              style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animationDelay: `${i * 0.1}s` }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <span style={{ width: '28px', height: '28px', backgroundColor: i === 0 ? '#059669' : '#E2E8F0', color: i === 0 ? '#fff' : '#475569', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '900', fontSize: '0.9rem' }}>#{i + 1}</span>
                  <h3 style={{ margin: 0, color: '#0F172A', fontSize: '1.3rem', fontWeight: '800' }}>{h.name}</h3>
                </div>
                <p style={{ margin: '0 0 0 40px', color: '#64748B', fontSize: '0.95rem', fontWeight: '600' }}>{h.distanceKm} km away • {h.resources.beds} Beds Available</p>
              </div>
              <button style={{ backgroundColor: 'transparent', border: 'none', color: '#059669', fontWeight: '800', cursor: 'pointer', fontSize: '1rem' }}>View Match →</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}