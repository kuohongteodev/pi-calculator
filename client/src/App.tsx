import React, { useEffect, useState } from "react";
import { Button, Card, Container, Grid, makeStyles, Typography } from "@mui/material";
import io from "socket.io-client";
import Big from 'big.js';

const socket = io("http://localhost:8888/");


function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isFetching, setIsFetching] = useState(false);
  const [piValue, setPiValue] = useState("0");

  const diameterOfTheSun = 1.3927 * 1000000;

  const fetchPi = async () => {
    setIsFetching(true);
    const value = await (await fetch("http://localhost:8888/getpi")).json();
    setPiValue(value.value)
    setIsFetching(false);
    console.log(value);
  }

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  return (
    <Container>
      <section>
        <Typography variant="h1" align="center">
          Pi Calculator
        </Typography>
      </section>
      <div>
        <Grid container spacing={8} justifyContent="center">
          <Grid item>
            <Card sx={{ padding: "48px" }}>
              <Typography variant="h2">
                Current Known Value of Pi
              </Typography>
              <Typography variant="body1" sx={{ wordBreak: "break-all", whiteSpace: "normal" }}>
                {new Big(piValue).toString()}
              </Typography>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ padding: "48px" }}>
              <Typography variant="h2">
                Circumferrence Of The Sun
              </Typography>
              <Typography variant="body1" sx={{ wordBreak: "break-all", whiteSpace: "normal" }}>
                {new Big(piValue).times(diameterOfTheSun).toString()} million kilometers
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={fetchPi} sx={{ margin: "48px auto", padding: "24px", display: "block" }}>
          Get Latest Pi Calculation
        </Button>
      </div>
    </Container >
  );
}

export default App;
