import { Box, Card, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import { StadiumOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import LocalDataBaseService from "../services/LocalDataBaseService";

export default function CardHorizontalWBorder({ imageUrl, artist, title, location, dates, sectors }) {

  return (
    <Card
      className="border-grad-right"
      sx={{
        background: "transparent",
        display: "flex",
        p: 2,
        columnGap: 3
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: "30%", objectFit: "contain" }}
        image={imageUrl}
        alt="Event image"
      />
      <Box sx={{
        display: "flex",
        width: "100%",
        alignItems: "start",
        justifyContent: "space-between"
      }}>
        <Stack
          spacing={2}
          sx={{
            backgroundColor: "green",
          }}>
          <Box>
            <Typography component="div" variant="h2">
              {artist}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {title}
            </Typography>
          </Box>
          <Typography variant="h2">
            {location}
          </Typography>
          <Box>
            {dates.map(date => (
              <Typography key={date}>
                {date}
              </Typography>
            ))}
          </Box>
        </Stack>
        <Stack spacing={2} sx={{ backgroundColor: "green" }}>
          <Typography variant="h2">Sectores</Typography>
          <Box>
            {sectors.map(sector => (
              <Typography key={sector.name}>
                {sector.name}
              </Typography>
            ))}
          </Box>
        </Stack>
        <Stack sx={{ backgroundColor: "green" }}>editar</Stack>
      </Box>
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
      setFirstTwoEvents([allEvents[3], allEvents[4]]);
    };
    fetchEvents();
  }, []);

  return (
    <Container maxWidth="md">
      <Stack spacing={4} mt={4}>
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
          alignItems="center">
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: "1rem", md: "1.5rem" } }}
          >
            Eventos que creaste
          </Typography>
          <StadiumOutlined sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }} />
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