import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import FestivalIcon from "@mui/icons-material/Festival";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useParams } from "react-router-dom";
import { customMuiTheme } from "../config/customMuiTheme";
import SeatMap from "../components/reservation-page-components/SeatMap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserService from "../services/userService";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function getCurrentTimestamp() {
  const now = new Date();
  return now.getTime();
}

export function ReservationPage() {
  const { contrastGreen } = customMuiTheme.colors;
  const [seatMaps, setSeatMaps] = useState([]);
  const [selectedSeatMap, setSelectedSeatMap] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const userService = new UserService();
  const [user, setUser] = useState({});
  const [nonNumberedReservations, setNonNumberedReservations] = useState({});
  const [timers, setTimers] = useState({});
  const [counter, setCounter] = useState(300);
  const [reservationUnconfirmed, setReservationUnconfirmed] = useState([]);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const event = {
    name: "NTVG – Gira 30 años",
    artist: "No Te Va A Gustar",
    image: "https://www.rockaxis.com/img/newsList/3008122.png",
    location_id: "665f75a54a72077ce226e322",
    user_id: "user1",
    dates: [
      {
        date_time: "2024-06-22T23:00:00.000Z",
        sectors: [
          {
            name: "Campo",
            numbered: false,
            rowsNumber: 1,
            seatsNumber: 40,
            available: 40,
            rows: [],
            _id: "6660f7f2529a95d7455a3h8x",
          },
          {
            name: "Platea Alta",
            numbered: true,
            rowsNumber: 3,
            seatsNumber: 10,
            available: 29,
            rows: Array.from({ length: 3 }, (_, rowIndex) =>
              Array.from({ length: 10 }, (_, seatIndex) => ({
                _id: `-${rowIndex + 1}-${String.fromCharCode(65 + seatIndex)}`,
                displayId: `${String.fromCharCode(65 + rowIndex)}-${
                  seatIndex + 1
                }`,
                available: true,
                timestamp: null,
                reservedBy: null,
              }))
            ),
            _id: "6660f7f2529a95d7455a3f9K",
          },
          {
            name: "Platea Baja",
            numbered: true,
            rowsNumber: 5,
            seatsNumber: 10,
            available: 50,
            rows: Array.from({ length: 5 }, (_, rowIndex) =>
              Array.from({ length: 10 }, (_, seatIndex) => ({
                _id: `-${rowIndex + 1}-${String.fromCharCode(65 + seatIndex)}`,
                displayId: `${String.fromCharCode(65 + rowIndex)}-${
                  seatIndex + 1
                }`,
                available: true,
                timestamp: null,
                reservedBy: null,
              }))
            ),
            _id: "6660f7f2529a95d7455a3yui",
          },
        ],
      },
      {
        date_time: "2024-06-23T23:00:00.000Z",
        sectors: [
          {
            name: "Campo",
            numbered: false,
            rowsNumber: 1,
            seatsNumber: 40,
            available: 40,
            rows: [],
            _id: "6660f7f2529a95d7455a3f3e",
          },
          {
            name: "Platea Alta",
            numbered: true,
            rowsNumber: 3,
            seatsNumber: 10,
            available: 29,
            rows: Array.from({ length: 3 }, (_, rowIndex) =>
              Array.from({ length: 10 }, (_, seatIndex) => ({
                _id: `-${rowIndex + 1}-${String.fromCharCode(65 + seatIndex)}`,
                displayId: `${String.fromCharCode(65 + rowIndex)}-${
                  seatIndex + 1
                }`,
                available: true,
                timestamp: null,
                reservedBy: null,
              }))
            ),
            _id: "6660f7f2529a95d7455a3f3f",
          },
          ,
          {
            name: "Platea Baja",
            numbered: true,
            rowsNumber: 5,
            seatsNumber: 10,
            available: 50,
            rows: Array.from({ length: 5 }, (_, rowIndex) =>
              Array.from({ length: 10 }, (_, seatIndex) => ({
                _id: `-${rowIndex + 1}-${String.fromCharCode(65 + seatIndex)}`,
                displayId: `${String.fromCharCode(65 + rowIndex)}-${
                  seatIndex + 1
                }`,
                available: true,
                timestamp: null,
                reservedBy: null,
              }))
            ),
            _id: "6660f7f2529a95d7455a3w3g",
          },
        ],
      },
      {
        date_time: "2024-06-24T23:00:00.000Z",
        sectors: [
          {
            name: "Campo",
            numbered: false,
            rowsNumber: 1,
            seatsNumber: 40,
            available: 40,
            rows: [],
            _id: "6660f7f2529a95d7455a3f3x",
          },
          {
            name: "Platea Alta",
            numbered: true,
            rowsNumber: 3,
            seatsNumber: 10,
            available: 29,
            rows: Array.from({ length: 3 }, (_, rowIndex) =>
              Array.from({ length: 10 }, (_, seatIndex) => ({
                _id: `-${rowIndex + 1}-${String.fromCharCode(65 + seatIndex)}`,
                displayId: `${String.fromCharCode(65 + rowIndex)}-${
                  seatIndex + 1
                }`,
                available: true,
                timestamp: null,
                reservedBy: null,
              }))
            ),
            _id: "6660f7f2529a95d7455a3f3u",
          },
          ,
          {
            name: "Platea Baja",
            numbered: true,
            rowsNumber: 5,
            seatsNumber: 10,
            available: 50,
            rows: Array.from({ length: 5 }, (_, rowIndex) =>
              Array.from({ length: 10 }, (_, seatIndex) => ({
                _id: `-${rowIndex + 1}-${String.fromCharCode(65 + seatIndex)}`,
                displayId: `${String.fromCharCode(65 + rowIndex)}-${
                  seatIndex + 1
                }`,
                available: true,
                timestamp: null,
                reservedBy: null,
              }))
            ),
            _id: "6660f7f2529a95d7455a3lp8",
          },
        ],
      },
    ],
    __v: 0,
  };

  console.log(event.dates[0].sectors[1]);
  useEffect(() => {
    const loggedUser = userService.getUserFromLocalStorage();
    setUser({ id: loggedUser.id, email: loggedUser.email });
    setSeatMaps(event.dates[selectedDateIndex].sectors);
    const initialReservations = {};
    event.dates[selectedDateIndex].sectors.forEach((sector) => {
      if (!sector.numbered) {
        initialReservations[sector.name] = 0;
      }
    });
    setNonNumberedReservations(initialReservations);
  }, [selectedDateIndex]);

  useEffect(() => {
    let timer;
    if (Object.keys(timers).length > 0 && !reservationConfirmed) {
      timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter <= 1) {
            handleTimeout();
            clearInterval(timer);
            return 300;
          }
          return prevCounter - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timers, reservationConfirmed]);

  const handleSeatClick = (clickedSeat) => {
    console.log(clickedSeat);
    // Guardar los asientos en un array de asientos pre seleccionados:
  };

  // const handleTimeout = () => {
  //   setSeatMaps((prevSeatMaps) =>
  //     prevSeatMaps.map((seatMap) => ({
  //       ...seatMap,
  //       rows: seatMap.rows.map((row) => ({
  //         ...row,
  //         seats: row.seats.map((seat) =>
  //           seatMap.reservedUnconfirmed.includes(seat.id)
  //             ? { ...seat, status: "Disponible", reservedBy: null }
  //             : seat
  //         ),
  //       })),
  //       reservedUnconfirmed: [],
  //     }))
  //   );
  //   setTimers({});
  // };

  const handleNonNumberedReservation = (sectorName, sectorId, operation) => {
    console.log(sectorName, sectorId, operation);
    if (operation === "add") {
      console.log("entre");
      const newReservedUnconfirmed = {
        timestamp: getCurrentTimestamp(),
        reservedBy: user.id,
      };
      const newReservationUnconfirmed = [...reservationUnconfirmed];
      console.log(newReservationUnconfirmed);
      newReservationUnconfirmed.push(newReservedUnconfirmed);
      console.log(newReservationUnconfirmed);
      setReservationUnconfirmed(newReservationUnconfirmed);
      console.log(reservationUnconfirmed);
    } else if (operation === "remove") {
      const newReservationUnconfirmed = [...reservationUnconfirmed];
      if (newReservationUnconfirmed.length > 0) {
        newReservationUnconfirmed.pop();
      }
      setReservationUnconfirmed(newReservationUnconfirmed);
    }
    console.log(reservationUnconfirmed);
    // return updatedReservations;

    // const updatedSeatMaps = seatMaps.map((sector) => {
    //   if (sector.name === sectorName && !sector.numbered) {
    //     const updatedRows =
    //       operation === "add"
    //         ? sector.rows.concat({
    //             reservedBy: user.id,
    //             timestamp: Date.now(),
    //           })
    //         : sector.rows.slice(0, -1);
    //     return {
    //       ...sector,
    //       available: sector.available - (operation === "add" ? 1 : -1),
    //       rows: updatedRows,
    //     };
    //   }
    //   return sector;
    // });

    // setSeatMaps(updatedSeatMaps);
  };

  const handleOpenModal = (seatMap) => {
    setSelectedSeatMap(seatMap);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSeatMap(null);
  };

  const handleDateChange = (index) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedDateIndex(index);
      setLoading(false);
    }, 1000);
  };

  const handleReservationChange = (sectorName, increment) => {
    const newCount = Math.max(
      0,
      (nonNumberedReservations[sectorName] || 0) + increment
    );

    setNonNumberedReservations((prevReservations) => ({
      ...prevReservations,
      [sectorName]: newCount,
    }));

    setSeatMaps((prevSeatMaps) =>
      prevSeatMaps.map((seatMap) => {
        if (seatMap.name === sectorName) {
          const newReservedUnconfirmed = Array(newCount)
            .fill(null)
            .map((_, idx) => `non-numbered-${idx}`);
          return {
            ...seatMap,
            reservedUnconfirmed: newReservedUnconfirmed,
          };
        }
        return seatMap;
      })
    );

    setTimers((prevTimers) => ({
      ...prevTimers,
      [sectorName]: true,
    }));

    setReservationConfirmed(false);
  };

  const handleConfirmReservations = () => {
    setReservationConfirmed(true);
    setTimers({});
    setCounter(300);
  };

  return (
    <>
      <Container maxWidth="md">
        <>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              color: contrastGreen,
              mt: 4,
              mb: {
                xs: 3,
                md: 6,
              },
              fontSize: {
                xs: "1.2rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
            }}
          >
            {"Reserva de tickets"}
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              mt: {
                xs: 2,
                md: 3,
              },
              fontSize: {
                xs: "1rem",
                md: "1.6rem",
              },
              alignSelf: "flex-start",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              color: "#bdbdbd",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocalActivityIcon sx={{ mr: 2, color: contrastGreen }} /> Artista
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: contrastGreen,
              // my: {
              //   xs: 2,
              // },
              fontSize: {
                xs: "0.8rem",
                md: "1.4rem",
              },
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.1rem",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {event.artist}
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              mt: {
                xs: 2,
                md: 3,
              },
              fontSize: {
                xs: "1rem",
                md: "1.6rem",
              },
              alignSelf: "flex-start",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              color: "#bdbdbd",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FestivalIcon sx={{ mr: 2, color: contrastGreen }} /> Evento
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: contrastGreen,
              fontSize: {
                xs: "0.8rem",
                md: "1.4rem",
              },
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.1rem",
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            {event.name}
          </Typography>
        </>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            mt: {
              xs: 2,
              md: 3,
            },
            fontSize: {
              xs: "1rem",
              md: "1.6rem",
            },
            alignSelf: "flex-start",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            color: "#bdbdbd",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CalendarMonthIcon sx={{ mr: 2, color: contrastGreen }} /> Fechas
        </Typography>
        <div style={{ marginBottom: "20px" }}>
          {event.dates.map((date, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => handleDateChange(index)}
              sx={{
                marginRight: "10px",
                marginTop: "5px",
                color: selectedDateIndex === index ? "black" : "white",
                border: "1px solid #01BB89",
                backgroundColor:
                  selectedDateIndex === index ? contrastGreen : "transparent",
              }}
            >
              {new Date(date.date_time).toLocaleDateString()}
              {" - "}
              {new Date(date.date_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
                timeZone: "UTC",
              })}
              {"hs"}
            </Button>
          ))}
        </div>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            mt: {
              xs: 2,
              md: 3,
            },
            fontSize: {
              xs: "1rem",
              md: "1.6rem",
            },
            alignSelf: "flex-start",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            color: "#bdbdbd",
            display: "flex",
            alignItems: "center",
          }}
        >
          <EventSeatIcon sx={{ mr: 2, color: contrastGreen }} /> Sectores
        </Typography>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
        ) : (
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
                {seatMaps.map((sector, index) => {
                  const totalSeats = sector.rowsNumber * sector.seatsNumber;
                  const occupiedSeats = sector.rows.reduce(
                    (acc, row) =>
                      acc +
                      row.filter((seat) => seat.status === "Reservado").length,
                    0
                  );

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
                        {sector.numbered ? (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal(sector)}
                          >
                            Seleccionar Asientos
                          </Button>
                        ) : (
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <IconButton
                              color="primary"
                              onClick={() =>
                                handleNonNumberedReservation(
                                  sector.name,
                                  sector._id,
                                  "remove"
                                )
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>
                              {nonNumberedReservations[sector.name]}
                            </Typography>
                            <IconButton
                              color="primary"
                              onClick={() =>
                                handleNonNumberedReservation(
                                  sector.name,
                                  sector._id,
                                  "add"
                                )
                              }
                            >
                              <AddIcon />
                            </IconButton>
                          </Box>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {Object.keys(timers).length > 0 && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="h6" sx={{ color: contrastGreen }}>
              Tiempo para confirmar: {Math.floor(counter / 60)}:
              {("0" + (counter % 60)).slice(-2)}
            </Typography>
          </Box>
        )}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleConfirmReservations}
            sx={{ mt: 2, mb: 6 }}
          >
            Confirmar Reservas
          </Button>
        </Box>
      </Container>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "350px",
            bgcolor: "#142539",
            color: "lightgray",
            border: "1px solid lightgray",
            borderRadius: "5px",
            boxShadow: 24,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {selectedSeatMap && (
            <SeatMap
              rows={selectedSeatMap.rows}
              sectorName={selectedSeatMap.name}
              onSeatClick={handleSeatClick}
            />
          )}
          <Button onClick={handleCloseModal} variant="contained" sx={{ mt: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
