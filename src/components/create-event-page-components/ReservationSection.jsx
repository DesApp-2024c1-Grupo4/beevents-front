import { Add, Close, EventSeat, Remove } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, Input, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { customMuiTheme } from "../../config/customMuiTheme";
import SectorDistributionMap from "./SectorDistributionMap";

export default function ReservationSection({ dates, sectors }) {
  const { contrastGreen } = customMuiTheme.colors;
  const [datesArray, setDatesArray] = useState(dates.map(date => ({
    date_time: date,
    sectors: sectors
  })));
  const [selectedDate, setSelectedDate] = useState(datesArray[0]);
  const [loading, setLoading] = useState(false);
  const [selectedSeatMap, setSelectedSeatMap] = useState(null);
  const [seatMap, setSeatMap] = useState({ name: "", rows: [] });
  const [reservedSeats, setReservedSeats] = useState([]);
  const [reservedPlaces, setReservedPlaces] = useState(0);
  const [openNumbered, setOpenNumbered] = useState(false);
  const [openNonNumbered, setOpenNonNumbered] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);

  const resetSeatMap = (sector) => {
    const newRows = [];
    for (var i = 0; i < sector.rowsNumber; i++) {
      newRows[i] = [];
      for (var j = 0; j < sector.seatsNumber; j++) {
        const seat = { _id: [i, j], available: true, reservedBy: "vacio" }
        newRows[i][j] = seat;
      }
    }
    setSeatMap(prevSeatMap => ({
      name: sector.name,
      rows: newRows
    }));
  }

  const handleOpenModal = (sector) => {
    setSelectedSector(sector);
    if (sector.numbered) {
      resetSeatMap(sector);
      setOpenNumbered(true);
    } else {
      setOpenNonNumbered(true);
    }
  }

  const handleSeatClick = (clickedSeat) => {
    clickedSeat.available = !clickedSeat.available
    clickedSeat.reservedBy === "vacio" ? clickedSeat.reservedBy = "pre-reserved" : clickedSeat.reservedBy = "vacio"
    const rowsCopy = seatMap.rows.slice();
    const clickedSeatIdx = clickedSeat._id
    const clickedSeatCopy = rowsCopy[clickedSeatIdx[0]][clickedSeatIdx[1]]
    clickedSeatCopy.available = clickedSeat.available
    clickedSeatCopy.reservedBy = clickedSeat.reservedBy
    setSeatMap(prevSeatMap => ({
      ...prevSeatMap,
      rows: rowsCopy
    }))
  }

  const handleCloseNumbered = () => {
    setOpenNumbered(false);
  }

  const handleCloseNonNumbered = () => {
    setOpenNonNumbered(false);
  }

  const handleNonNumberedReservationChange = (e) => {
    setReservedPlaces(Number(e.target.value));
  };

  return (
    <>
      <Stack spacing={3} px={3}>
        <Typography
          variant="h1"
          gutterBottom
          sx={{ alignSelf: { xs: "center", sm: "flex-start" } }}
        >
          Pre-reservas
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }}>
          {datesArray.map((date, index) => (
            <Button
              key={index}
              variant={selectedDate.date_time === date.date_time ? "contained" : "outlined"}
              onClick={() => setSelectedDate(date)}
              sx={{
                marginRight: "10px",
                marginTop: "5px",
              }}
            >
              {new Date(date.date_time).toLocaleDateString()}
              {" - "}
              {new Date(date.date_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
              {"hs"}
            </Button>
          ))}
        </Stack>
        <TableContainer
          component={Paper}
          sx={{
            mt: {
              xs: 2,
              md: 3,
            },
            backgroundColor: "#142539",
            color: "GrayText",
          }}
        >
          <Table
            sx={{
              backgroundColor: "#142539",
              color: "lightgray",
              borderColor: "lightgray",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: "lightgray",
                    borderColor: "lightgray",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    fontSize: "15px",
                  }}
                >
                  <b>Sector</b>
                </TableCell>
                <TableCell
                  sx={{
                    color: "lightgray",
                    borderColor: "lightgray",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    fontSize: "15px",
                  }}
                  align="right"
                >
                  <b>Asientos Totales</b>
                </TableCell>
                <TableCell
                  sx={{
                    color: "lightgray",
                    borderColor: "lightgray",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    fontSize: "15px",
                  }}
                  align="right"
                >
                  <b>Asientos (Ocupados / Totales)</b>
                </TableCell>
                <TableCell
                  sx={{
                    color: "lightgray",
                    borderColor: "lightgray",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                    fontSize: "15px",
                  }}
                  align="center"
                >
                  <b>Reservar</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedDate.sectors.map((sector, index) => {
                const totalSeats = sector.seatsNumber * sector.rowsNumber - sector.eliminated.length
                const occupiedSeats = sector.preReserved.length
                console.log(datesArray)
                return (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "lightgray", borderColor: "lightgray" }}
                    >
                      {sector.name}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "lightgray", borderColor: "lightgray" }}
                    >
                      {totalSeats}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ color: "lightgray", borderColor: "lightgray" }}
                    >
                      {occupiedSeats}/{totalSeats}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "lightgray", borderColor: "lightgray" }}
                    >
                      <Button
                        variant="contained"
                        color="primary"

                      >
                        Reservar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      {/** 
      <Modal
        open={openNumbered}
        onClose={handleCloseNumbered}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // maxWidth: "90%",
            width: "auto",
            maxWidth: "90vw",
            maxHeight: "95vh",
            flexWrap: "wrap",
            bgcolor: "#142539",
            color: "lightgray",
            border: "1px solid lightgray",
            borderRadius: "5px",
            boxShadow: 24,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {seatMap && (
            <SectorDistributionMap
              rows={seatMap.rows}
              sectorName={seatMap.name}
              onSeatClick={handleSeatClick}
              statuses={["Disponible", "Reservado"]}
              reserving={false}
            />
          )}
          <Tooltip
            title="Cerrar"
            placement="left-end"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#000000",
                  color: "white",
                  fontSize: { xs: "10px", sm: "12px" },
                  borderRadius: "4px",
                  p: 1
                },
              },
              arrow: {
                sx: {
                  color: "#000000",
                },
              },
            }}
            arrow
          >
            <IconButton
              size="small"
              onClick={() => setOpenNumbered(false)}
              sx={{
                position: "absolute",
                top: "-1px",
                right: "-2px"
              }}>
              <Close fontSize="small" />
            </IconButton>
          </Tooltip>
          <Stack direction="row" mt={2} spacing={2}>
            <Button onClick={() => setOpenNumbered(false)} size="small">Cancelar</Button>
            <Button onClick={() => resetSeatMap()} variant="outlined" size="small">Resetear</Button>
            <Button onClick={handleCloseNumbered} variant="contained" size="small">Aceptar</Button>
          </Stack>

        </Box>
      </Modal>
      <Modal
        open={openNonNumbered}
        onClose={handleCloseNonNumbered}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            maxWidth: "90vw",
            maxHeight: "95vh",
            flexWrap: "wrap",
            bgcolor: "#142539",
            color: "lightgray",
            border: "1px solid lightgray",
            borderRadius: "5px",
            boxShadow: 24,
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            spacing={2}
            sx={{
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
            <Typography sx={{ color: "#01BB89", fontWeight: 600 }}>
              Reservar lugares
            </Typography>
            <Typography>{"selectedSector.name"}</Typography>
          </Stack>
          <Stack direction="row" spacing={3} p={2}>
            <Typography id="cantidad" alignSelf="center">Cantidad</Typography>
            <Input
              value={reservedPlaces}
              onChange={handleNonNumberedReservationChange}
              size="small"
              inputProps={{
                step: 1,
                min: 0,
                max: 10,
                type: "number",
                "aria-labelledby": "cantidad",
              }}
              sx={{ width: "55px", alignSelf: "center" }}
            />
          </Stack>
          <Tooltip
            title="Cerrar"
            placement="left-start"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#000000",
                  color: "white",
                  fontSize: { xs: "10px", sm: "12px" },
                  borderRadius: "4px",
                  p: 1
                },
              },
              arrow: {
                sx: {
                  color: "#000000",
                },
              },
            }}
            arrow
          >
            <IconButton
              size="small"
              onClick={() => setOpenNonNumbered(false)}
              sx={{
                position: "absolute",
                top: "-1px",
                right: "-2px"
              }}>
              <Close fontSize="small" />
            </IconButton>
          </Tooltip>
          <Stack direction="row" mt={2} spacing={2}>
            <Button onClick={() => setOpenNonNumbered(false)} size="small">Cancelar</Button>
            <Button variant="contained" onClick={handleCloseNonNumbered} size="small">Aceptar</Button>
          </Stack>
        </Box>
      </Modal>
      */}
    </>
  )
}
