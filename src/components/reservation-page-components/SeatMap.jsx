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

const generateLabels = (count) => {
  const labels = [];
  for (let i = 0; i < count; i++) {
    let label = "";
    let n = i;
    while (n >= 0) {
      label = String.fromCharCode((n % 26) + 65) + label;
      n = Math.floor(n / 26) - 1;
    }
    labels.push(label);
  }
  return labels;
};

const isEmptyRow = (rowBlock) => {
  return rowBlock.every((seat) => seat.available === "eliminated");
};

const SeatMap = ({ rows, sectorName, onSeatClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userService = new UserService();
  const loggedUser = userService.getUserFromLocalStorage();

  const rowCount = rows.length;
  const colCount = rows[0]?.length || 0;

  const rowLabels = generateLabels(rowCount);
  const colLabels = Array.from({ length: colCount }, (_, i) => i + 1);

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
        {rows.map((rowBlock, rowIndex) => (
          <Grid
            item
            xs={12}
            key={rowIndex}
            display="flex"
            justifyContent="center"
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
              <Box
                sx={{
                  width: "30px",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  color: isEmptyRow(rowBlock) ? "#CDCDCD" : "#01BB89",
                  fontSize: "15px",
                }}
              >
                {rowLabels[rowIndex]}
              </Box>
              <Box display="flex" justifyContent="center" width="auto">
                {isEmptyRow(rowBlock) ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: `${rowBlock.length * 22}px`,
                      height: "100%",
                      fontSize: "12px",
                      alignItems: "center",
                      color: "#CDCDCD",
                      letterSpacing: "5px",
                    }}
                  >
                    - PASILLO -
                  </Box>
                ) : (
                  <>
                    {rowBlock.map((seat) => {
                      const seatWithPreReserved = { ...seat };
                      return (
                        <Seat
                          key={seatWithPreReserved._id}
                          seat={seatWithPreReserved}
                          onSeatClick={onSeatClick}
                          reservedBy={seatWithPreReserved.reservedBy}
                        />
                      );
                    })}
                  </>
                )}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <div
        style={{
          color: "#fff",
          fontSize: isMobile ? "10px" : "12px",
          letterSpacing: "2px",
          marginTop: "0.5rem",
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
              <Box display="flex" alignItems="center" sx={{ margin: "3px" }}>
                <img src={availableIcon} style={customStyles.seat}></img>
                <p style={{ margin: "5px 5px 0px 1px" }}>Disponible</p>
              </Box>
              <Box display="flex" alignItems="center" sx={{ margin: "3px" }}>
                <img src={notAvailableIcon} style={customStyles.seat}></img>
                <p style={{ margin: "5px 5px 0px 1px" }}>Reservado</p>
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
              }}
            >
              <Box display="flex" alignItems="center" sx={{ margin: "3px" }}>
                <img src={preReservedIcon} style={customStyles.seat}></img>
                <p style={{ margin: "5px 5px 0px 1px" }}>Seleccionado</p>
              </Box>
              <Box display="flex" alignItems="center" sx={{ margin: "3px" }}>
                <img
                  src={preReservedByAdminIcon}
                  style={customStyles.seat}
                ></img>
                <p style={{ margin: "5px 5px 0px 1px" }}>Pre-Reservado</p>
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
              <p style={{ margin: "5px 5px 0px 1px" }}>Seleccionado</p>
            </Box>
          </>
        )}
      </div>
    </Box>
  );
};

export default SeatMap;
