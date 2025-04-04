/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

// Create the context
const TiltContext = createContext();

// Custom hook to use the context
export const useTilt = () => useContext(TiltContext);

// Provider component to wrap the app
export function TiltProvider({ children }) {
  const [tilt, setTilt] = useState(30); // Default tilt angle

  return (
    <TiltContext.Provider value={{ tilt, setTilt }}>
      {children}
    </TiltContext.Provider>
  );
}
