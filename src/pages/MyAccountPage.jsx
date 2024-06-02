import { Box, Button, Card, CardMedia, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import { Edit, Key, ManageAccounts, StadiumOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import LocalDataBaseService from "../services/LocalDataBaseService";
import validator from "validator";

export default function CardHorizontalWBorder({ imageUrl, artist, title, location, dates, sectors }) {
  const { contrastGreen } = customMuiTheme.colors;

  return (
    <Card
      className="border-grad-right"
      sx={{
        background: "transparent",
        display: { sm: "flex" },
        p: 2,
        columnGap: 3,
        minHeight: "200px"
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: { sm: "500px" },
          maxHeight: { sm: "196px" },
          objectFit: "fill",
          borderRadius: "5px"
        }}
        image={imageUrl}
        alt="Event image"
      />
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
        <Stack spacing={2} >
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
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            {location}
          </Typography>
          <Box>
            {dates.map(date => (
              <Typography
                variant="info"
                sx={{ fontSize: { md: "1.2rem" } }}
                key={date}>
                {date}
              </Typography>
            ))}
          </Box>
        </Stack>
        <Stack spacing={2} >
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            Sectores
          </Typography>
          <Box>
            {sectors.map(sector => (
              <Typography
                key={sector.name}
                variant="info"
                sx={{ fontSize: { md: "1.2rem" } }}
              >
                {sector.name}
              </Typography>
            ))}
          </Box>
        </Stack>
        <IconButton
          title="Editar"
          sx={{ alignSelf: "end", bgcolor: contrastGreen }}>
          <Edit />
        </IconButton>
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
      setFirstTwoEvents([allEvents[0], allEvents[1]]);
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
      <Stack spacing={5} my={4}>
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
        <Stack spacing={3}>
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
                location={event.location.name}
                dates={event.dates}
                sectors={event.sectors}
              />
            ))}
          </Stack>
        </Stack>
        {/* Personal data */}
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline">
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "1.3rem", md: "1.7rem" } }}
            >
              Mis datos
            </Typography>
            <ManageAccounts sx={{ fontSize: { xs: "1.8rem", md: "2.3rem" } }} />
          </Stack>
          {/* Data form */}
          <Stack spacing={3}>
            {/* Data form */}
            <Stack 
              direction={{xs: "column", sm: "row"}} 
              justifyContent="space-between" 
              px={3}
              spacing={{xs: 3, sm: 0}}
              >
              <Stack spacing={3} >
                <TextField
                  label="Email"
                  variant="outlined"
                  value={emailValue}
                  helperText={getEmailHelperText}
                  onChange={handleEmailChange}
                  error={isNotAnEmail}
                  sx={{width: {sm: "270px"}}}
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
                  Actualizar datos
                </Typography>
              </Button>
            </Stack>
          </Stack>
        </Stack>
        {/* Password change */}
        <Stack spacing={3}>
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
              direction={{xs: "column", sm: "row"}} 
              justifyContent="space-between" 
              px={3}
              spacing={{xs: 3, sm: 0}}
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
                Actualizar datos
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}