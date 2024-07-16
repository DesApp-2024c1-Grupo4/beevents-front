import React from "react";
import Seat from "./Seat";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import escenario from "../../assets/img/escenario.png";

const SeatMap = ({ rows, sectorName, onSeatClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      <img
        src={escenario}
        alt="Escenario"
        style={{ width: "15%", maxWidth: "50px", marginBottom: 5 }}
      />
      <div
        style={{
          fontSize: "12px",
          letterSpacing: "2px",
          marginBottom: "1rem",
          paddingRight: "1rem",
          paddingLeft: "1rem",
          paddingBottom: "0.5rem",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        UBICACIÓN ESCENARIO
      </div>
      <Grid container spacing={0.1} justifyContent="center">
        {rows.map((rowBlock) => (
          <Grid item xs={12} key={rowBlock[0]._id}>
            <Box display="flex" justifyContent="center" width="auto">
              {rowBlock &&
                rowBlock.map((seat) => {
                  console.log(seat);
                  const seatWithPreReserved = {
                    ...seat,
                  };
                  return (
                    <Seat
                      key={seatWithPreReserved._id}
                      seat={seatWithPreReserved}
                      onSeatClick={onSeatClick}
                      reservedBy={seatWithPreReserved.reservedBy}
                    />
                  );
                })}
            </Box>
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          color: "#fff",
          fontSize: "12px",
          letterSpacing: "2px",
          marginTop: "1rem",
        }}
      >
        <Box display="flex" alignItems="center" mb={1.5}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#B9B9B9",
              marginRight: "8px",
            }}
          ></div>
          <p style={{ margin: 0 }}>Asiento disponible</p>
        </Box>
        <Box display="flex" alignItems="center" mb={1.5}>
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#E067B8",
              marginRight: "8px",
            }}
          ></div>
          <p style={{ margin: 0 }}>Asiento reservado</p>
        </Box>
        <Box display="flex" alignItems="center">
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: "#51DD99",
              marginRight: "8px",
            }}
          ></div>
          <p style={{ margin: 0 }}>Asiento pre-reservado</p>
        </Box>
      </div>
    </Box>
  );
};

export default SeatMap;
