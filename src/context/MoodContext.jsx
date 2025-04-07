import { createContext, useState } from "react";

export const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
  const [mood, setMood] = useState("");

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
};
