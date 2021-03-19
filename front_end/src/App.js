import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import InputBar from './Components/InputBar';
import CalculationLogs from './Components/CalculationLogs';
import socketIOClient from "socket.io-client";

const socket = socketIOClient("https://sheltered-hollows-77587/");

function App() {
  const [logs, setLogs] = useState(["Couldn't Connect to Server"]);
  
  // listen to socket update
  useEffect(() => {
    socket.on("update", data =>{
      setLogs(data);
    })
  }, []);

  return (
    <div className="app container">
      <h1>Calculator</h1>
      <InputBar socket={socket}/>
      <h2 className="text-left">Recent Calculations:</h2>
      <CalculationLogs logs={logs}/>
    </div>
  );
}

export default App;
