import React, { useEffect, useRef, useState } from 'react'
import './App.css';

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  var [timeLeft, setTimeLeft] = useState(20 * 60); // default 20 min
  const [isBreak, setIsBreak] = useState(false);
  const [hasStarted, setHasStarted] = useState(false); // NEW
  const [showRestartDialog, setShowRestartDialog] = useState(false);
  const [focusDuration, setFocusDuration] = useState(20); // in minutes
  const [breakDuration, setBreakDuration] = useState(20); // in seconds

  const timerRef = useRef(null);
  const audioRef = useRef(new Audio('/alarm.mp3')); // use public/alarm.mp3

  // Loop alarm in break
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  // Timer effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  // Mode switch when timer hits 0
  useEffect(() => {
    if (timeLeft <= 0) {
      const nextIsBreak = !isBreak;
      setIsBreak(nextIsBreak);

      if (nextIsBreak) {
        setTimeLeft(breakDuration); // seconds
        audioRef.current.play();
      } else {
        setTimeLeft(focusDuration * 60); // minutes to seconds
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [timeLeft, isBreak, focusDuration, breakDuration]);

  // Format mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handlers
  const handleStart = () => {
    setTimeLeft(focusDuration * 60);
    setIsBreak(false);
    setIsRunning(true);
    setHasStarted(true); // Mark that user has started
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleRestart = () => {
    setShowRestartDialog(true);
  };

  const confirmRestart = () => {
    setShowRestartDialog(false);
    setIsRunning(true);
    setIsBreak(false);
    setTimeLeft(focusDuration * 60);
    setHasStarted(true);
    audioRef.current.pause();
    audioRef.current.currentTime = 0; // Reset to focus duration
  };

  const cancelRestart = () => {
    setShowRestartDialog(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">👀BlinkBreak👁️</h1>

      <div className="custom-inputs">
                <label>
          Focus Duration (min):
          <input
            type="number"
            min="0"
            value={focusDuration}
            onChange={(e) => {
                  const rawValue = e.target.value;
                  const value = Number(rawValue);
                      // Allow empty input without triggering timer logic
                  if (rawValue === '') {
                    setFocusDuration('');
                    return;
                  }
                  // Only update when valid number
                  if (!isNaN(value) && value > 0) {
                    setFocusDuration(value);
                    if (!isRunning) {
                      setTimeLeft(value * 60);
                      setIsBreak(false);
                    }
                  }
                }}

          />
        </label>

        <label>
          Break Duration (sec):
          <input
            type="number"
            min="1"
            value={breakDuration}
            onChange={(e) => setBreakDuration(Number(e.target.value))}
          />
        </label>
      </div>
      <div className={`timer-display ${isBreak ? 'break-mode' : 'focus-mode'}`}>
        <h2>{isBreak ? '🎴 Break Time' : '💻 Focus Time'}</h2>
        <script></script>
        <p>{formatTime(timeLeft)}</p>
      </div>

      <div className="controls">
        {!hasStarted && (
          <button onClick={handleStart} className="btn start">Start</button>
        )}
        {hasStarted && isRunning && (
          <button onClick={handlePause} className="btn pause">Pause</button>
        )}
        {hasStarted && !isRunning && (
          <button onClick={handleResume} className="btn resume">Resume</button>
        )}
        <button onClick={handleRestart} className="btn restart">Restart</button>
      </div>

      {showRestartDialog && (
        <div className="dialog">
          <div className="dialog-box">
            <h3>⚠️ Restart Warning</h3>
            <p>Continuous screen time more than 20 minutes is harmful for your eyes. Are you sure you want to restart?</p>
            <div className="dialog-actions">
              <button onClick={cancelRestart}>Don't Restart</button>
              <button onClick={confirmRestart}>I Want Restart</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
