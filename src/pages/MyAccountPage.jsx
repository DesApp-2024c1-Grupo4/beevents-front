import { Box, Card, CardContent, CardMedia, Container, Grid, Stack, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import { StadiumOutlined } from "@mui/icons-material";
import MediaCard from "../components/Card";
import { useEffect, useState } from "react";
import LocalDataBaseService from "../services/LocalDataBaseService";

export default function CardHorizontalWBorder({ imageUrl, artist, title, dates, sectors }) {

  return (
    <Card className="border-grad-right" sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: "30%", height: "200px" }}
        image={imageUrl}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}


export function MyAccountPage() {
  const { contrastGreen } = customMuiTheme.colors;
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const localDBService = new LocalDataBaseService();

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await localDBService.getAllEvents();
      setEvents(allEvents);
      setFilteredEvents(allEvents);
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
        <Stack spacing={2}>
          {filteredEvents.map((event) => (
            <CardHorizontalWBorder
              key={event.id}
              imageUrl={event.image}
              artist={event.artist}
              title={event.name}
              dates={event.dates}
              sectors={event.sectors}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}