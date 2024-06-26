import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material/";
import { useParams } from "react-router-dom";
import { customMuiTheme } from "../config/customMuiTheme";
import SeatMap from "../components/reservation-page-components/SeatMap";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserService from "../services/userService";
import { Password } from "@mui/icons-material";

export function ReservationPage() {
  const { contrastGreen } = customMuiTheme.colors;
  //   const { eventId } = useParams();
  const [seatMaps, setSeatMaps] = useState([]);
  const [selectedSeatMap, setSelectedSeatMap] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const userService = new UserService();
  const [user, setUser] = useState({});

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
    ],
    __v: 0,
  };

  useEffect(() => {
    const loggedUser = userService.getUserFromLocalStorage();
    setUser({ id: loggedUser.id, email: loggedUser.email });
    const numberedSeatMaps = event.dates[0].sectors;
    setSeatMaps(numberedSeatMaps);
  }, []);

  const handleSeatClick = (clickedSeat) => {
    setSeatMaps((prevSeatMaps) => {
      const updatedSeatMaps = prevSeatMaps.map((seatMap) => ({
        ...seatMap,
        rows: seatMap.rows.map((row) => ({
          ...row,
          seats: row.seats.map((seat) =>
            seat.id === clickedSeat.id
              ? {
                  ...seat,
                  status:
                    seat.status === "Reservado" ? "Disponible" : "Reservado",
                  reservedBy: seat.status === "Reservado" ? null : user,
                }
              : seat
          ),
        })),
      }));

      if (selectedSeatMap) {
        const updatedSelectedSeatMap = updatedSeatMaps.find(
          (map) => map.name === selectedSeatMap.name
        );
        setSelectedSeatMap(updatedSelectedSeatMap);
      }

      return updatedSeatMaps;
    });
  };

  const handleOpenModal = (seatMap) => {
    setSelectedSeatMap(seatMap);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSeatMap(null);
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
              xs: 3,
              md: 6,
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
              xs: 3,
              md: 6,
            },
            fontSize: {
              xs: "1.5rem",
              md: "2rem",
            },
            alignSelf: "flex-start",
          }}
        >
          Nombre: {event.name}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: contrastGreen,
            my: {
              xs: 3,
              md: 6,
            },
            fontSize: {
              xs: "1.5rem",
              md: "2rem",
            },
            alignSelf: "flex-start",
          }}
        >
          Artista: {event.artist}
        </Typography>
      </>
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
                <b>Capacidad máx.</b>
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
                align="right"
              >
                <b>Ver asientos</b>
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
                    align="right"
                    sx={{ color: "lightgray", borderColor: "lightgray" }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleOpenModal(sector)}
                      disabled={!sector.numbered} // Deshabilitar si no es numerado
                    >
                      <VisibilityIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
