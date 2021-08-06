import React, { useState, useRef, useEffect } from "react";
// import ReactFCCtest from "react-fcctest";
import "./App.css";

const AppHook = () => {
  const [session, setSession] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [currentM, setCurrentM] = useState(25);
  const [currentS, setCurrentS] = useState(0);
  const [timeLeft, setTimeLeft] = useState(session * 60);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState("Session");

  const formatTimer = (time) => time.toString().padStart(2, "0");

  const handleInputOperator = (e) => {
    if (!running) {
      const target = e.target;
      const id = target.id;
      const operator = id.split("-");
      const area = operator[0];
      const operation = operator[1];

      if (operation === "increment") {
        if (area === "session") {
          if (session === 60) {
            return;
          }
          setSession(session + 1);
          setCurrentM(session + 1);
          setCurrentS(0);
          setTimeLeft((session + 1) * 60);
        } else {
          if (breakTime === 60) {
            return;
          }
          setBreakTime(breakTime + 1);
        }
      } else {
        if (area === "session") {
          if (session === 1) {
            return;
          }
          setSession(session - 1);
          setCurrentM(session - 1);
          setCurrentS(0);
          setTimeLeft((session - 1) * 60);
        } else {
          if (breakTime === 1) {
            return;
          }
          setBreakTime(breakTime - 1);
        }
      }
    }
  };

  let intervalRef = useRef();

  const handleStatus = () => {

    if (status === "Session") {
      setStatus("Break");
      setTimeLeft(60*breakTime);
    } else {
      setStatus("Session");
      setTimeLeft(60*session);
    }

  }

  const manageTime = () => {
    if (running) {
      setTimeLeft((prev) => prev - 1);

      if (timeLeft === 0) {
        const sound = document.getElementById("beep");
        sound.currentTime = 0;
        sound.play();

        handleStatus()
        
      }

      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft - minutes * 60;

      setCurrentM(minutes);
      setCurrentS(seconds);

      console.log(timeLeft)
    }
  };

  useEffect(() => {
    if(running){
      intervalRef.current = setInterval(manageTime, 1000);
      return () => clearInterval(intervalRef.current);
    }
  });

  const handleInputTimer = () => {
    if(!running){
      setTimeLeft(prev => prev-1)
    }else{
      clearInterval(intervalRef.current);
      setRunning((prev) => !prev);
      return;
    }
    setRunning((prev) => !prev);
    manageTime()
  };

  const handleInputReset = (e) => {
    if (running) {
      clearInterval(intervalRef.current);
    }
    setSession(25);
    setBreakTime(5);
    setCurrentM(25);
    setCurrentS(0);
    setTimeLeft(session * 60);
    setRunning(false);
    setStatus("Session");

    const sound = document.getElementById("beep");
    sound.currentTime = 0;
    sound.pause();
  };


  return (
    <div id="clock">
      {/* <ReactFCCtest /> */}
      <div id="settings">
        <div id="break">
          <div id="break-label">Break Length</div>
          <div className="wrapper-timer">
            <div
              className="button"
              id="break-decrement"
              onClick={handleInputOperator}
            >
              -
            </div>
            <div id="break-length">{breakTime}</div>
            <div
              className="button"
              id="break-increment"
              onClick={handleInputOperator}
            >
              +
            </div>
          </div>
        </div>
        <div id="session">
          <div id="session-label">Session Length</div>
          <div className="wrapper-timer">
            <div
              className="button"
              id="session-decrement"
              onClick={handleInputOperator}
            >
              -
            </div>
            <div id="session-length">{session}</div>
            <div
              className="button"
              id="session-increment"
              onClick={handleInputOperator}
            >
              +
            </div>
          </div>
        </div>
      </div>
      <div id="display">
        <div id="timer-label">{status}</div>
        <div id="time-left">
          {formatTimer(currentM) + ":" + formatTimer(currentS)}
        </div>
        <div
          className="button button_text"
          id="start_stop"
          onClick={handleInputTimer}
        >
          {!running ? "Start" : "Stop"}
        </div>
        <div
          className="button button_text"
          id="reset"
          onClick={handleInputReset}
        >
          Reset
        </div>
      </div>
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      ></audio>
    </div>
  );
};

export default AppHook;
