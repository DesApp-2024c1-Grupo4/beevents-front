import React from "react";
import Seat from "./Seat";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const SeatMap = ({ rows, sectorName, onSeatClick }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      p={1}
    >
      <div
        style={{
          color: "#fff",
          margin: "5px",
          fontSize: "20px",
          letterSpacing: "2px",
        }}
      >
        {sectorName}
      </div>
      <Grid container spacing={1} justifyContent="center">
        {rows.map((rowBlock) => (
          <Grid item xs={12} key={rowBlock.id}>
            <Box display="flex" justifyContent="center">
              {rowBlock.seats.map((seat) => (
                <Seat
                  key={seat.id}
                  seat={seat}
                  onSeatClick={onSeatClick}
                  reservedBy={seat.reservedBy}
                />
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SeatMap;
