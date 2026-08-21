import { useState } from "react";
import { HOSPITALS } from "./data";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Search from "./components/Search";
import HospitalDetail from "./components/HospitalDetail";
import Compare from "./components/Compare";
import SymptomRouting from "./components/SymptomRouting";
import RecommendationResults from "./components/RecommendationResults";
import Booking from "./components/Booking";
import EmergencyFlow from "./components/EmergencyFlow";
import StaffDashboard from "./components/StaffDashboard";
import AmbulanceDashboard from "./components/AmbulanceDashboard";
import "./index.css";

export default function App() {
  const [view, setView] = useState("landing"); 
  const [hospitals, setHospitals] = useState(HOSPITALS);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const [compareIds, setCompareIds] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [mode, setMode] = useState("patient");
  
  const [detailBackRoute, setDetailBackRoute] = useState("home");
  const [isHomeSearching, setIsHomeSearching] = useState(false);

  const goTo = (screenName) => setView(screenName);

  const updateResource = (hospitalId, resourceKey, delta) => {
    setHospitals((prev) =>
      prev.map((h) =>
        h.id === hospitalId
          ? { ...h, resources: { ...h.resources, [resourceKey]: Math.max(0, h.resources[resourceKey] + delta) } }
          : h
      )
    );
  };

  const selectedHospital = hospitals.find((h) => h.id === selectedHospitalId);

  return (
    <div className="app-shell" style={{ backgroundColor: '#F4F7F6', minHeight: '100vh' }}>
      {view !== "landing" && (
        <TopBar mode={mode} setMode={setMode} goTo={goTo} setIsHomeSearching={setIsHomeSearching} />
      )}

      {view === "landing" && <LandingPage enterApp={goTo} setMode={setMode} />}

      {mode === "patient" && view !== "landing" && (
        <>
          {view === "home" && (
            <Home hospitals={hospitals} goTo={goTo} isSearching={isHomeSearching} setIsSearching={setIsHomeSearching} onSelectHospital={(id) => { setSelectedHospitalId(id); setDetailBackRoute("home"); goTo("detail"); }} />
          )}
          {view === "search" && (
            <Search hospitals={hospitals} goTo={goTo} onSelectHospital={(id) => { setSelectedHospitalId(id); setDetailBackRoute("search"); goTo("detail"); }} onCompareSelect={(ids) => { setCompareIds(ids); goTo("compare"); }} />
          )}
          {view === "detail" && selectedHospital && (
            <HospitalDetail hospital={selectedHospital} goTo={goTo} backRoute={detailBackRoute} onBook={() => goTo("booking")} />
          )}
          {view === "compare" && (
            <Compare hospitals={hospitals.filter((h) => compareIds.includes(h.id))} goTo={goTo} onSelectHospital={(id) => { setSelectedHospitalId(id); setDetailBackRoute("compare"); goTo("detail"); }} />
          )}
          {view === "symptoms" && (
            <SymptomRouting hospitals={hospitals} onMatch={(hospitalId) => { setSelectedHospitalId(hospitalId); setDetailBackRoute("symptoms"); goTo("detail"); }} goTo={goTo} />
          )}
          {view === "recommend" && (
            <RecommendationResults hospitals={hospitals} onSelectHospital={(id) => { setSelectedHospitalId(id); setDetailBackRoute("recommend"); goTo("detail"); }} goTo={goTo} />
          )}
          {view === "booking" && selectedHospital && (
            <Booking hospital={selectedHospital} bookings={bookings} setBookings={setBookings} goTo={goTo} />
          )}
          {view === "emergency" && <EmergencyFlow goTo={goTo} />}
        </>
      )}

      {mode === "staff" && view !== "landing" && <StaffDashboard hospitals={hospitals} updateResource={updateResource} />}
      {mode === "ambulance" && view !== "landing" && <AmbulanceDashboard />}
    </div>
  );
}

function TopBar({ mode, setMode, goTo, setIsHomeSearching }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', backgroundColor: '#ffffff', borderBottom: '1px solid #E2E8F0', alignItems: 'center' }}>
      <div onClick={() => goTo("home")} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <img src="/logo.png" alt="MediBuddy Logo" style={{ height: '40px' }} />
      </div>
      
      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ backgroundColor: '#F4F7F6', border: '1px solid #E2E8F0', padding: '10px 18px', borderRadius: '8px', fontWeight: '700', color: '#2F4F4F', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          {mode === "patient" ? "Patient Portal" : mode === "staff" ? "Staff Dashboard" : "Ambulance Dispatch"}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px', transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        
        {menuOpen && (
          <div style={{ position: 'absolute', top: '115%', right: 0, backgroundColor: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '8px', width: '220px', zIndex: 50 }}>
            <button onClick={() => { setMode("patient"); setMenuOpen(false); goTo("home"); }} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: '600', color: '#2F4F4F' }}>Patient Portal</button>
            <button onClick={() => { setMode("staff"); setMenuOpen(false); goTo("home"); }} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: '600', color: '#2F4F4F' }}>Staff Dashboard</button>
            <button onClick={() => { setMode("ambulance"); setMenuOpen(false); goTo("home"); }} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: '600', color: '#2F4F4F' }}>Ambulance Dispatch</button>
            <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '8px 0' }}></div>
            <button onClick={() => { setMenuOpen(false); setIsHomeSearching(false); goTo("landing"); }} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontWeight: '700', color: '#DC2626' }}>← Exit to Landing</button>
          </div>
        )}
      </div>
    </div>
  );
}