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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Logo from "../assets/img/logo.png";
import { useParams } from "react-router-dom";
import { customMuiTheme } from "../config/customMuiTheme";
import SeatMap from "../components/reservation-page-components/SeatMap";
import UserService from "../services/userService";
import { getEventById } from "../services/EventService";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  patchEventPlace,
  patchEventSeat,
} from "../services/ReservationService";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "380px",
  bgcolor: "#13273D",
  border: "1px solid #000",
  boxShadow: 24,
  p: 2,
};

export function ReservationPage() {
  const { contrastGreen } = customMuiTheme.colors;
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [apiMessage, setApiMessage] = useState("");
  const [seatMaps, setSeatMaps] = useState([]);
  const [selectedSeatMap, setSelectedSeatMap] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(false);
  const [loading, setLoading] = useState(false);
  const userService = new UserService();
  const [user, setUser] = useState({});
  const [selectedSectorId, setSelectedSectorId] = useState({});
  const [
    notNumeredReservationUnconfirmed,
    setNotNumeredReservationUnconfirmed,
  ] = useState([]);
  const [numeredReservationUnconfirmed, setNumeredReservationUnconfirmed] =
    useState([]);

  async function fetchEvent() {
    const event = await getEventById(eventId);
    setEvent(event);
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchEvent();
    };
    fetchData();
  }, [eventId]);

  const hasUnconfirmedReservations = () => {
    return (
      notNumeredReservationUnconfirmed.length > 0 ||
      numeredReservationUnconfirmed.length > 0
    );
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnconfirmedReservations()) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [notNumeredReservationUnconfirmed, numeredReservationUnconfirmed]);

  useEffect(() => {
    if (event) {
      const loggedUser = userService.getUserFromLocalStorage();
      setUser({ id: loggedUser.id, email: loggedUser.email });
      setSelectedDate(event.dates[selectedDateIndex].date_time);
      setSeatMaps(event.dates[selectedDateIndex].sectors);
      const initialReservations = {};
      event.dates[selectedDateIndex].sectors.forEach((sector) => {
        if (!sector.numbered) {
          initialReservations[sector.name] = 0;
        }
      });
    }
  }, [event, selectedDateIndex]);

  const handleSeatClick = (clickedSeat) => {
    if (
      clickedSeat.reservedBy == "vacio" ||
      clickedSeat.reservedBy == "pre-reserved"
    ) {
      const newNumeredReservationUnconfirmed = [
        ...numeredReservationUnconfirmed,
      ];
      const seatIndex = newNumeredReservationUnconfirmed.findIndex(
        (seat) => seat._id === clickedSeat._id
      );
      let updatedSeat;
      if (seatIndex > -1) {
        updatedSeat = { ...newNumeredReservationUnconfirmed[seatIndex] };
        newNumeredReservationUnconfirmed.splice(seatIndex, 1);
      } else {
        updatedSeat = {
          ...clickedSeat,
          eventId: event._id,
          date_time: selectedDate,
          reservedBy: user.id,
          sectorId: selectedSectorId,
        };
        delete updatedSeat.available;
        newNumeredReservationUnconfirmed.push(updatedSeat);
      }
      setNumeredReservationUnconfirmed(newNumeredReservationUnconfirmed);
      setSeatMaps((prevSeatMaps) => {
        const updatedSeatMaps = prevSeatMaps.map((seatMap) => {
          const updatedRows = seatMap.rows.map((row) =>
            row.map((seat) => {
              if (seat._id === clickedSeat._id) {
                return {
                  ...seat,
                  available: !seat.available,
                  reservedBy:
                    seat.reservedBy == "vacio" ? "pre-reserved" : "vacio",
                };
              }
              return seat;
            })
          );
          return {
            ...seatMap,
            rows: updatedRows,
          };
        });

        if (selectedSeatMap) {
          const updatedSelectedSeatMap = updatedSeatMaps.find(
            (map) => map._id === selectedSeatMap._id
          );
          setSelectedSeatMap(updatedSelectedSeatMap);
        }
        return updatedSeatMaps;
      });
    }
  };

  const handleNonNumberedReservation = (sectorId, operation) => {
    if (operation === "add") {
      const newReservedUnconfirmed = {
        eventId: event._id,
        sectorId: sectorId,
        reservedBy: user.id,
        date_time: selectedDate,
      };
      const newNotNumeredReservationUnconfirmed = [
        ...notNumeredReservationUnconfirmed,
      ];
      newNotNumeredReservationUnconfirmed.push(newReservedUnconfirmed);
      setNotNumeredReservationUnconfirmed(newNotNumeredReservationUnconfirmed);
    } else if (operation === "remove") {
      const newNotNumeredReservationUnconfirmed = [
        ...notNumeredReservationUnconfirmed,
      ];
      if (newNotNumeredReservationUnconfirmed.length > 0) {
        newNotNumeredReservationUnconfirmed.pop();
      }
      setNotNumeredReservationUnconfirmed(newNotNumeredReservationUnconfirmed);
    }
  };

  const handleConfirmReservations = async () => {
    if (!hasUnconfirmedReservations()) {
      setApiMessage("No tiene reservas para confirmar");
      handleOpen();
      return;
    }
    setLoading(true);
    try {
      let reservationsConfirmed = false;
      if (notNumeredReservationUnconfirmed.length > 0) {
        for (const reservation of notNumeredReservationUnconfirmed) {
          const response = await patchEventPlace(reservation);
          if (response.message == "Asiento creado correctamente") {
            reservationsConfirmed = true;
            await fetchEvent();
          }
        }
        setNotNumeredReservationUnconfirmed([]);
      }
      if (numeredReservationUnconfirmed.length > 0) {
        for (const reservation of numeredReservationUnconfirmed) {
          const response = await patchEventSeat(reservation);
          if (response.message == "Reserva realizada correctamente") {
            reservationsConfirmed = true;
            await fetchEvent();
          }
        }
        setNumeredReservationUnconfirmed([]);
      }

      if (reservationsConfirmed) {
        setApiMessage("Tickets reservados exitosamente");
        handleOpen();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (seatMap) => {
    setSelectedSectorId(seatMap._id);
    setSelectedSeatMap(seatMap);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSeatMap(null);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleDateChange = (index) => {
    setSelectedDate(event.dates[index].date_time);
    setLoading(true);
    setTimeout(() => {
      setSelectedDateIndex(index);
      setLoading(false);
    }, 1000);
  };

  const countReservationsBySectorId = (reservations, sectorId) => {
    return reservations.filter(
      (reservation) => reservation.sectorId === sectorId
    ).length;
  };

  if (!event) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
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
                      row.filter((seat) => seat.available === false).length,
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
                                  sector._id,
                                  "remove"
                                )
                              }
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography>
                              {countReservationsBySectorId(
                                notNumeredReservationUnconfirmed,
                                sector._id
                              )}
                            </Typography>
                            <IconButton
                              color="primary"
                              onClick={() =>
                                handleNonNumberedReservation(sector._id, "add")
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
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleConfirmReservations}
            sx={{
              mt: 2,
              mb: 6,
              backgroundColor: "#01BB89",
              border: "1px solid #01BB89",
              color: "white",
            }}
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
            // maxWidth: "90%",
            width: "auto",
            flexWrap: "wrap",
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={Logo} alt="Logo" style={{ width: 100, marginBottom: 5 }} />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            ¡{apiMessage}!
          </Typography>
          <Button onClick={handleClose} variant="contained" sx={{ mt: 3 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
