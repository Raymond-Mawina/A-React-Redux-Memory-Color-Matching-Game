import React from "react";
import { Box, Typography } from "@mui/material";

export function Message({ message }) {
  return (
    <Box
      data-testid="Message"
      m="auto"
      style={{
        placeContent: "center",
        padding: "10px",
        marginTop: "10px",
      }}
    >
      <Typography
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "green",
          fontSize: "20px",
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}
