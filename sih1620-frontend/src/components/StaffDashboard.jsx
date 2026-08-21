import { useState } from "react";

const AUTH_DB = {
  imhs: { pass: "imhs123", id: "imhs" },
  lifeline: { pass: "lifeline123", id: "lifeline" },
  manipal: { pass: "manipal123", id: "manipal" },
  metro: { pass: "metro123", id: "metro" },
  care: { pass: "care123", id: "care" },
};

export default function StaffDashboard({ hospitals, updateResource }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInHospitalId, setLoggedInHospitalId] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("inventory");
  const [triageStatus, setTriageStatus] = useState("incoming");

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanUser = username.toLowerCase().trim();
    const user = AUTH_DB[cleanUser];

    if (user && user.pass === password) {
      setLoggedInHospitalId(user.id);
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid hospital credentials. Please try again.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInHospitalId(null);
    setUsername("");
    setPassword("");
    setTriageStatus("incoming");
  };

  const glassStyles = `
    .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; z-index: 0; animation: float 12s infinite ease-in-out alternate; pointer-events: none; }
    .orb-1 { width: 500px; height: 500px; background: #60A5FA; top: -100px; right: -100px; }
    .orb-2 { width: 400px; height: 400px; background: #34D399; bottom: -50px; left: -50px; animation-delay: -5s; }
    @keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-40px, 40px) scale(1.1); } }

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

    .staff-input:focus { border-color: #059669 !important; box-shadow: 0 0 0 3px rgba(5,150,105,0.1); }
    .nav-tab-glass:hover { background: rgba(255,255,255,0.9) !important; }

    .pulse-red-dot {
      width: 10px; height: 10px; background-color: #EF4444; border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
      animation: pulseRedDot 2s infinite;
      display: inline-block;
    }
    @keyframes pulseRedDot {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 12px rgba(239, 68, 68, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
    }
  `;

  if (!isLoggedIn) {
    return (
      <div style={{ position: "relative", minHeight: "calc(100vh - 73px)", overflow: "hidden", backgroundColor: "#F8FAFC", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <style>{glassStyles}</style>
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>

        <div className="glass-card fade-in-up" style={{ position: "relative", zIndex: 10, padding: "48px", maxWidth: "440px", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ width: "64px", height: "64px", backgroundColor: "#DBEAFE", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 20px auto", color: "#2563EB" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#0F172A", margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>Staff Authentication</h2>
            <p style={{ color: "#64748B", fontWeight: "500", margin: 0 }}>Access hospital management portal.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {error && (
              <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B", padding: "12px 16px", borderRadius: "12px", fontSize: "0.9rem", fontWeight: "600" }}>
                {error}
              </div>
            )}

            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "700", color: "#475569", marginBottom: "8px" }}>Hospital ID</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g., imhs, lifeline, manipal"
                required
                className="staff-input"
                style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid #E2E8F0", fontSize: "1rem", backgroundColor: "#fff", outline: "none", fontWeight: "500", color: "#0F172A" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "700", color: "#475569", marginBottom: "8px" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="staff-input"
                style={{ width: "100%", padding: "14px 16px", borderRadius: "12px", border: "1px solid #E2E8F0", fontSize: "1rem", backgroundColor: "#fff", outline: "none", fontWeight: "500", color: "#0F172A" }}
              />
            </div>

            <button
              type="submit"
              style={{ width: "100%", padding: "18px", marginTop: "8px", backgroundColor: "#0F172A", color: "#fff", fontSize: "1.05rem", fontWeight: "800", borderRadius: "14px", border: "none", cursor: "pointer", boxShadow: "0 10px 20px -5px rgba(15, 23, 42, 0.3)" }}
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const activeHospital = hospitals.find((h) => h.id === loggedInHospitalId);
  const r = activeHospital?.resources;

  const handleUpdate = (key, delta) => {
    updateResource(loggedInHospitalId, key, delta);
  };

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 73px)", overflow: "hidden", backgroundColor: "#F8FAFC", fontFamily: "Inter, sans-serif", padding: "40px 24px" }}>
      <style>{glassStyles}</style>
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div className="glass-card fade-in-up" style={{ padding: "32px 40px", marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#0F172A", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>{activeHospital?.name}</h2>
            <p style={{ color: "#64748B", fontWeight: "600", margin: 0 }}>Facility Resource Management</p>
          </div>
          <button
            onClick={handleLogout}
            style={{ padding: "12px 22px", borderRadius: "12px", border: "1px solid #E2E8F0", backgroundColor: "rgba(255,255,255,0.9)", color: "#475569", fontWeight: "700", cursor: "pointer", fontSize: "0.95rem" }}
          >
            Secure Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="glass-card fade-in-up" style={{ display: "flex", gap: "8px", padding: "8px", marginBottom: "24px", width: "fit-content" }}>
          <button
            onClick={() => setActiveTab("inventory")}
            className="nav-tab-glass"
            style={{
              padding: "12px 24px", borderRadius: "12px", border: "none", cursor: "pointer", fontWeight: "700", fontSize: "0.95rem",
              backgroundColor: activeTab === "inventory" ? "#0F172A" : "transparent",
              color: activeTab === "inventory" ? "#fff" : "#475569",
              transition: "all 0.2s",
            }}
          >
            Live Inventory
          </button>
          <button
            onClick={() => setActiveTab("triage")}
            className="nav-tab-glass"
            style={{
              padding: "12px 24px", borderRadius: "12px", border: "none", cursor: "pointer", fontWeight: "700", fontSize: "0.95rem",
              backgroundColor: activeTab === "triage" ? "#0F172A" : "transparent",
              color: activeTab === "triage" ? "#fff" : "#475569",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            SOS Alerts
            {triageStatus === "incoming" && <span className="pulse-red-dot"></span>}
          </button>
        </div>

        {/* Content */}
        {activeTab === "inventory" && r && (
          <div className="fade-in-up">
            <p style={{ color: "#64748B", fontWeight: "500", marginBottom: "24px", fontSize: "1rem" }}>
              Adjusting these values instantly updates availability on the patient network globally.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
              <ControlCard label="Standard Beds" value={r.beds} onMinus={() => handleUpdate("beds", -1)} onPlus={() => handleUpdate("beds", 1)} />
              <ControlCard label="ICU Capacity" value={r.icuBeds} onMinus={() => handleUpdate("icuBeds", -1)} onPlus={() => handleUpdate("icuBeds", 1)} />
              <ControlCard label="Blood Units" value={r.bloodUnits} onMinus={() => handleUpdate("bloodUnits", -1)} onPlus={() => handleUpdate("bloodUnits", 1)} />
              <ControlCard label="Oxygen Units" value={r.oxygenUnits} onMinus={() => handleUpdate("oxygenUnits", -1)} onPlus={() => handleUpdate("oxygenUnits", 1)} />
              <ControlCard label="Ambulances" value={r.ambulances} onMinus={() => handleUpdate("ambulances", -1)} onPlus={() => handleUpdate("ambulances", 1)} />
            </div>
          </div>
        )}

        {activeTab === "triage" && (
          <div className="fade-in-up">
            <p style={{ color: "#64748B", fontWeight: "500", marginBottom: "24px", fontSize: "1rem" }}>
              Manage incoming automated emergency alerts.
            </p>

            {triageStatus === "incoming" ? (
              <div className="glass-card" style={{ padding: "32px", border: "2px solid #EF4444" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#EF4444", fontWeight: "900", fontSize: "1.1rem" }}>
                    <span className="pulse-red-dot"></span>
                    INCOMING CRITICAL PATIENT
                  </div>
                  <button
                    onClick={() => setTriageStatus("dispatched")}
                    style={{ padding: "14px 24px", backgroundColor: "#EF4444", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "800", cursor: "pointer", fontSize: "0.95rem", boxShadow: "0 10px 20px -5px rgba(239, 68, 68, 0.4)" }}
                  >
                    Acknowledge & Dispatch Help
                  </button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                  <div style={{ backgroundColor: "#FEF2F2", padding: "16px 20px", borderRadius: "14px" }}>
                    <span style={{ display: "block", fontSize: "0.85rem", color: "#991B1B", fontWeight: "700", textTransform: "uppercase", marginBottom: "6px" }}>Emergency Type</span>
                    <span style={{ color: "#0F172A", fontWeight: "800", fontSize: "1.1rem" }}>Severe Bleeding</span>
                  </div>
                  <div style={{ backgroundColor: "#FEF2F2", padding: "16px 20px", borderRadius: "14px" }}>
                    <span style={{ display: "block", fontSize: "0.85rem", color: "#991B1B", fontWeight: "700", textTransform: "uppercase", marginBottom: "6px" }}>Distance from Origin</span>
                    <span style={{ color: "#0F172A", fontWeight: "800", fontSize: "1.1rem" }}>{activeHospital?.distanceKm} km</span>
                  </div>
                  <div style={{ backgroundColor: "#FEF2F2", padding: "16px 20px", borderRadius: "14px" }}>
                    <span style={{ display: "block", fontSize: "0.85rem", color: "#991B1B", fontWeight: "700", textTransform: "uppercase", marginBottom: "6px" }}>Recommended Prep</span>
                    <span style={{ color: "#0F172A", fontWeight: "800", fontSize: "1.1rem" }}>Trauma Center & O-Negative Blood</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card fade-in-up" style={{ padding: "32px", display: "flex", alignItems: "center", gap: "20px", border: "2px solid rgba(5, 150, 105, 0.3)" }}>
                <div style={{ width: "56px", height: "56px", backgroundColor: "#D1FAE5", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", flexShrink: 0, color: "#059669" }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <div>
                  <h3 style={{ margin: "0 0 4px 0", color: "#0F172A", fontSize: "1.3rem", fontWeight: "900" }}>Response Dispatched</h3>
                  <p style={{ margin: 0, color: "#64748B", fontWeight: "500" }}>Ambulance team is en route. Trauma center has been notified.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ControlCard({ label, value, onMinus, onPlus }) {
  const isEmpty = value === 0;
  return (
    <div className="glass-card" style={{ padding: "24px", border: isEmpty ? "2px solid #FECACA" : "1px solid rgba(255, 255, 255, 1)" }}>
      <span style={{ display: "block", fontSize: "0.9rem", fontWeight: "700", color: "#64748B", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "0.3px" }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button
          onClick={onMinus}
          disabled={isEmpty}
          style={{
            width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #E2E8F0", backgroundColor: isEmpty ? "#F1F5F9" : "#fff",
            color: isEmpty ? "#CBD5E1" : "#0F172A", fontSize: "1.4rem", fontWeight: "800", cursor: isEmpty ? "not-allowed" : "pointer",
          }}
        >
          −
        </button>
        <span style={{ fontSize: "2rem", fontWeight: "900", color: isEmpty ? "#EF4444" : "#0F172A" }}>{value}</span>
        <button
          onClick={onPlus}
          style={{ width: "40px", height: "40px", borderRadius: "10px", border: "1px solid #E2E8F0", backgroundColor: "#fff", color: "#0F172A", fontSize: "1.4rem", fontWeight: "800", cursor: "pointer" }}
        >
          +
        </button>
      </div>
    </div>
  );
}