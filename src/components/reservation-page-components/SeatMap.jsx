import React, { useEffect } from "react";
import Seat from "./Seat";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { customStyles } from "../../config/customMuiTheme";
import escenario from "../../assets/img/escenario.png";
import availableIcon from "../../assets/img/available-seat.png";
import notAvailableIcon from "../../assets/img/notavailable-seat.png";
import preReservedIcon from "../../assets/img/prereserved-seat.png";
import preReservedByAdminIcon from "../../assets/img/reservedByAdmin-seat.png";
import UserService from "../../services/userService";

const SeatMap = ({ rows, sectorName, onSeatClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userService = new UserService();

  const loggedUser = userService.getUserFromLocalStorage();

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
        style={{ width: "15%", maxWidth: "40px", marginBottom: 3 }}
      />
      <div
        style={{
          fontSize: "12px",
          letterSpacing: "2px",
          paddingRight: "1rem",
          paddingLeft: "1rem",
          paddingBottom: "0.5rem",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        UBICACIÓN ESCENARIO
      </div>
      <Grid
        alignItems="center"
        justifyContent="center"
        sx={{
          overflowX: "auto",
          overflowY: "auto",
          maxWidth: "90vw",
          maxHeight: "50vh",
          padding: "1rem",
          paddingTop: "2.5rem",
        }}
      >
        {rows.map((rowBlock) => (
          <Grid
            item
            xs={12}
            key={rowBlock[0]._id}
            sx={{ minWidth: "max-content" }}
          >
            <Box
              display="flex"
              justifyContent="center"
              width="auto"
              sx={{
                marginLeft: "1rem",
                marginRight: "1rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
              }}
            >
              {rowBlock &&
                rowBlock.map((seat) => {
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
          fontSize: isMobile ? "10px" : "12px",
          letterSpacing: "2px",
          marginTop: "1rem",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {loggedUser.role == "admin" ? (
          <>
            <Box
              style={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <Box display="flex" alignItems="center">
                <img src={availableIcon} style={customStyles.seat}></img>
                <p style={{ margin: "5px 5px 0px 1px" }}>Disponible</p>
              </Box>
              <Box display="flex" alignItems="center">
                <img src={notAvailableIcon} style={customStyles.seat}></img>
                <p style={{ margin: "5px 5px 0px 1px" }}>
                  Reservado
                  <br />
                  (Con evento publicado)
                </p>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <Box display="flex" alignItems="center">
                <img src={preReservedIcon} style={customStyles.seat}></img>
                <p style={{ margin: "5px 5px 0px 1px" }}>Pre-reservado</p>
              </Box>
              <Box display="flex" alignItems="center">
                <img
                  src={preReservedByAdminIcon}
                  style={customStyles.seat}
                ></img>
                <p style={{ margin: "5px 5px 0px 1px" }}>
                  Reservado
                  <br />
                  (En creación de sector)
                </p>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box display="flex" alignItems="center">
              <img src={availableIcon} style={customStyles.seat}></img>
              <p style={{ margin: "5px 5px 0px 1px" }}>Disponible</p>
            </Box>
            <Box display="flex" alignItems="center">
              <img src={notAvailableIcon} style={customStyles.seat}></img>
              <p style={{ margin: "5px 5px 0px 1px" }}>Reservado</p>
            </Box>
            <Box display="flex" alignItems="center">
              <img src={preReservedIcon} style={customStyles.seat}></img>
              <p style={{ margin: "5px 5px 0px 1px" }}>Pre-reservado</p>
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};

export default SeatMap;
