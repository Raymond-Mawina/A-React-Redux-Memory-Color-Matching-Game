import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export function Header() {
  return (
    <AppBar
      data-testid="Header"
      className="Header"
      position="relative"
      style={{
        background: "#085394",
        textAlign: "center",
        placeItems: "center",
      }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold", fontSize: "40px" }}
        >
          Memory Game
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
