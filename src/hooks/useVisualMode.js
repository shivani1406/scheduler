import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); // This line is new!

  function transition(Newmode, replace = false) {
    /* ... */
    
    if (replace) {
      setMode((prev) => Newmode)
      let replaceHistory = [...history];
      replaceHistory[replaceHistory.length - 1] = mode;
      setHistory((prev) => replaceHistory);
    } else {
      setMode((prev) => Newmode);
      let newHistory = [...history];
      newHistory.push(Newmode);
      setHistory((prev) => newHistory);
    }
  }
  function back() {  
    let newHistory = [...history];
    newHistory.pop(mode);
    setHistory((prev) => newHistory);
    if (history.length > 1) {
      setMode((prev) => newHistory[(newHistory.length - 1)]);
    } 
  }

  return { mode, transition, back };
};
