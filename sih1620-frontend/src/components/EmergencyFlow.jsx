import { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const PATIENT_POS = [18.5808, 73.9787];
const AMB_1 = [18.5850, 73.9750];
const AMB_2 = [18.5750, 73.9850];

// Multi-point path so the ambulance looks like it's following roads, not a straight line
const ROUTE = [
  AMB_1,
  [18.5838, 73.9762],
  [18.5825, 73.9772],
  [18.5817, 73.9780],
  PATIENT_POS,
];

const patientIcon = new L.DivIcon({
  className: "custom-icon",
  html: `<div style="width:20px;height:20px;background:#059669;border-radius:50%;border:3px solid white;box-shadow:0 0 10px rgba(5,150,105,0.8);"></div>`,
});

const idleAmbIcon = new L.DivIcon({
  className: "custom-icon",
  html: `<div style="font-size:22px; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3)); opacity:0.85;">🚑</div>`,
});

function makeCarIcon(bearing) {
  return new L.DivIcon({
    className: "custom-icon",
    html: `
      <div style="position:relative; width:44px; height:44px; display:flex; align-items:center; justify-content:center;">
        <div style="position:absolute; width:34px; height:34px; border-radius:50%; background:rgba(5,150,105,0.18); animation:carPulse 1.6s infinite;"></div>
        <div style="transform: rotate(${bearing}deg); transition: transform 0.25s linear; width:32px; height:32px; border-radius:50%; background:#fff; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.3); border:2px solid #059669;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#059669">
            <path d="M12 2 L18 14 L12 11 L6 14 Z"></path>
          </svg>
        </div>
      </div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

function interpolateRoute(route, t) {
  const segLengths = [];
  let total = 0;
  for (let i = 0; i < route.length - 1; i++) {
    const d = Math.hypot(route[i + 1][0] - route[i][0], route[i + 1][1] - route[i][1]);
    segLengths.push(d);
    total += d;
  }
  let target = t * total;
  for (let i = 0; i < segLengths.length; i++) {
    const segLen = segLengths[i];
    if (target <= segLen || i === segLengths.length - 1) {
      const segT = segLen === 0 ? 0 : Math.min(1, target / segLen);
      const lat = route[i][0] + (route[i + 1][0] - route[i][0]) * segT;
      const lng = route[i][1] + (route[i + 1][1] - route[i][1]) * segT;
      const bearing =
        (Math.atan2(route[i + 1][1] - route[i][1], route[i + 1][0] - route[i][0]) * 180) / Math.PI;
      return { position: [lat, lng], bearing, segmentIndex: i };
    }
    target -= segLen;
  }
  return { position: route[route.length - 1], bearing: 0, segmentIndex: route.length - 2 };
}

function getPathSegments(route, t) {
  const { position, bearing, segmentIndex } = interpolateRoute(route, t);
  const traveled = [...route.slice(0, segmentIndex + 1), position];
  const remaining = [position, ...route.slice(segmentIndex + 1)];
  return { traveled, remaining, position, bearing };
}

export default function EmergencyFlow({ goTo }) {
  const [stage, setStage] = useState("countdown");
  const [category, setCategory] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const rideRef = useRef(null);

  useEffect(() => {
    if (stage === "countdown") {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setStage("sent");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [stage]);

  useEffect(() => {
    if (stage === "sent") {
      rideRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(rideRef.current);
            return 1;
          }
          return Math.min(1, prev + 0.012);
        });
      }, 120);
    }
    return () => clearInterval(rideRef.current);
  }, [stage]);

  const { traveled, remaining, position, bearing } = useMemo(
    () => getPathSegments(ROUTE, progress),
    [progress]
  );

  const carIcon = useMemo(() => makeCarIcon(bearing), [bearing]);
  const etaSeconds = Math.max(0, Math.round(240 * (1 - progress)));
  const etaLabel = `${Math.floor(etaSeconds / 60)}:${String(etaSeconds % 60).padStart(2, "0")}`;
  const arrived = progress >= 1;

  const cancelAlert = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    goTo("home");
  };
  const isCritical = secondsLeft <= 15;

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 73px)", overflow: "hidden", backgroundColor: "#F8FAFC", fontFamily: "Inter, sans-serif", padding: "40px 24px" }}>
      <style>{`
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; z-index: 0; animation: float 12s infinite ease-in-out alternate; pointer-events: none; }
        .orb-1 { width: 500px; height: 500px; background: #F87171; top: -100px; right: -100px; }
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

        @keyframes pump {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 25px rgba(239, 68, 68, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes carPulse {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center" }}>

        {stage === "countdown" && (
          <div className="fade-in-up" style={{ width: "100%", maxWidth: "1000px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px" }}>

            <div className="glass-card" style={{ overflow: "hidden", height: "550px", position: "relative" }}>
              <div style={{ position: "absolute", top: 20, left: 20, zIndex: 1000, backgroundColor: "rgba(255,255,255,0.9)", padding: "8px 16px", borderRadius: "12px", fontWeight: "800", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", color: "#059669" }}>
                🟢 2 Units Nearby
              </div>
              <MapContainer center={PATIENT_POS} zoom={15} style={{ height: "100%", width: "100%" }} zoomControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <Marker position={PATIENT_POS} icon={patientIcon} />
                <Marker position={AMB_1} icon={idleAmbIcon} />
                <Marker position={AMB_2} icon={idleAmbIcon} />
              </MapContainer>
            </div>

            <div className="glass-card" style={{ padding: "32px", textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: isCritical ? "#EF4444" : "#0F172A", marginBottom: "24px", transition: "color 0.3s" }}>
                {isCritical ? "CRITICAL ALERT!" : "Help is ready..."}
              </h2>

              <div style={{ width: "180px", height: "180px", borderRadius: "50%", border: `8px solid ${isCritical ? "#EF4444" : "#E2E8F0"}`, backgroundColor: isCritical ? "rgba(239, 68, 68, 0.05)" : "#ffffff", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 32px auto", animation: isCritical ? "pump 1s infinite" : "none", transition: "all 0.3s ease", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}>
                <span style={{ fontSize: "4.5rem", fontWeight: "900", color: isCritical ? "#EF4444" : "#0F172A" }}>{secondsLeft}</span>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "32px" }}>
                {["Accident", "Broken Bone", "Severe Bleeding", "Breathing Difficulty"].map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); clearInterval(timerRef.current); setStage("sent"); }}
                    style={{ padding: "12px 20px", borderRadius: "12px", border: "1px solid #E2E8F0", backgroundColor: "rgba(255,255,255,0.9)", color: "#2F4F4F", fontWeight: "700", cursor: "pointer", fontSize: "1rem", transition: "all 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <button onClick={cancelAlert} style={{ width: "100%", padding: "18px", borderRadius: "12px", backgroundColor: "#0F172A", color: "#fff", fontWeight: "800", cursor: "pointer", border: "none", fontSize: "1.1rem" }}>
                I'm Fine — Cancel Alert
              </button>
            </div>
          </div>
        )}

        {stage === "sent" && (
          <div className="fade-in-up" style={{ width: "100%", maxWidth: "1000px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px", marginTop: "8px" }}>

            <div className="glass-card" style={{ overflow: "hidden", height: "550px", position: "relative" }}>
              <div style={{ position: "absolute", top: 20, left: 20, zIndex: 1000, backgroundColor: "rgba(255,255,255,0.92)", padding: "8px 16px", borderRadius: "12px", fontWeight: "800", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", color: arrived ? "#059669" : "#0F172A" }}>
                {arrived ? "✅ Ambulance Arrived" : `🚑 En Route · ETA ${etaLabel}`}
              </div>
              <MapContainer center={PATIENT_POS} zoom={15} style={{ height: "100%", width: "100%" }} zoomControl={false}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                <Polyline positions={traveled} color="#059669" weight={6} />
                <Polyline positions={remaining} color="#94A3B8" weight={5} dashArray="2, 10" />
                <Marker position={PATIENT_POS} icon={patientIcon} />
                <Marker position={position} icon={carIcon} />
              </MapContainer>
            </div>

            <div className="glass-card" style={{ padding: "32px", display: "flex", flexDirection: "column" }}>
              <div style={{ width: "72px", height: "72px", backgroundColor: "#D1FAE5", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px", fontSize: "32px" }}>
                {arrived ? "✅" : "🚑"}
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: "900", color: "#0F172A", marginBottom: "6px" }}>
                {arrived ? "Ambulance Arrived" : "Dispatched"}
              </h2>
              <p style={{ color: "#059669", fontWeight: "800", fontSize: "1.3rem", margin: "0 0 24px 0" }}>
                {arrived ? "On scene" : `ETA: ${etaLabel}`}
              </p>

              {category && (
                <p style={{ fontSize: "1.05rem", marginBottom: "8px", color: "#0F172A" }}>
                  <strong>Reported Issue:</strong> {category}
                </p>
              )}

              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px", marginTop: "8px", flex: 1 }}>
                <p style={{ margin: "0 0 8px 0", fontSize: "0.95rem", color: "#64748B", fontWeight: "600" }}>Assigned Driver</p>
                <h3 style={{ margin: "0 0 20px 0", color: "#0F172A", fontSize: "1.4rem", fontWeight: "900" }}>Ramesh Kumar (Unit 4)</h3>
                <a href="tel:+919876543210" style={{ display: "block", textAlign: "center", padding: "16px", backgroundColor: "#059669", color: "#fff", textDecoration: "none", fontWeight: "800", borderRadius: "12px", fontSize: "1.05rem" }}>
                  📞 Contact Driver
                </a>
              </div>

              <button onClick={() => goTo("home")} style={{ marginTop: "24px", padding: "14px", backgroundColor: "transparent", color: "#64748B", fontWeight: "700", border: "none", cursor: "pointer", fontSize: "1rem" }}>
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}