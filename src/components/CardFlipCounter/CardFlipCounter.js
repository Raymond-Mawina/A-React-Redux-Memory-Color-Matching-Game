import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Message } from "../Message/Message.js";

function CardFlipCounter({ cardFlips, allCardsMatched }) {
  const [turns, setTurns] = useState("");

  useEffect(() => {
    if (cardFlips === 1) {
      setTurns("turn");
    } else {
      setTurns("turns");
    }
  }, [cardFlips]);

  return (
    <Box data-testid="CardFlipCounter">
      {allCardsMatched && (
        <Message
          message={`It took you ${cardFlips} ${turns} to win the game`}
        ></Message>
      )}
      {!allCardsMatched && (
        <Message message={`You have taken ${cardFlips} ${turns}`}></Message>
      )}
    </Box>
  );
}

export default CardFlipCounter;
