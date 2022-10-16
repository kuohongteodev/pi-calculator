import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import io from "socket.io-client";
import Big from 'big.js';

const socket = io("http://localhost:8888/");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isFetching, setIsFetching] = useState(false);
  const [piValue, setPiValue] = useState("0");

  const diameterOfTheSun = 1.3927 * 1000000;

  const pingServer = () => {
    if (isConnected) {
      socket.emit("get");
    }
  };

  const fetchPi = async () => {
    setIsFetching(true);
    const value = await (await fetch("http://localhost:8888/getpi")).json();
    setPiValue(value.value)
    setIsFetching(false);
    console.log(value);
  }

  useEffect(() => {
    socket.on("connect", () => {
      console.log();
      setIsConnected(true);
      socket.emit("get", "hehe");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("get", (arg) => {
      console.log("get", arg);
    });

    // socket.emit("get", "hehe");

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Grid container>
          <Grid item>
            <p>{isConnected.toString()}</p>
          </Grid>
          <Grid item>2</Grid>
        </Grid>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={fetchPi}>Get timer current time</button>
        <p>{new Big(piValue).toString()}</p>
        <p>Diameter {new Big(piValue).times(diameterOfTheSun).toString()}</p>
      </header>

    </div>
  );
}

export default App;
