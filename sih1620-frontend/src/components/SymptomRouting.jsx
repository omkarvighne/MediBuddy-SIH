import { useState } from "react";

export default function SymptomRouting({ hospitals, onMatch, goTo }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const SYMPTOMS = [
    { id: "chest_pain", label: "Severe Chest Pain / Cardiac", icon: "🫀", dept: "Cardiology", tag: "Heart Attack Risk" },
    { id: "trauma", label: "Physical Trauma / Fracture", icon: "🦴", dept: "Orthopedics", tag: "Accidents / Breaks" },
    { id: "neuro", label: "Sudden Numbness / Stroke Signs", icon: "🧠", dept: "Neurology", tag: "Paralysis / Slurred Speech" },
    { id: "breath", label: "Difficulty Breathing", icon: "🫁", dept: "Pulmonology", tag: "Asthma / Severe Cough" },
    { id: "burn", label: "Severe Burns / Wounds", icon: "🔥", dept: "Emergency", tag: "Trauma Care" },
    { id: "child", label: "Pediatric Emergency", icon: "👶", dept: "Pediatrics", tag: "Infant Care" },
    { id: "fever", label: "Fever", icon: "🌡️", dept: "General Medicine", tag: "Common Illness" },
    { id: "cold_cough", label: "Cough, Cold & Flu", icon: "🤧", dept: "General Medicine", tag: "Common Illness" },
    { id: "headache", label: "Headache / Migraine", icon: "🤕", dept: "Neurology", tag: "Recurring / Severe" },
    { id: "stomach", label: "Stomach Pain / Digestive Issues", icon: "🤢", dept: "Gastroenterology", tag: "Nausea / Indigestion" },
    { id: "skin", label: "Skin Rash / Allergy", icon: "🩹", dept: "Dermatology", tag: "Irritation / Allergy" },
    { id: "eye", label: "Eye Irritation / Vision Issues", icon: "👁️", dept: "Ophthalmology", tag: "Vision Care" },
    { id: "dental", label: "Tooth Pain / Dental Issue", icon: "🦷", dept: "Dentistry", tag: "Oral Care" },
    { id: "body_ache", label: "Body Ache / Fatigue", icon: "💊", dept: "General Medicine", tag: "General Checkup" },
    { id: "urinary", label: "Urinary Issues", icon: "🩺", dept: "Urology", tag: "UTI / Kidney" },
    { id: "pregnancy", label: "Pregnancy Related", icon: "🤰", dept: "Gynecology", tag: "Maternity Care" },
  ];

  const filteredSymptoms = SYMPTOMS.filter(
    (s) =>
      s.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRoute = () => {
    if (!selected) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const targetDept = SYMPTOMS.find((s) => s.id === selected).dept;
      const matches = hospitals
        .filter((h) => h.departments.includes(targetDept))
        .sort((a, b) => a.distanceKm - b.distanceKm);
      const match = matches[0] || hospitals[0];
      onMatch(match.id);
    }, 1200);
  };

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 73px)", overflow: "hidden", backgroundColor: "#F8FAFC", fontFamily: "Inter, sans-serif", padding: "40px 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>

      <style>{`
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; z-index: 0; animation: float 12s infinite ease-in-out alternate; pointer-events: none; }
        .orb-1 { width: 500px; height: 500px; background: #818CF8; top: -100px; left: -100px; }
        .orb-2 { width: 400px; height: 400px; background: #34D399; bottom: -50px; right: -50px; animation-delay: -5s; }
        @keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(40px, 40px) scale(1.1); } }

        .glass-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
        }

        .sym-btn {
          background: #F8FAFC;
          border: 2px solid transparent;
          border-radius: 16px;
          padding: 20px;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
        }
        .sym-btn:hover { background: #F1F5F9; transform: translateY(-2px); }
        .sym-btn.active {
          background: #D1FAE5;
          border: 2px solid #059669;
          box-shadow: 0 4px 15px rgba(5,150,105,0.15);
        }
        .fade-in-up { animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div className="glass-card fade-in-up" style={{ position: "relative", zIndex: 10, maxWidth: "850px", width: "100%", padding: "40px" }}>

        {isAnalyzing ? (
          <div style={{ padding: "60px 0", textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", border: "4px solid #E2E8F0", borderTopColor: "#059669", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 32px auto" }}></div>
            <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#0F172A", margin: "0 0 12px 0" }}>Matching Specialist...</h2>
            <p style={{ color: "#64748B", fontSize: "1.2rem", fontWeight: "500" }}>Evaluating nearest facility capabilities.</p>
          </div>
        ) : (
          <>
            <button
              onClick={() => goTo("home")}
              style={{ background: "transparent", border: "none", color: "#64748B", fontSize: "1rem", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back
            </button>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: "#0F172A", margin: "0 0 8px 0", letterSpacing: "-1px" }}>Find by Symptom</h2>
            <p style={{ color: "#475569", fontSize: "1.05rem", marginBottom: "24px", fontWeight: "500" }}>Search your issue or select a condition below to route instantly to a nearby facility.</p>

            <div style={{ marginBottom: "24px", position: "relative" }}>
              <svg style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#64748B" }} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                type="text"
                placeholder="Search symptoms or conditions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%", padding: "14px 16px 14px 48px", borderRadius: "12px", border: "1px solid #E2E8F0", fontSize: "1rem", backgroundColor: "#fff", outline: "none", fontWeight: "500" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "32px", maxHeight: "350px", overflowY: "auto" }}>
              {filteredSymptoms.map((s) => (
                <button
                  key={s.id}
                  className={`sym-btn ${selected === s.id ? "active" : ""}`}
                  onClick={() => setSelected(s.id)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span style={{ fontSize: "1.8rem" }}>{s.icon}</span>
                    <span style={{ fontSize: "0.7rem", fontWeight: "800", backgroundColor: "#E2E8F0", padding: "2px 8px", borderRadius: "10px", color: "#475569" }}>{s.tag}</span>
                  </div>
                  <span style={{ display: "block", fontSize: "1.05rem", fontWeight: "800", color: "#0F172A", marginBottom: "4px" }}>{s.label}</span>
                  <span style={{ fontSize: "0.85rem", color: "#059669", fontWeight: "700" }}>→ {s.dept}</span>
                </button>
              ))}
              {filteredSymptoms.length === 0 && (
                <p style={{ color: "#64748B", fontWeight: "600", gridColumn: "1 / -1", textAlign: "center", padding: "20px 0" }}>
                  No matching symptoms found.
                </p>
              )}
            </div>

            <button
              onClick={handleRoute}
              disabled={!selected}
              style={{
                width: "100%", padding: "18px", fontSize: "1.1rem", fontWeight: "800", borderRadius: "14px", border: "none", transition: "all 0.3s",
                backgroundColor: selected ? "#059669" : "#E2E8F0",
                color: selected ? "#fff" : "#94A3B8",
                cursor: selected ? "pointer" : "not-allowed",
                boxShadow: selected ? "0 10px 20px -5px rgba(5, 150, 105, 0.3)" : "none",
              }}
            >
              Route to Nearest Specialist →
            </button>
          </>
        )}
      </div>
    </div>
  );
}