# MediBuddy — Emergency Healthcare Coordination Prototype

A React-based healthcare discovery and emergency-response **hackathon prototype**. The web interface combines hospital search and comparison, symptom-guided navigation, booking screens, and separate staff and ambulance views.

> **Demo status:** The current web application uses hospital information defined in `sih1620-frontend/src/data.js` and React state for its interactions. Resource counts and bookings shown in the frontend are illustrative, not verified real-time hospital availability. **Do not use this prototype for real emergencies or medical decisions.**

## Features visible in this repository

- Patient-facing landing, hospital search, details, comparison, and booking flows
- Symptom-to-department routing and recommendation UI
- Emergency-flow screens and ambulance dashboard
- Staff dashboard with editable demonstration resource counts
- React Leaflet / Leaflet dependencies for map functionality

## Tech stack

- React 19, JavaScript, Vite 8
- React Leaflet and Leaflet
- CSS

## Repository structure

```text
sih1620-frontend/
  src/
    App.jsx                   # App navigation and shared state
    data.js                   # Sample hospitals and symptom mappings
    components/               # Patient, hospital, staff, ambulance screens
  package.json
sih1620-mobile                # Mobile entry in Git; not a runnable source directory here
```

## Run the web application

Install a current Node.js release compatible with Vite 8.

```bash
git clone https://github.com/omkarvighne/MediBuddy-SIH.git
cd MediBuddy-SIH/sih1620-frontend
npm ci
npm run dev
```

Open the local address printed by Vite. Other commands:

```bash
npm run build
npm run preview
npm run lint
```

## Project scope and limitations

This repository currently provides a runnable **web frontend**, not a deployed hospital network or emergency dispatch service. In the current React app, sample hospital data and bookings are maintained in client-side state; they are not a persistent clinical database. The mobile source code is not included as a normal directory in the current Git tree.

## Screenshots

Add genuine screenshots or a demo video here after checking that they contain no personal or medical information. A short walkthrough of hospital search, comparison, and staff views would be useful for internship reviewers.

## Author

Developed as a hackathon project. Repository maintained by [Omkar Vighne](https://github.com/omkarvighne).
