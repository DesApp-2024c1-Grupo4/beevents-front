import { Box, Card, CardMedia, Container, IconButton, Stack, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import { Edit, StadiumOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import LocalDataBaseService from "../services/LocalDataBaseService";

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

  return (
    <Container maxWidth="md">
      <Stack spacing={4} my={4}>
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
        <Stack spacing={2} px={1}>
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
    </Container>
  )
}