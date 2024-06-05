import { Box, Button, Card, CardMedia, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import { DeleteOutlineOutlined, Edit, Key, ManageAccounts, StadiumOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import LocalDataBaseService from "../services/LocalDataBaseService";
import validator from "validator";
import { getLocationById } from "../services/LocationService"

export default function CardHorizontalWBorder({ imageUrl, artist, title, location, dates, sectors }) {
  const { contrastGreen } = customMuiTheme.colors;
  const [locationName, setLocationName] = useState("")

  useEffect(() => {
    const getLocationName = async (locationId) => {
      const locationObject = await getLocationById(location)
      setLocationName(locationObject.name)
    }
    getLocationName()
  }, []);

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
        mt={{ xs: 3, sm: 0 }}
        textAlign={{ xs: "center", sm: "left" }}
        sx={{
          width: "100%",
          alignItems: { xs: "center", sm: "start" },
          justifyContent: "space-between"
        }}>
        <Stack spacing={1}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            {artist}
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            {title}
          </Typography>
        </Stack>
        <Typography
          variant="h2"
        
          sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
        >
          {locationName}
        </Typography>
        <Stack textAlign="end">
          {dates.map(date => (
            <Typography
              variant="info"
              sx={{ fontSize: { md: "1.2rem" } }}
              key={date}>
              {date}
            </Typography>
          ))}
        </Stack>
        <Stack>
          {sectors.map(sector => (
            <Typography
              key={sector.name}
              variant="info"
              sx={{ fontSize: { md: "1.2rem" } }}
            >
              {sector.name}
            </Typography>
          ))}
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton
            title="Editar"
            sx={{ bgcolor: contrastGreen }}>
            <Edit />
          </IconButton>
          <IconButton
            title="Eliminar"
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
  const [firstTwoEvents, setFirstTwoEvents] = useState([]);
  const localDBService = new LocalDataBaseService();

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await localDBService.getAllEvents();
      setEvents(allEvents);
      setFirstTwoEvents([allEvents[5]]);
    };
    fetchEvents();
  }, []);

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
            alignItems="baseline">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "1.3rem", md: "1.7rem" } }}
            >
              Eventos que creaste
            </Typography>
            <StadiumOutlined sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" } }} />
          </Stack>
          <Stack spacing={3} px={1}>
            {firstTwoEvents.map((event) => (
              <CardHorizontalWBorder
                key={event.id}
                imageUrl={event.image}
                artist={event.artist}
                title={event.name}
                location={event.locationId}
                dates={event.dates}
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
            alignItems="baseline">
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
      </Stack>
    </Container>
  )
}