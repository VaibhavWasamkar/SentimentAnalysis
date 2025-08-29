import { createContext, useContext, useState } from "react";

const DirectionContext = createContext();

export function DirectionProvider({ children }) {
  const [direction, setDirection] = useState(0);

  return (
    <DirectionContext.Provider value={{ direction, setDirection }}>
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  return useContext(DirectionContext);
}
