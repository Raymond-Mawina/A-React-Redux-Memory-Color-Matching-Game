import React from "react";
import { Box, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { connect } from "react-redux";
import {
  setGridRowsAction,
  setGridColumnsAction,
  setStartGameAction,
} from "../../redux/features/board/actions.js";
import { ButtonContainer } from "../Button/Button.js";

function GridSize({
  setStartGame,
  gridRows,
  setGridColumns,
  gridColumns,
  setGridRows,
  startGameFormErrors,
}) {
  const handleStartGame = () => {
    setStartGame();
  };

  return (
    <Box data-testid="GridSize">
      <Grid item xs={12} textAlign="center">
        <TextField
          inputProps={{
            "data-testid": "Select grid rows",
          }}
          label="Select number of grid row(s)"
          variant="outlined"
          style={{ width: "30%", margin: "15px" }}
          value={gridRows}
          onChange={(event) => {
            setGridRows(event.target.value);
          }}
          select
        >
          <MenuItem value={1}>1 Row</MenuItem>
          <MenuItem value={2}> 2 Rows</MenuItem>
          <MenuItem value={3}> 3 Rows</MenuItem>
          <MenuItem value={4}> 4 Rows</MenuItem>
        </TextField>

        <TextField
          inputProps={{
            "data-testid": "Select grid columns",
          }}
          label="Select number of grid column(s)"
          variant="outlined"
          style={{ width: "30%", margin: "15px" }}
          value={gridColumns}
          onChange={(event) => {
            setGridColumns(event.target.value);
          }}
          select
        >
          <MenuItem value={1}> 1 Column</MenuItem>
          <MenuItem value={2}> 2 Columns</MenuItem>
          <MenuItem value={3}> 3 Columns</MenuItem>
          <MenuItem value={4}> 4 Columns</MenuItem>
        </TextField>
      </Grid>

      {startGameFormErrors.length > 0 && (
        <Grid item xs={12} textAlign="center">
          {startGameFormErrors.map((error) => (
            <Typography fontWeight={"bold"} color="red">
              {error}
            </Typography>
          ))}
        </Grid>
      )}
      <Grid item xs={12}>
        <ButtonContainer label="Start Game" handleClick={handleStartGame} />
      </Grid>
    </Box>
  );
}

const mapStateToProps = (state) => {
  return {
    gridRows: state.gridRows,
    gridColumns: state.gridColumns,
    startGameFormErrors: state.startGameFormErrors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGridRows: (gridRows) => dispatch(setGridRowsAction(gridRows)),
    setGridColumns: (gridColumns) =>
      dispatch(setGridColumnsAction(gridColumns)),
    setStartGame: () => dispatch(setStartGameAction()),
  };
};

export const GridSizeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GridSize);
