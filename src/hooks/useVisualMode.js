import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(mode, replace = false) {
    if (replace) {
      console.log([...history])
      setHistory([...history.slice(0, -1), mode]);
    } else {
      setHistory([...history, mode]);
    }
    setMode(mode);
  };

  const back = function() {
    if (history.length > 1) {
      setHistory(history.slice(0, -1));
    } else {
      setHistory(history);
    }
    // console.log(history)
    // console.log(history.slice(0, -1))
    setMode(history[history.length - 1]);
  };
  // console.log({mode, transition, back, history });

  return { mode, transition, back, history };
};