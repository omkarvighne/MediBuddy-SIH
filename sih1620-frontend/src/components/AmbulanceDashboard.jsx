import { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const PATIENT_POS = [18.5808, 73.9787];
const AMB_START_POS = [18.5680, 73.9600];

// Multi-point path so the route looks like it follows roads, not a straight line
const ROUTE = [
  AMB_START_POS,
  [18.5700, 73.9650],
  [18.5722, 73.9690],
  [18.5750, 73.9700],
  [18.5778, 73.9740],
  PATIENT_POS,
];

const patientIcon = new L.DivIcon({
  className: "custom-icon",
  html: `<div style="width:20px;height:20px;background:#EF4444;border-radius:50%;border:3px solid white;box-shadow:0 0 12px rgba(239,68,68,0.8);"></div>`,
});

const idleAmbIcon = new L.DivIcon({
  className: "custom-icon",
  html: `<div style="font-size:28px; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.2));">🚑</div>`,
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

export default function AmbulanceDashboard() {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const rideRef = useRef(null);

  useEffect(() => {
    if (status === "accepted") {
      setProgress(0);
      rideRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(rideRef.current);
            return 1;
          }
          return Math.min(1, prev + 0.01);
        });
      }, 120);
    } else {
      clearInterval(rideRef.current);
    }
    return () => clearInterval(rideRef.current);
  }, [status]);

  const { traveled, remaining, position, bearing } = useMemo(
    () => getPathSegments(ROUTE, progress),
    [progress]
  );
  const carIcon = useMemo(() => makeCarIcon(bearing), [bearing]);
  const etaSeconds = Math.max(0, Math.round(240 * (1 - progress)));
  const etaLabel = `${Math.floor(etaSeconds / 60)}:${String(etaSeconds % 60).padStart(2, "0")}`;
  const arrived = progress >= 1;

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 73px)", overflow: "hidden", backgroundColor: "#F8FAFC", fontFamily: "Inter, sans-serif", padding: "32px 24px" }}>

      <style>{`
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

        .pulse-red-dash {
          width: 12px; height: 12px; background-color: #EF4444; border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          animation: pulseRedDash 2s infinite;
          display: inline-block;
        }
        @keyframes pulseRedDash {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 14px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes carPulse {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <div className="glass-card fade-in-up" style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", padding: "28px 32px" }}>
          <div>
            <h2 style={{ fontSize: "1.7rem", fontWeight: "900", color: "#0F172A", margin: "0 0 6px 0", letterSpacing: "-0.5px" }}>Ambulance Unit 4 (MH-12-AB-1234)</h2>
            <p style={{ color: "#64748B", fontWeight: "600", margin: 0 }}>Driver: Ramesh Kumar | Status: {status.toUpperCase()}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", backgroundColor: status === "idle" ? "#FEF9C3" : "#D1FAE5", borderRadius: "20px" }}>
            <span style={{ height: "10px", width: "10px", borderRadius: "50%", backgroundColor: status === "idle" ? "#EAB308" : "#10B981" }}></span>
            <span style={{ fontWeight: "800", color: status === "idle" ? "#854D0E" : "#065F46", fontSize: "0.9rem" }}>GPS ACTIVE</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "32px" }}>

          {/* Map */}
          <div className="glass-card fade-in-up" style={{ height: "550px", overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", top: 16, left: 16, zIndex: 1000, backgroundColor: "rgba(255,255,255,0.92)", padding: "8px 16px", borderRadius: "8px", fontWeight: "800", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", color: status === "accepted" ? (arrived ? "#059669" : "#0F172A") : "#0F172A" }}>
              {status === "accepted" ? (arrived ? "✅ Arrived at Patient" : `🚑 En Route · ETA ${etaLabel}`) : "Live Dispatch Radar"}
            </div>
            <MapContainer center={[18.5750, 73.9690]} zoom={14} style={{ height: "100%", width: "100%" }} zoomControl={false}>
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

              {status !== "accepted" && <Marker position={AMB_START_POS} icon={idleAmbIcon} />}
              {status !== "transferred" && <Marker position={PATIENT_POS} icon={patientIcon} />}

              {status === "accepted" && (
                <>
                  <Polyline positions={traveled} color="#059669" weight={6} />
                  <Polyline positions={remaining} color="#94A3B8" weight={5} dashArray="2, 10" />
                  <Marker position={position} icon={carIcon} />
                </>
              )}
            </MapContainer>
          </div>

          {/* Action Panel */}
          <div className="glass-card fade-in-up" style={{ padding: "32px", display: "flex", flexDirection: "column" }}>
            {status === "idle" && (
              <div className="fade-in-up">
                <div style={{ backgroundColor: "#FEF2F2", border: "2px solid #EF4444", padding: "24px", borderRadius: "16px", marginBottom: "32px" }}>
                  <h3 style={{ color: "#EF4444", marginTop: 0, display: "flex", alignItems: "center", gap: "12px", fontSize: "1.4rem", fontWeight: "900" }}>
                    <span className="pulse-red-dash"></span> URGENT DISPATCH
                  </h3>
                  <p style={{ fontSize: "1.05rem", marginBottom: "8px", color: "#7F1D1D" }}><strong>Location:</strong> JSPM University Campus, Wagholi</p>
                  <p style={{ fontSize: "1.05rem", marginBottom: "8px", color: "#7F1D1D" }}><strong>Distance:</strong> 2.1 km</p>
                  <p style={{ fontSize: "1.05rem", margin: 0, color: "#7F1D1D" }}><strong>Nearest Facility:</strong> IMHS Multispeciality</p>
                </div>
                <button
                  onClick={() => setStatus("accepted")}
                  style={{ width: "100%", padding: "20px", backgroundColor: "#059669", color: "#fff", fontWeight: "900", borderRadius: "14px", fontSize: "1.15rem", cursor: "pointer", border: "none", boxShadow: "0 10px 20px -5px rgba(5, 150, 105, 0.4)" }}
                >
                  ACCEPT DISPATCH
                </button>
              </div>
            )}

            {status === "accepted" && (
              <div className="fade-in-up" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ color: "#059669", fontSize: "1.7rem", marginTop: 0, fontWeight: "900" }}>
                  {arrived ? "Arrived at Patient" : "En Route to Patient"}
                </h3>
                <p style={{ fontSize: "1.15rem", color: "#64748B", fontWeight: "700" }}>
                  {arrived ? "On scene" : `ETA: ${etaLabel}`}
                </p>
                <div style={{ backgroundColor: "rgba(244,247,246,0.7)", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", margin: "24px 0", flex: 1 }}>
                  <p style={{ fontSize: "1.05rem", marginBottom: "16px", color: "#2F4F4F" }}><strong>Routing:</strong> Fastest route via Pune-Nagar Road calculated.</p>
                  <p style={{ fontSize: "1.05rem", color: "#2F4F4F" }}><strong>Patient Contact:</strong> +91-XXXXXXXXXX</p>
                </div>
                <button
                  onClick={() => setStatus("transferred")}
                  style={{ width: "100%", padding: "18px", backgroundColor: "rgba(255,255,255,0.9)", color: "#EF4444", fontWeight: "800", borderRadius: "14px", border: "2px solid #EF4444", cursor: "pointer", fontSize: "1.05rem" }}
                >
                  Transfer to Nearest Unit
                </button>
              </div>
            )}

            {status === "transferred" && (
              <div className="fade-in-up" style={{ textAlign: "center", padding: "60px 20px", display: "flex", flexDirection: "column", justifyContent: "center", flex: 1 }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "20px" }}>🔄</div>
                <h3 style={{ color: "#0F172A", fontSize: "1.7rem", fontWeight: "900" }}>Dispatch Transferred</h3>
                <p style={{ color: "#64748B", fontSize: "1.05rem", lineHeight: "1.6" }}>Unit 7 has accepted the handoff and is currently en route to the patient.</p>
                <button
                  onClick={() => { setStatus("idle"); setProgress(0); }}
                  style={{ marginTop: "28px", padding: "16px 32px", backgroundColor: "rgba(255,255,255,0.9)", border: "1px solid #E2E8F0", borderRadius: "14px", cursor: "pointer", fontWeight: "700", color: "#0F172A" }}
                >
                  Return to Idle
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}