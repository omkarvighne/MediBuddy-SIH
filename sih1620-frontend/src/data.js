export const SYMPTOM_TO_DEPARTMENT = {
  "Chest Pain": "Cardiology",
  "Severe Headache": "Neurology",
  "Fracture": "Orthopedics",
  "Stomach Ache": "Gastroenterology",
  "Breathing Difficulty": "Pulmonology",
  "Skin Rash": "Dermatology",
  "Fever": "General Medicine",
  "Severe Bleeding": "Emergency Medicine",
  "Accident": "Trauma Center"
};

export const TIME_SLOTS = ["09:00 AM", "10:30 AM", "01:00 PM", "03:00 PM", "05:30 PM"];

export const HOSPITALS = [
  {
    id: "imhs",
    name: "IMHS Multispeciality Hospital",
    type: "Private",
    departments: ["General Medicine", "Surgery", "Emergency Medicine"],
    facilities: ["Multispeciality care", "Emergency/24x7", "ICU"],
    distanceKm: 2.5,
    crowdLevel: "Moderate",
    resources: { beds: 45, icuBeds: 8, bloodUnits: 30, oxygenUnits: 80, ambulances: 2 },
    doctors: { "General Medicine": ["Dr. A. Sharma"], "Surgery": ["Dr. R. Patil"] }
  },
  {
    id: "lifeline",
    name: "Lifeline Hospital",
    type: "Private",
    departments: ["Emergency Medicine", "General Surgery", "Orthopedics"],
    facilities: ["24-hour emergency", "ICU", "Operation theatres", "Ambulance"],
    distanceKm: 3.0,
    crowdLevel: "Low",
    resources: { beds: 65, icuBeds: 12, bloodUnits: 50, oxygenUnits: 110, ambulances: 3 },
    doctors: { "Orthopedics": ["Dr. K. Joshi"], "Emergency Medicine": ["Dr. M. Deshmukh"] }
  },
  {
    id: "care",
    name: "Care Superspeciality Hospital",
    type: "Private",
    departments: ["Critical Care", "General Medicine", "Surgery"],
    facilities: ["ICU", "Operation theatre", "In-house lab"],
    distanceKm: 2.5,
    crowdLevel: "High",
    resources: { beds: 30, icuBeds: 5, bloodUnits: 20, oxygenUnits: 60, ambulances: 1 },
    doctors: { "Critical Care": ["Dr. S. Mehta"] }
  },
  {
    id: "metro",
    name: "Metro Superspeciality Hospital & Trauma Center",
    type: "Private",
    departments: ["Trauma Center", "Orthopedics", "Pediatrics", "Gynecology"],
    facilities: ["Trauma/emergency care", "24-hour listing"],
    distanceKm: 3.0,
    crowdLevel: "Moderate",
    resources: { beds: 50, icuBeds: 10, bloodUnits: 40, oxygenUnits: 90, ambulances: 4 },
    doctors: { "Trauma Center": ["Dr. V. Kadam"] }
  },
  {
    id: "dignity9",
    name: "Dignity9 Multispeciality Hospital",
    type: "Private",
    departments: ["Surgery", "Cardiology", "Neurology", "ENT"],
    facilities: ["Advanced technology", "Diagnostic support"],
    distanceKm: 3.0,
    crowdLevel: "Low",
    resources: { beds: 40, icuBeds: 7, bloodUnits: 25, oxygenUnits: 75, ambulances: 2 },
    doctors: { "Cardiology": ["Dr. N. Singh"] }
  },
  {
    id: "shreelifecare",
    name: "Shree Lifecare Hospital",
    type: "Private",
    departments: ["General Medicine", "Surgery"],
    facilities: ["Medical/surgical consultations", "24-hour listing"],
    distanceKm: 3.5,
    crowdLevel: "Moderate",
    resources: { beds: 25, icuBeds: 4, bloodUnits: 15, oxygenUnits: 50, ambulances: 1 },
    doctors: { "General Medicine": ["Dr. P. Kale"] }
  },
  {
    id: "morya",
    name: "Morya Hospital",
    type: "Private",
    departments: ["Gynecology", "Obstetrics"],
    facilities: ["Infertility care", "Laparoscopic procedures", "Ultrasound"],
    distanceKm: 3.5,
    crowdLevel: "Low",
    resources: { beds: 20, icuBeds: 2, bloodUnits: 10, oxygenUnits: 30, ambulances: 1 },
    doctors: { "Gynecology": ["Dr. S. Rao"] }
  },
  {
    id: "lotus",
    name: "Lotus Speciality Hospital",
    type: "Private",
    departments: ["Maternity", "Gynecology"],
    facilities: ["Pregnancy/maternity care", "Sonography", "OT"],
    distanceKm: 3.5,
    crowdLevel: "Moderate",
    resources: { beds: 15, icuBeds: 1, bloodUnits: 5, oxygenUnits: 20, ambulances: 1 },
    doctors: { "Maternity": ["Dr. L. Nair"] }
  },
  {
    id: "global",
    name: "Global Multispeciality Hospital",
    type: "Private",
    departments: ["General Medicine", "Surgery", "Gynecology"],
    facilities: ["Surgical services", "24-hour listing"],
    distanceKm: 3.5,
    crowdLevel: "Moderate",
    resources: { beds: 35, icuBeds: 6, bloodUnits: 20, oxygenUnits: 65, ambulances: 2 },
    doctors: { "Surgery": ["Dr. A. Gupta"] }
  },
  {
    id: "gmax",
    name: "G-MAX Multispeciality Hospital",
    type: "Private",
    departments: ["General Medicine"],
    facilities: ["Multispeciality hospital services"],
    distanceKm: 3.5,
    crowdLevel: "Low",
    resources: { beds: 20, icuBeds: 3, bloodUnits: 15, oxygenUnits: 40, ambulances: 1 },
    doctors: { "General Medicine": ["Dr. T. Verma"] }
  },
  {
    id: "suchitra",
    name: "Dr. Suchitra's Maternity & Multispeciality",
    type: "Private",
    departments: ["Maternity", "Obstetrics"],
    facilities: ["Pregnancy services", "24-hour listing"],
    distanceKm: 3.0,
    crowdLevel: "Low",
    resources: { beds: 18, icuBeds: 2, bloodUnits: 10, oxygenUnits: 25, ambulances: 1 },
    doctors: { "Maternity": ["Dr. S. Kulkarni"] }
  },
  {
    id: "dhanwantari",
    name: "Dhanwantari Multi Speciality Hospital",
    type: "Private",
    departments: ["General Medicine", "Surgery"],
    facilities: ["General hospital services"],
    distanceKm: 3.5,
    crowdLevel: "Moderate",
    resources: { beds: 25, icuBeds: 4, bloodUnits: 15, oxygenUnits: 45, ambulances: 1 },
    doctors: { "General Medicine": ["Dr. B. Yadav"] }
  },
  {
    id: "sai",
    name: "Sai Hospital",
    type: "Private",
    departments: ["General Surgery", "General Medicine"],
    facilities: ["Laparoscopic surgery", "General physician care"],
    distanceKm: 3.0,
    crowdLevel: "High",
    resources: { beds: 22, icuBeds: 3, bloodUnits: 10, oxygenUnits: 35, ambulances: 1 },
    doctors: { "General Surgery": ["Dr. N. Bhat"] }
  },
  {
    id: "soham",
    name: "Soham Hospital",
    type: "Private",
    departments: ["Pediatrics", "Urology", "Orthopedics"],
    facilities: ["Multispeciality care"],
    distanceKm: 3.5,
    crowdLevel: "Moderate",
    resources: { beds: 28, icuBeds: 5, bloodUnits: 18, oxygenUnits: 55, ambulances: 2 },
    doctors: { "Pediatrics": ["Dr. C. Iyer"] }
  },
  {
    id: "surya",
    name: "Surya Lifecare Hospital",
    type: "Private",
    departments: ["General Medicine", "Emergency Medicine"],
    facilities: ["24-hour listing"],
    distanceKm: 5.0,
    crowdLevel: "Low",
    resources: { beds: 30, icuBeds: 6, bloodUnits: 25, oxygenUnits: 60, ambulances: 2 },
    doctors: { "Emergency Medicine": ["Dr. D. Sawant"] }
  },
  {
    id: "immicare",
    name: "IMMICARE Multispeciality Hospital",
    type: "Private",
    departments: ["General Medicine", "Surgery"],
    facilities: ["Outpatient services", "Extended hours"],
    distanceKm: 2.5,
    crowdLevel: "Low",
    resources: { beds: 35, icuBeds: 5, bloodUnits: 20, oxygenUnits: 70, ambulances: 1 },
    doctors: { "General Medicine": ["Dr. P. Hegde"] }
  },
  {
    id: "jeevanjyot",
    name: "Jeevan Jyot Hospital",
    type: "Private",
    departments: ["Critical Care", "Cardiology"],
    facilities: ["ICU services", "Ventilators", "Echocardiography", "Defibrillator"],
    distanceKm: 8.0,
    crowdLevel: "High",
    resources: { beds: 80, icuBeds: 25, bloodUnits: 70, oxygenUnits: 150, ambulances: 4 },
    doctors: { "Critical Care": ["Dr. A. Wagh"] }
  },
  {
    id: "manipal",
    name: "Manipal Hospital, Kharadi",
    type: "Private",
    departments: ["Cardiology", "Neurology", "Surgery", "Emergency Medicine", "Pediatrics"],
    facilities: ["24-hour emergency", "Surgical ICU", "NICU", "PICU", "Advanced diagnostics"],
    distanceKm: 10.0,
    crowdLevel: "Moderate",
    resources: { beds: 250, icuBeds: 45, bloodUnits: 200, oxygenUnits: 500, ambulances: 8 },
    doctors: { "Cardiology": ["Dr. P. Jadhav"], "Surgery": ["Dr. H. Rajekar"] }
  }
];