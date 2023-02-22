import React from "react";
import { Button, Grid } from "@mui/material";

export function ButtonContainer({ label, handleClick }) {
  return (
    <Grid
      container
      m="auto"
      style={{
        marginTop: "5px",
        placeContent: "center",
      }}
    >
      <Button
        data-testid={label}
        style={{
          width: "200px",
          padding: "10px",
          border: "none",
          backgroundColor: "#085394",
          color: "white",
          fontWeight: "bold",
          fontSize: "medium",
        }}
        onClick={() => handleClick()}
      >
        {label}
      </Button>
    </Grid>
  );
}
