import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import {
  ConfirmationNumberOutlined,
  DeleteOutlineOutlined,
  Edit,
  FirstPageOutlined,
  Key,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPageOutlined,
  Logout,
  ManageAccounts,
  StadiumOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import validator from "validator";
import { getLocationById } from "../services/LocationService";
import { Link, useNavigate } from "react-router-dom";
import InputSearch from "../components/InputSearch";
import { deleteEvent, getAllEvents } from "../services/EventService";
import UserService from "../services/userService";
import SnackBar from "../components/SnackBar";
import LoadingIndicator from "../components/LoadingIndicator";
import { getReservationsByUserId } from "../services/ReservationService";
import { useTheme } from "@emotion/react";
import NotFound from "../components/NotFound";

function getFormatedDate(date) {
  const thisDate = new Date(date);
  const day = thisDate.getDate();
  const month = thisDate.toLocaleString("es-AR", { month: "long" });
  const year = thisDate.getFullYear();
  const hour = ("0" + thisDate.getHours()).slice(-2);
  const minutes = ("0" + thisDate.getMinutes()).slice(-2);
  const time = "" + hour + ":" + minutes + " hs.";
  return "" + day + " de " + month + " de " + year + ", " + time;
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? (
          <LastPageOutlined />
        ) : (
          <FirstPageOutlined />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? (
          <FirstPageOutlined />
        ) : (
          <LastPageOutlined />
        )}
      </IconButton>
    </Box>
  );
}

export default function CardHorizontalWBorder({
  fetchEvents,
  setSnackbarMessage,
  setSnackbarOpen,
  id,
  artist,
  title,
  location,
  dates,
  sectors,
}) {
  const { contrastGreen } = customMuiTheme.colors;
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLocationName = async (locationId) => {
      const locationObject = await getLocationById(location);
      setLocationName(locationObject.name);
    };
    getLocationName();
  }, [location]);

  const handleDelete = async (eventId) => {
    const confirm = window.confirm(
      "Estás a punto de eliminar este evento. ¿Estás segur@?"
    );
    if (confirm) {
      try {
        setLoading(true);
        await deleteEvent(eventId);
        fetchEvents();
        setSnackbarMessage("Evento eliminado");
      } catch (error) {
        console.log(error);
        setSnackbarMessage("Error al eliminar evento");
      } finally {
        setSnackbarOpen(true);
        setLoading(false);
      }
    }
  };

  return (
    <Card
      className="border-grad-right"
      sx={{
        background: "transparent",
        display: { sm: "flex" },
        p: 2,
      }}
    >
      <Stack
        direction={{ sm: "row" }}
        spacing={{ xs: 2 }}
        textAlign={{ xs: "center", sm: "left" }}
        sx={{
          width: "100%",
          alignItems: { xs: "center", sm: "start" },
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={1} width={{ xs: "100%", sm: "25%" }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
          >
            {title}
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
          >
            {artist}
          </Typography>
        </Stack>
        <Typography
          variant="h2"
          width={{ xs: "100%", sm: "25%" }}
          sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
        >
          {locationName}
        </Typography>
        <Stack
          spacing={1}
          textAlign={{ xs: "center", sm: "end" }}
          width={{ xs: "100%", sm: "20%" }}
        >
          {dates.map((date) => (
            <Typography
              variant="info"
              sx={{ fontSize: { md: "1rem" } }}
              key={date}
            >
              {getFormatedDate(date)}
            </Typography>
          ))}
        </Stack>
        <Stack width={{ xs: "100%", sm: "15%" }} spacing={1}>
          {sectors.map((sector) => (
            <Typography
              key={sector.name}
              variant="info"
              sx={{ fontSize: { md: "1rem" } }}
            >
              {sector.name}
            </Typography>
          ))}
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          width={{ xs: "100%", sm: "15%" }}
          justifyContent="center"
        >
          <IconButton
            title="Editar"
            component={Link}
            to={`/create_event/${id}`}
            sx={{
              bgcolor: contrastGreen,
              "&:hover": { color: "white" },
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            title="Eliminar"
            onClick={() => handleDelete(id)}
            sx={{ bgcolor: "crimson" }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "whitesmoke" }} />
            ) : (
              <DeleteOutlineOutlined />
            )}
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  );
}

export function TicketsTable({ userId }) {
  console.log(userId);
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reservations.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchReservations = async () => {
    //const reservationsById = await getReservationsByUserId(1717478725800);
    const reservationsById = await getReservationsByUserId(userId);
    setReservations(reservationsById);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <Stack px={2}>
      {isLoading && <CircularProgress sx={{ alignSelf: "center" }} />}
      {!isLoading && reservations?.length > 0 && (
        <>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ height: 105 }}>
                  <TableCell sx={{ color: "whitesmoke" }} align="center">
                    Afiche
                  </TableCell>
                  <TableCell sx={{ color: "whitesmoke" }} align="center">
                    Evento
                  </TableCell>
                  <TableCell sx={{ color: "whitesmoke" }} align="left">
                    Lugar y fecha
                  </TableCell>
                  <TableCell sx={{ color: "whitesmoke" }} align="right">
                    Sector
                  </TableCell>
                  <TableCell sx={{ color: "whitesmoke" }} align="center">
                    Asiento/Cantidad
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? reservations.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : reservations
                ).map((r) => (
                  <TableRow
                    key={r.idTicket}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <img src={r.image} style={{ maxHeight: 100 }} />
                    </TableCell>
                    <TableCell align="center">{r.eventName}</TableCell>
                    <TableCell align="left">
                      <p>{r.locationName}</p>
                      {getFormatedDate(r.date_time)}
                    </TableCell>
                    <TableCell align="right">{r.sectorName}</TableCell>
                    <TableCell align="center">
                      {r.numbered ? r.displayId : r.cantidad}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 117 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[3, 6, 9, { label: "All", value: -1 }]}
            component="div"
            count={reservations.length}
            rowsPerPage={rowsPerPage}
            page={page}
            slotProps={{
              select: {
                inputProps: {
                  "aria-label": "rows per page",
                },
              },
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </>
      )}
      {!isLoading && (!reservations || reservations?.length == 0) && (
        <Typography textAlign="center">
          Parece que no reservaste nada aún...
        </Typography>
      )}
    </Stack>
  );
}

export function MyAccountPage() {
  const { contrastGreen } = customMuiTheme.colors;
  const [events, setEvents] = useState([]);
  const [shownEvents, setShownEvents] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const userService = new UserService();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const allEvents = await getAllEvents();
    setEvents(allEvents);
    const totalEvents = allEvents.length;
    totalEvents > 1
      ? setShownEvents([allEvents[totalEvents - 1], allEvents[totalEvents - 2]])
      : setShownEvents(allEvents);
    setIsLoading(false);
  };

  const [emailValue, setEmailValue] = useState("fetchedEmail@email.com");
  const isNotAnEmail = !(
    validator.isEmpty(emailValue) || validator.isEmail(emailValue)
  );
  const getEmailHelperText = isNotAnEmail ? "Escribe un email válido" : "";
  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const [nameValue, setNameValue] = useState("Fetched Name");
  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const [phoneValue, setPhoneValue] = useState("11-3333-3333");
  const isNotAPhone = !(
    validator.isEmpty(phoneValue) || validator.isMobilePhone(phoneValue)
  );
  const getPhoneHelperText = isNotAPhone ? "Escribe un teléfono válido" : "";
  const handlePhoneChange = (e) => {
    setPhoneValue(e.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const handleShowCurrentPassword = () =>
    setShowCurrentPassword((show) => !show);
  const [currentPassValue, setCurrentPassValue] = useState("");
  const currentPass = "FetchedPass";
  const matchCurrentPass = currentPassValue === currentPass;
  const currentPassError = !(
    validator.isEmpty(currentPassValue) || matchCurrentPass
  );
  const getCurrentPassHelperText = currentPassError
    ? "La contraseña no coincide con la almacenada"
    : "";
  const handleCurrentPassChange = (e) => setCurrentPassValue(e.target.value);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleShowNewPassword = () => setShowNewPassword((show) => !show);
  const [newPassValue, setNewPassValue] = useState("");
  const isStrongPass = validator.isStrongPassword(newPassValue);
  const newPassError = !(validator.isEmpty(newPassValue) || isStrongPass);
  const getNewPassHelperText = newPassError ? (
    <>
      La contraseña debe tener:
      <br />
      &ensp;• Al menos 8 caracteres.
      <br />
      &ensp;• Al menos 1 minúscula.
      <br />
      &ensp;• Al menos 1 mayúscula.
      <br />
      &ensp;• Al menos 1 número.
      <br />
      &ensp;• Al menos 1 símbolo.
    </>
  ) : (
    ""
  );
  function handleNewPassChange(e) {
    setNewPassValue(e.target.value);
  }

  const handleSearch = (searchValue) => {
    const totalEvents = events.length;
    const previousShown = [events[totalEvents - 1], events[totalEvents - 2]];
    const lowercasedFilter = searchValue.toLowerCase();
    const filteredData = events.filter(
      (item) =>
        item.name.toLowerCase().includes(lowercasedFilter) ||
        item.artist.toLowerCase().includes(lowercasedFilter)
    );
    !validator.isEmpty(searchValue)
      ? setShownEvents(filteredData)
      : setShownEvents(previousShown);
  };

  const handleLogout = () => {
    userService.removeUserFromLocalStorage();
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const loggedUser = userService.getUserFromLocalStorage();

  return loggedUser ? (
    <Container maxWidth="md">
      <SnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        severity="success"
        handleClose={handleSnackbarClose}
      />
      <Stack spacing={10} my={4}>
        {/* Title and subtitle */}
        <Stack>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
            }}
          >
            ¡Hola!
          </Typography>
          <Typography sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}>
            Acá podés ver{" "}
            {loggedUser.role === "admin" ? "los eventos que creaste," : ""} tus
            reservas, tus datos, y cambiar tu contraseña.
          </Typography>
        </Stack>
        {
          /* Event cards */
          loggedUser.role === "admin" && (
            <Stack spacing={5}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: "1.3rem", md: "1.7rem" } }}
                >
                  Últimos eventos creados
                </Typography>
                <StadiumOutlined
                  sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" } }}
                />
              </Stack>
              <Stack spacing={3} px={1}>
                <Stack alignItems={{ xs: "center", sm: "end" }} pb={1}>
                  <InputSearch
                    options={events.map((event) => event.name)}
                    onSearch={handleSearch}
                  />
                </Stack>
                {!isLoading ? (
                  shownEvents.map((event) => (
                    <CardHorizontalWBorder
                      key={event._id}
                      fetchEvents={fetchEvents}
                      setSnackbarMessage={setSnackbarMessage}
                      setSnackbarOpen={setSnackbarOpen}
                      id={event._id}
                      artist={event.artist}
                      title={event.name}
                      location={event.location_id}
                      dates={event.dates.map((date) => date.date_time)}
                      sectors={event.dates[0].sectors}
                    />
                  ))
                ) : (
                  <LoadingIndicator />
                )}
              </Stack>
            </Stack>
          )
        }
        {/* Reserved tickets */}
        <Stack spacing={5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "1.3rem", md: "1.7rem" } }}
            >
              Tickets reservados
            </Typography>
            <ConfirmationNumberOutlined
              sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" } }}
            />
          </Stack>
          <TicketsTable userId={loggedUser.id} />
        </Stack>
        {/* Personal data */}
        <Stack spacing={5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "1.3rem", md: "1.7rem" } }}
            >
              Datos personales
            </Typography>
            <ManageAccounts sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" } }} />
          </Stack>
          {/* Data form */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            px={1}
            spacing={{ xs: 3, sm: 0 }}
          >
            <Stack spacing={3} sx={{ width: { sm: "275px" } }}>
              <TextField
                label="Email"
                variant="outlined"
                value={emailValue}
                helperText={getEmailHelperText}
                onChange={handleEmailChange}
                error={isNotAnEmail}
              />
              <TextField
                label="Nombre"
                variant="outlined"
                value={nameValue}
                helperText={
                  validator.isEmpty(nameValue) ? "Introduce tu nombre" : ""
                }
                onChange={handleNameChange}
                error={validator.isEmpty(nameValue)}
              />
              <TextField
                label="Teléfono"
                variant="outlined"
                value={phoneValue}
                helperText={getPhoneHelperText}
                onChange={handlePhoneChange}
                error={isNotAPhone}
              />
            </Stack>
            <Button
              size="large"
              sx={{ color: "white", bgcolor: contrastGreen, alignSelf: "end" }}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "0.8rem", md: "1.2rem" } }}
              >
                Actualizar
              </Typography>
            </Button>
          </Stack>
        </Stack>
        {/* Password change */}
        <Stack spacing={5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "1.3rem", md: "1.7rem" } }}
            >
              Cambiar contraseña
            </Typography>
            <Key sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" } }} />
          </Stack>
          {/* Passes form */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            px={1}
            spacing={{ xs: 3, sm: 0 }}
          >
            <Stack spacing={3}>
              <TextField
                label="Contraseña actual"
                value={currentPassValue}
                helperText={getCurrentPassHelperText}
                onChange={handleCurrentPassChange}
                error={currentPassError}
                type={showCurrentPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowCurrentPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Contraseña nueva"
                value={newPassValue}
                helperText={getNewPassHelperText}
                onChange={handleNewPassChange}
                error={newPassError}
                type={showNewPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Button
              size="large"
              sx={{ color: "white", bgcolor: contrastGreen, alignSelf: "end" }}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "0.8rem", md: "1.2rem" } }}
              >
                Actualizar
              </Typography>
            </Button>
          </Stack>
        </Stack>
        <Stack spacing={1} alignItems="center">
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1.3rem", md: "1.7rem" } }}
          >
            Cerrar sesión
          </Typography>
          <IconButton
            component={Link}
            to="/"
            onClick={() => handleLogout()}
            title="Cerrar sesión"
            sx={{
              "&:hover": { color: "white" },
            }}
          >
            <Logout fontSize="large" />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  ) : (
    <NotFound />
  );
}
