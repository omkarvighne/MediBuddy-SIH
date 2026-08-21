import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Or wherever your CSS is imported
import { HospitalProvider } from './context/HospitalContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HospitalProvider>
      <App />
    </HospitalProvider>
  </React.StrictMode>,
)