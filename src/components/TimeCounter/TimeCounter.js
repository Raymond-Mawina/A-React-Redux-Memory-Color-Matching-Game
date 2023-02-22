import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

function TimeCounter({ allCardsMatched, startGame, restartClicked }) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [secondsText, setSecondsText] = useState("seconds");
  const [minutesText, setMinutesText] = useState("minutes");

  useEffect(() => {
    let timer;

    if (!allCardsMatched)
      timer = setInterval(() => setSeconds(seconds + 1), 1000);

    if (seconds >= 60) {
      setMinutes(minutes + 1);
      setSeconds(seconds - 60);
    }

    if (minutes === 1) setMinutesText("minute");
    else setMinutesText("minutes");

    if (seconds === 1) setSecondsText("second");
    else setSecondsText("seconds");

    if (!startGame && restartClicked) {
      setSeconds(0);
      setMinutes(0);
    }

    return () => {
      clearInterval(timer);
    };
  }, [allCardsMatched, seconds, startGame, minutes, restartClicked]);

  return (
    <Grid
      container
      data-testid="TimeCounter"
      style={{
        placeContent: "center",
        padding: "5px",
      }}
    >
      {allCardsMatched && (
        <Typography
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "green",
            fontSize: "20px",
          }}
        >{`The game was completed in ${minutes} ${minutesText} ${seconds} ${secondsText}`}</Typography>
      )}

      {!allCardsMatched && (
        <Typography
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: "green",
            fontSize: "20px",
          }}
        >{`${minutes} ${minutesText} ${seconds} ${secondsText}`}</Typography>
      )}
    </Grid>
  );
}

export default TimeCounter;
