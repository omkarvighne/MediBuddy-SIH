import React, { createContext, useState, useContext } from 'react';
import { HOSPITALS } from '../data'; // Ensure this path matches where your data.js is

const HospitalContext = createContext(null);

export const HospitalProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState(HOSPITALS);

  const updateResource = (hospitalId, resourceKey, delta) => {
    setHospitals((prevHospitals) => 
      prevHospitals.map(h => {
        if (h.id === hospitalId) {
          return {
            ...h,
            resources: {
              ...h.resources,
              [resourceKey]: Math.max(0, h.resources[resourceKey] + delta)
            }
          };
        }
        return h;
      })
    );
  };

  return (
    <HospitalContext.Provider value={{ hospitals, updateResource }}>
      {children}
    </HospitalContext.Provider>
  );
};

// Custom hook to easily grab the data in any file
export const useHospitals = () => useContext(HospitalContext);