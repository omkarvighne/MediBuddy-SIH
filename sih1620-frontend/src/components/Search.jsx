import { useState } from "react";

export default function Search({ hospitals, goTo, onSelectHospital, onCompareSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [compareList, setCompareList] = useState([]);

  const filtered = hospitals.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.departments.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleCompare = (id, e) => {
    e.stopPropagation(); // Prevents the card from opening the detail page when clicking the compare button
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(hid => hid !== id) : [...prev, id]
    );
  };

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
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .glass-card-hover:hover { 
          transform: translateY(-4px); 
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08); 
          cursor: pointer;
        }

        .fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes fadeInUp { 
          from { opacity: 0; transform: translateY(20px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>

      {/* --- Animated Background Orbs --- */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header & Search Bar */}
        <div style={{ marginBottom: '32px' }}>
          <button 
            onClick={() => goTo("home")}
            style={{ background: 'transparent', border: 'none', color: '#64748B', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Home
          </button>
          
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0F172A', marginBottom: '24px', letterSpacing: '-1px' }}>Search Facilities</h2>
          
          <div className="glass-card" style={{ position: 'relative', padding: '8px' }}>
            <svg style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              placeholder="Search by hospital name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '16px 24px 16px 60px', borderRadius: '12px', border: 'none', fontSize: '1.1rem', backgroundColor: 'transparent', color: '#0F172A', outline: 'none', fontWeight: '500' }}
            />
          </div>
        </div>

        {/* Floating Compare Action Bar */}
        {compareList.length > 0 && (
          <div className="glass-card fade-in-up" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', border: '2px solid #059669', backgroundColor: 'rgba(255,255,255,0.9)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '32px', height: '32px', backgroundColor: '#D1FAE5', color: '#059669', borderRadius: '50%', fontWeight: '900' }}>{compareList.length}</span>
              <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '1.1rem' }}>Facilities Selected</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setCompareList([])} style={{ backgroundColor: 'transparent', color: '#64748B', border: 'none', fontWeight: '700', cursor: 'pointer', padding: '10px' }}>Clear</button>
              <button onClick={() => onCompareSelect(compareList)} style={{ backgroundColor: '#059669', color: '#fff', padding: '12px 24px', borderRadius: '10px', border: 'none', fontWeight: '800', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(5, 150, 105, 0.3)' }}>
                Compare Now →
              </button>
            </div>
          </div>
        )}

        {/* Hospital List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map((h, i) => {
            const isSelected = compareList.includes(h.id);
            return (
              <div 
                key={h.id} 
                className="glass-card glass-card-hover fade-in-up" 
                onClick={() => onSelectHospital(h.id)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', animationDelay: `${i * 0.1}s`, border: isSelected ? '2px solid #059669' : '1px solid rgba(255, 255, 255, 1)' }}
              >
                <div>
                  <h3 style={{ margin: '0 0 8px 0', color: '#0F172A', fontSize: '1.4rem', fontWeight: '800' }}>{h.name}</h3>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase',
                      backgroundColor: h.crowdLevel === 'Low' ? '#D1FAE5' : h.crowdLevel === 'Medium' ? '#FEF3C7' : '#FEE2E2',
                      color: h.crowdLevel === 'Low' ? '#065F46' : h.crowdLevel === 'Medium' ? '#92400E' : '#991B1B'
                    }}>
                      {h.crowdLevel} Crowd
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#64748B', fontWeight: '600' }}>• {h.distanceKm} km away</span>
                  </div>
                  <p style={{ margin: '0', fontSize: '0.95rem', color: '#475569', fontWeight: '500' }}>{h.departments.slice(0,3).join(', ')}</p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                  <button style={{ color: '#059669', fontWeight: '800', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>View Details →</button>
                  <button 
                    onClick={(e) => toggleCompare(h.id, e)}
                    style={{ 
                      padding: '8px 16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
                      backgroundColor: isSelected ? '#059669' : '#F1F5F9',
                      color: isSelected ? '#fff' : '#475569',
                      border: isSelected ? '1px solid #059669' : '1px solid #E2E8F0'
                    }}
                  >
                    {isSelected ? '✓ Added' : '+ Compare'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}