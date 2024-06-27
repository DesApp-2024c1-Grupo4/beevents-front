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
import { useParams } from "react-router-dom";
import { customMuiTheme } from "../config/customMuiTheme";
import SeatMap from "../components/reservation-page-components/SeatMap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserService from "../services/userService";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const event = {
    _id: "6660f7f2529a95d7455a3f3d",
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
            reservedUnconfirmed: [],
            _id: "6660f7f2529a95d7455a3f3e",
          },
          {
            name: "Platea Alta",
            numbered: true,
            rowsNumber: 3,
            seatsNumber: 10,
            available: 29,
            rows: Array.from({ length: 3 }, (_, rowIndex) => ({
              id: `row-${rowIndex + 1}`,
              seats: Array.from({ length: 10 }, (_, seatIndex) => ({
                id: `-${rowIndex + 1}-${String.fromCharCode(65 + seatIndex)}`,
                displayId: `${rowIndex + 1}-${String.fromCharCode(
                  65 + seatIndex
                )}`,
                status: "Disponible",
                salable: true,
              })),
            })),
            reservedUnconfirmed: [],
            _id: "6660f7f2529a95d7455a3f3f",
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
            reservedUnconfirmed: [],
            _id: "6660f7f2529a95d7455a3f3x",
          },
          {
            name: "Platea Alta",
            numbered: true,
            rowsNumber: 3,
            seatsNumber: 10,
            available: 29,
            rows: Array.from({ length: 3 }, (_, rowIndex) => ({
              id: `row-${rowIndex + 1}`,
              seats: Array.from({ length: 10 }, (_, seatIndex) => ({
                id: `-${rowIndex + 1}-${String.fromCharCode(65 + seatIndex)}`,
                displayId: `${rowIndex + 1}-${String.fromCharCode(
                  65 + seatIndex
                )}`,
                status: "Disponible",
                salable: true,
              })),
            })),
            reservedUnconfirmed: [],
            _id: "6660f7f2529a95d7455a3f3u",
          },
        ],
      },
    ],
    __v: 0,
  };

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
    setSeatMaps((prevSeatMaps) => {
      const updatedSeatMaps = prevSeatMaps.map((seatMap) => {
        if (
          seatMap.rows.some((row) =>
            row.seats.some((seat) => seat.id === clickedSeat.id)
          )
        ) {
          return {
            ...seatMap,
            rows: seatMap.rows.map((row) => ({
              ...row,
              seats: row.seats.map((seat) =>
                seat.id === clickedSeat.id
                  ? {
                      ...seat,
                      status:
                        seat.status === "Reservado"
                          ? "Disponible"
                          : "Reservado",
                      reservedBy: seat.status === "Reservado" ? null : user,
                    }
                  : seat
              ),
            })),
            reservedUnconfirmed: seatMap.reservedUnconfirmed.includes(
              clickedSeat.id
            )
              ? seatMap.reservedUnconfirmed.filter(
                  (id) => id !== clickedSeat.id
                )
              : [...seatMap.reservedUnconfirmed, clickedSeat.id],
          };
        }
        return seatMap;
      });

      if (selectedSeatMap) {
        const updatedSelectedSeatMap = updatedSeatMaps.find(
          (map) => map.name === selectedSeatMap.name
        );
        setSelectedSeatMap(updatedSelectedSeatMap);
      }

      setTimers((prevTimers) => ({
        ...prevTimers,
        [clickedSeat.id]: true,
      }));

      setReservationConfirmed(false);

      return updatedSeatMaps;
    });
  };

  const handleTimeout = () => {
    setSeatMaps((prevSeatMaps) =>
      prevSeatMaps.map((seatMap) => ({
        ...seatMap,
        rows: seatMap.rows.map((row) => ({
          ...row,
          seats: row.seats.map((seat) =>
            seatMap.reservedUnconfirmed.includes(seat.id)
              ? { ...seat, status: "Disponible", reservedBy: null }
              : seat
          ),
        })),
        reservedUnconfirmed: [],
      }))
    );
    setTimers({});
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
    setCounter(300); // Reset the counter
  };

  return (
    <Container maxWidth="md">
      <>
        <Typography
          variant="h6"
          component="h6"
          gutterBottom
          sx={{
            color: contrastGreen,
            my: {
              xs: 2,
              md: 4,
            },
            fontSize: {
              xs: "1.5rem",
              md: "2rem",
            },
            alignSelf: "flex-start",
          }}
        >
          Reserva de Tickets
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: contrastGreen,
            my: {
              xs: 2,
            },
            fontSize: {
              xs: "1rem",
              md: "1.5rem",
            },
            alignSelf: "flex-start",
          }}
        >
          {event.artist}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: contrastGreen,
            my: {
              xs: 2,
            },
            fontSize: {
              xs: "1rem",
              md: "1.5rem",
            },
            alignSelf: "flex-start",
          }}
        >
          {event.name}
        </Typography>
      </>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: contrastGreen,
          my: {
            xs: 1,
          },
          fontSize: {
            xs: "1rem",
            md: "1.2rem",
          },
          alignSelf: "flex-start",
        }}
      >
        Fechas
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
              backgroundColor:
                selectedDateIndex === index ? contrastGreen : "default",
            }}
          >
            {new Date(date.date_time).toLocaleDateString()}{" "}
            {new Date(date.date_time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Button>
        ))}
      </div>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: contrastGreen,
          my: {
            xs: 1,
          },
          fontSize: {
            xs: "1rem",
            md: "1.2rem",
          },
          alignSelf: "flex-start",
        }}
      >
        Sectores
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
                  <b>Ver asientos</b>
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
                    row.seats.filter((seat) => seat.status === "Reservado")
                      .length,
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
                      <Button
                        variant="contained"
                        onClick={() => handleOpenModal(sector)}
                        disabled={!sector.numbered}
                      >
                        <VisibilityIcon />
                      </Button>
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: "lightgray", borderColor: "lightgray" }}
                    >
                      <div>
                        <IconButton
                          onClick={() =>
                            handleReservationChange(sector.name, -1)
                          }
                          disabled={sector.numbered}
                        >
                          <RemoveIcon />
                        </IconButton>
                        {nonNumberedReservations[sector.name] || 0}
                        <IconButton
                          onClick={() =>
                            handleReservationChange(sector.name, 1)
                          }
                          disabled={sector.numbered}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
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
          <Button
            variant="contained"
            onClick={handleConfirmReservations}
            sx={{ mt: 2, mb: 2 }}
          >
            Confirmar Reservas
          </Button>
        </Box>
      )}
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
    </Container>
  );
}
