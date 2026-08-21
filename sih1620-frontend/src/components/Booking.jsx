import { useState } from "react";

export default function Booking({ hospital, bookings, setBookings, goTo }) {
  const [formData, setFormData] = useState({
    department: hospital.departments[0] || "",
    date: "",
    time: "",
    patientName: "",
    contact: "",
    reason: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `MB-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = {
      id: newId,
      hospitalId: hospital.id,
      hospitalName: hospital.name,
      ...formData,
    };

    setBookings([...bookings, newBooking]);
    setBookingId(newId);
    setIsSubmitted(true);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid #E2E8F0",
    fontSize: "1rem",
    backgroundColor: "#fff",
    outline: "none",
    fontWeight: "500",
    color: "#0F172A",
  };
  const labelStyle = { display: "block", fontSize: "0.9rem", fontWeight: "700", color: "#475569", marginBottom: "8px" };

  return (
    <div style={{ position: "relative", minHeight: "calc(100vh - 73px)", overflow: "hidden", backgroundColor: "#F8FAFC", fontFamily: "Inter, sans-serif", padding: "40px 24px" }}>

      <style>{`
        .bg-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.5; z-index: 0; animation: float 12s infinite ease-in-out alternate; pointer-events: none; }
        .orb-1 { width: 500px; height: 500px; background: #34D399; top: -100px; left: -100px; }
        .orb-2 { width: 400px; height: 400px; background: #60A5FA; bottom: -50px; right: -50px; animation-delay: -5s; }
        @keyframes float { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(40px, 40px) scale(1.1); } }

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

        .clean-input:focus { border-color: #059669 !important; box-shadow: 0 0 0 3px rgba(5,150,105,0.1); }
      `}</style>

      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "1100px", margin: "0 auto" }}>

        <button
          onClick={() => goTo("detail")}
          style={{ background: "transparent", border: "none", color: "#64748B", fontSize: "1rem", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Hospital
        </button>

        {!isSubmitted ? (
          <div className="fade-in-up" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "32px" }}>

            <div className="glass-card" style={{ padding: "32px", height: "fit-content" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#0F172A", margin: "0 0 20px 0", letterSpacing: "-0.5px" }}>Book Appointment</h2>
              <h3 style={{ fontSize: "1.3rem", color: "#0F172A", margin: "0 0 8px 0", fontWeight: "800" }}>{hospital.name}</h3>
              <div style={{ display: "flex", alignItems: "center", color: "#059669", fontWeight: "700", fontSize: "1rem", marginBottom: "20px" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: "6px" }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                {hospital.distanceKm} km away
              </div>
              <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "20px" }}>
                <p style={{ margin: 0, color: "#475569", fontSize: "0.95rem", fontWeight: "500", lineHeight: "1.6" }}>
                  Your appointment request will be sent directly to the hospital's live dashboard for confirmation.
                </p>
              </div>
            </div>

            <div className="glass-card" style={{ padding: "32px" }}>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>Department</label>
                  <select name="department" value={formData.department} onChange={handleChange} required className="clean-input" style={inputStyle}>
                    {hospital.departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div>
                    <label style={labelStyle}>Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleChange} required className="clean-input" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Time</label>
                    <input type="time" name="time" value={formData.time} onChange={handleChange} required className="clean-input" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Patient Full Name</label>
                  <input type="text" name="patientName" placeholder="Enter patient's name" value={formData.patientName} onChange={handleChange} required className="clean-input" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Contact Number</label>
                  <input type="tel" name="contact" placeholder="+91 00000 00000" value={formData.contact} onChange={handleChange} required className="clean-input" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Reason for Visit (Brief)</label>
                  <input type="text" name="reason" placeholder="E.g., Severe headache, Follow-up" value={formData.reason} onChange={handleChange} required className="clean-input" style={inputStyle} />
                </div>

                <button
                  type="submit"
                  style={{ width: "100%", padding: "18px", marginTop: "8px", backgroundColor: "#059669", color: "#fff", fontSize: "1.1rem", fontWeight: "800", borderRadius: "14px", border: "none", cursor: "pointer", boxShadow: "0 10px 20px -5px rgba(5, 150, 105, 0.3)" }}
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="fade-in-up" style={{ display: "flex", justifyContent: "center" }}>
            <div className="glass-card" style={{ padding: "40px", maxWidth: "480px", width: "100%", border: "2px solid rgba(5, 150, 105, 0.3)" }}>
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <div style={{ width: "64px", height: "64px", backgroundColor: "#D1FAE5", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 16px auto", color: "#059669" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h2 style={{ fontSize: "1.8rem", fontWeight: "900", color: "#0F172A", margin: "0 0 8px 0" }}>Appointment Confirmed</h2>
                <p style={{ color: "#64748B", fontWeight: "600", margin: 0 }}>Your booking has been secured.</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", padding: "20px 0", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", marginBottom: "24px" }}>
                <TicketRow label="Appointment ID" value={bookingId} />
                <TicketRow label="Hospital" value={hospital.name} />
                <TicketRow label="Department" value={formData.department} />
                <TicketRow label="Date & Time" value={`${formData.date} at ${formData.time}`} />
                <TicketRow label="Patient" value={formData.patientName} />
              </div>

              <button
                onClick={() => goTo("home")}
                style={{ width: "100%", padding: "16px", backgroundColor: "#0F172A", color: "#fff", fontWeight: "800", borderRadius: "14px", border: "none", cursor: "pointer", fontSize: "1.05rem" }}
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TicketRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: "#64748B", fontWeight: "600", fontSize: "0.95rem" }}>{label}</span>
      <strong style={{ color: "#0F172A", fontWeight: "800", fontSize: "1rem", textAlign: "right" }}>{value}</strong>
    </div>
  );
}