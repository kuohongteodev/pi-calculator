import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import io from "socket.io-client";

const socket = io("http://localhost:8888/");

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const pingServer = () => {
    if (isConnected) {
      socket.emit("get");
    }
  };

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
        <button onClick={pingServer}>Get timer current time</button>
      </header>
    </div>
  );
}

export default App;
