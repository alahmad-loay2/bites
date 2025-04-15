import React, { useState, useEffect } from 'react';
import './TimerBox.css';

function TimerBox() {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let timer;
  
    if (active && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (active && timeLeft === 0) {
      setActive(false); 
      alert("Time’s up, chef!");
    }
  
    return () => clearInterval(timer);
  }, [active, timeLeft]);
  

  const startTimer = () => {
    const totalSeconds = parseInt(minutes || 0) * 60 + parseInt(seconds || 0);
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setActive(true);
    }
  };

  const resetTimer = () => {
    setActive(false);
    setTimeLeft(null);
    setMinutes('');
    setSeconds('');
  };

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="timer-box">
      <h4>⏲️ Set Your Cooking Timer</h4>
      {!active ? (
        <div className="timer-inputs">
          <input
            type="number"
            placeholder="Min"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
          <input
            type="number"
            placeholder="Sec"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          />
          <button onClick={startTimer}>Start</button>
        </div>
      ) : (
        <div className="timer-countdown">
          <p>{formatTime()}</p>
          <button onClick={resetTimer}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default TimerBox;
