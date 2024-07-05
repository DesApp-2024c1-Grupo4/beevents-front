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
          fontSize: "18px",
          letterSpacing: "2px",
          marginBottom: "1rem",
          paddingRight: "1rem",
          paddingLeft: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid #01BB89",
          textAlign: "center",
        }}
      >
        <span
          style={{ color: "#01BB89", marginBottom: "1rem", fontWeight: 600 }}
        >
          Mapa de asientos
        </span>
        <br></br>
        {sectorName}
      </div>
      <Grid container spacing={0.1} justifyContent="center">
        {rows.map((rowBlock) => (
          <Grid item xs={12} key={rowBlock.id}>
            <Box display="flex" justifyContent="center" width="100%">
              {rowBlock.map((seat) => (
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
