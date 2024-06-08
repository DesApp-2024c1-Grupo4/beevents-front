import { Button, Card, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import { DeleteOutlineOutlined, Edit, Key, Logout, ManageAccounts, StadiumOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import validator from "validator";
import { getLocationById } from "../services/LocationService"
import { Link } from "react-router-dom";
import InputSearch from "../components/InputSearch";
import { deleteEvent, getAllEvents } from "../services/EventService";

export default function CardHorizontalWBorder({ fetchEvents, id, artist, title, location, dates, sectors }) {
  const { contrastGreen } = customMuiTheme.colors;
  const [locationName, setLocationName] = useState("")

  useEffect(() => {
    const getLocationName = async (locationId) => {
      const locationObject = await getLocationById(location)
      setLocationName(locationObject.name)
    }
    getLocationName()
  }, [location]);

  const getFormatedDate = (date) => {
    const thisDate = new Date(date);
    const day = thisDate.getDate()
    const month = thisDate.toLocaleString("es-AR", { month: "long" });
    const year = thisDate.getFullYear()
    const hour = ("0" + thisDate.getHours()).slice(-2);
    const minutes = ("0" + thisDate.getMinutes()).slice(-2);
    const time = "" + hour + ":" + minutes + " hs."
    return ("" + day + " de " + month + " de " + year + ", " + time)
  };

  const handleDelete = async (eventId) => {
    const confirm = window.confirm("Estás a punto de eliminar este evento. ¿Estás segur@?");
    if (confirm) {
      await deleteEvent(eventId);
      fetchEvents();
    }
  }

  return (
    <Card
      className="border-grad-right"
      sx={{
        background: "transparent",
        display: { sm: "flex" },
        p: 2
      }}
    >
      <Stack
        direction={{ sm: "row" }}
        spacing={{ xs: 2 }}
        textAlign={{ xs: "center", sm: "left" }}
        sx={{
          width: "100%",
          alignItems: { xs: "center", sm: "start" },
          justifyContent: "space-between"
        }}>
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
          {dates.map(date => (
            <Typography
              variant="info"
              sx={{ fontSize: { md: "1rem" } }}
              key={date}>
              {getFormatedDate(date)}
            </Typography>
          ))}
        </Stack>
        <Stack
          width={{ xs: "100%", sm: "15%" }}
          spacing={1}
        >
          {sectors.map(sector => (
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
            sx={{ bgcolor: contrastGreen }}>
            <Edit />
          </IconButton>
          <IconButton
            title="Eliminar"
            onClick={() => handleDelete(id)}
            sx={{ bgcolor: "crimson" }}>
            <DeleteOutlineOutlined />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  )
}

export function MyAccountPage() {
  const { contrastGreen } = customMuiTheme.colors;
  const [events, setEvents] = useState([]);
  const [shownEvents, setShownEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const allEvents = await getAllEvents();
    setEvents(allEvents);
    const totalEvents = allEvents.length
    totalEvents > 1
      ? setShownEvents([allEvents[totalEvents - 1], allEvents[totalEvents - 2]])
      : setShownEvents(allEvents)
  };

  const [emailValue, setEmailValue] = useState("fetchedEmail@email.com");
  const isNotAnEmail = !(validator.isEmpty(emailValue) || validator.isEmail(emailValue))
  const getEmailHelperText = isNotAnEmail ? "Escribe un email válido" : "";
  function handleEmailChange(e) {
    setEmailValue(e.target.value);
  }

  const [nameValue, setNameValue] = useState("Fetched Name");
  const handleNameChange = (e) => { setNameValue(e.target.value) }

  const [phoneValue, setPhoneValue] = useState("11-3333-3333");
  const isNotAPhone = !(validator.isEmpty(phoneValue) || validator.isMobilePhone(phoneValue))
  const getPhoneHelperText = isNotAPhone ? "Escribe un teléfono válido" : "";
  function handlePhoneChange(e) {
    setPhoneValue(e.target.value);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const handleShowCurrentPassword = () => setShowCurrentPassword((show) => !show);
  const [currentPassValue, setCurrentPassValue] = useState("");
  const currentPass = "FetchedPass"
  const matchCurrentPass = currentPassValue === currentPass
  const currentPassError = !(validator.isEmpty(currentPassValue) || matchCurrentPass)
  const getCurrentPassHelperText = currentPassError ? "La contraseña no coincide con la almacenada" : ""
  const handleCurrentPassChange = (e) => setCurrentPassValue(e.target.value)

  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleShowNewPassword = () => setShowNewPassword((show) => !show);
  const [newPassValue, setNewPassValue] = useState("");
  const isStrongPass = validator.isStrongPassword(newPassValue)
  const newPassError = !(validator.isEmpty(newPassValue) || isStrongPass)
  const getNewPassHelperText = newPassError ?
    <>
      La contraseña debe tener:
      <br />&ensp;• Al menos 8 caracteres.
      <br />&ensp;• Al menos 1 minúscula.
      <br />&ensp;• Al menos 1 mayúscula.
      <br />&ensp;• Al menos 1 número.
      <br />&ensp;• Al menos 1 símbolo.
    </>
    : "";
  function handleNewPassChange(e) { setNewPassValue(e.target.value); }

  const handleSearch = (searchValue) => {
    const totalEvents = events.length
    const previousShown = [events[totalEvents - 1], events[totalEvents - 2]]
    const lowercasedFilter = searchValue.toLowerCase();
    const filteredData = events.filter((item) =>
      item.name.toLowerCase().includes(lowercasedFilter)
      || item.artist.toLowerCase().includes(lowercasedFilter)
    );
    !validator.isEmpty(searchValue) ? setShownEvents(filteredData) : setShownEvents(previousShown)
  };

  return (
    <Container maxWidth="md">
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
            ¡Hola Cristian!
          </Typography>
          <Typography sx={{ fontSize: { xs: "0.8rem", md: "1rem" } }}>
            Acá podés ver tus eventos, tus datos, y cambiar tu contraseña.
          </Typography>
        </Stack>
        {/* Event cards */}
        <Stack spacing={5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "1.3rem", md: "1.7rem" } }}
            >
              Últimos eventos creados
            </Typography>
            <StadiumOutlined sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" } }} />
          </Stack>
          <Stack spacing={3} px={1}>
            <Stack alignItems={{ xs: "center", sm: "end" }} pb={1}>
              <InputSearch
                options={events.map((event) => event.name)}
                onSearch={handleSearch}
              />
            </Stack>
            {shownEvents.map((event) => (
              <CardHorizontalWBorder
                key={event._id}
                fetchEvents={fetchEvents}
                id={event._id}
                artist={event.artist}
                title={event.name}
                location={event.location_id}
                dates={event.date_times}
                sectors={event.sectors}
              />
            ))}
          </Stack>
        </Stack>
        {/* Personal data */}
        <Stack spacing={5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center">
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
                helperText={validator.isEmpty(nameValue) ? "Introduce tu nombre" : ""}
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
            alignItems="center">
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
            <Stack spacing={3} >
              <TextField
                label='Contraseña actual'
                value={currentPassValue}
                helperText={getCurrentPassHelperText}
                onChange={handleCurrentPassChange}
                error={currentPassError}
                type={showCurrentPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowCurrentPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label='Contraseña nueva'
                value={newPassValue}
                helperText={getNewPassHelperText}
                onChange={handleNewPassChange}
                error={newPassError}
                type={showNewPassword ? 'text' : 'password'}
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
            title="Cerrar sesión"
            sx={{
              "&:hover": { color: "white" }
            }}
          >
            <Logout fontSize="large" />
          </IconButton>
        </Stack>
      </Stack>
    </Container>
  )
}