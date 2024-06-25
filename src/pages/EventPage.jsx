import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material/";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/EventService";
import { customMuiTheme } from "../config/customMuiTheme";
import { getLocationById } from "../services/LocationService";
import LoadingIndicator from "../components/LoadingIndicator"

export function EventPage() {
  const { contrastGreen, oceanicBlue } = customMuiTheme.colors;
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [location, setLocation] = useState("")

  useEffect(() => {
    const fetchEvent = async () => {
      const fetchedEvent = await getEventById(eventId);
      setEvent(fetchedEvent);
      const locationObject = await getLocationById(fetchedEvent.location_id)
      setLocation(locationObject)
    };
    fetchEvent();
  }, []);

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

  return (
    <Container maxWidth="md">
      {
        !(event && location)
          ? <Box my={10}><LoadingIndicator /></Box>
          : <Stack
            my={5}
            spacing={5}
          >
            {/* Artist and name */}
            <Stack 
            direction="row"
            justifyContent="space-between"
            >
              <Stack>
                <Typography
                  variant="h2"
                  gutterBottom
                  textAlign={{ xs: "center", sm: "left" }}
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    color: contrastGreen
                  }}
                >
                  {event.artist}
                </Typography>
                <Typography
                  variant="h2"
                  gutterBottom
                  textAlign={{ xs: "center", sm: "left" }}
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2rem" },
                    color: contrastGreen
                  }}
                >
                  {event.name}
                </Typography>
              </Stack>
              <Button
                size="large"
                sx={{
                  backgroundColor: contrastGreen,
                  color: "whitesmoke",
                  alignSelf: "start",
                  px: 2
                }}
              >
                <Typography
                  variant="h2"
                >
                  Reservar entradas
                </Typography>
              </Button>
            </Stack>
            {/* Image and (date and sectors) */}
            <Stack
              direction="row"
              spacing={5}
              justifyContent="space-between"
              px={2}
            >
              <Box
                boxShadow="
              -0.5rem -0.5rem 0.5rem black, 
               0.5rem 0.5rem 0.5rem black,
               0.5rem -0.5rem 0.5rem black,
               -0.5rem 0.5rem 0.5rem black
            "
                alignSelf="center"
                width="50%"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  style={{
                    width: "100%",
                    borderRadius: "5px"
                  }}
                />
              </Box>
              {/* Date and sectors */}
              <Stack>
                {/* Dates */}
                <Stack
                  alignItems={{ xs: "center", sm: "start" }}
                  spacing={2}
                >
                  <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" }
                    }}
                  >
                    Funciones
                  </Typography>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    px={2}
                  >
                    {event.date_times.map(date =>
                      <Typography
                        key={date}
                        className="border-grad"
                        backgroundColor={oceanicBlue}
                        borderRadius={2}
                        color="inherit"
                        textAlign="center"
                        variant="info"
                        sx={{ fontSize: { md: "1rem" } }}
                      >
                        {getFormatedDate(date)}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                {/* Sectors */}
                <Stack
                  alignItems={{ xs: "center", sm: "start" }}
                  spacing={2}
                >
                  <Typography
                    variant="h2"
                    gutterBottom
                    sx={{
                      fontSize: { xs: "1.5rem", md: "2rem" }
                    }}
                  >
                    Sectores
                  </Typography>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    px={2}
                  >
                    {event.sectors.map(sector =>
                      <Typography
                        key={sector._id}
                        className="border-grad"
                        backgroundColor={oceanicBlue}
                        borderRadius={2}
                        color="inherit"
                        textAlign="center"
                        variant="info"
                        sx={{ fontSize: { md: "1rem" } }}
                      >
                        {sector.name}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            {/* About and location */}
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={5}
            >
              {/* About */}
              <Stack
                textAlign={{ xs: "center", sm: "left" }}
                spacing={2}
                width="50%"
              >
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1.5rem", md: "2rem" }
                  }}
                >
                  Acerca de este evento
                </Typography>
                <Typography
                  variant="info"
                  sx={{ fontSize: { md: "1rem" } }}
                  px={2}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                  anim id est laborum.
                </Typography>
              </Stack>
              {/* Location */}
              <Stack>
                <Typography
                  variant="h2"
                  gutterBottom
                  textAlign={{ xs: "center", sm: "right" }}
                  sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                >
                  {location.name}
                </Typography>
                <Typography
                  variant="h2"
                  gutterBottom
                  textAlign={{ xs: "center", sm: "right" }}
                  sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                >
                  {location.address.street} {location.address.number}
                </Typography>
                <iframe
                  src={`https://maps.google.com/maps?q=${location.name}+${location.address.street}+${location.address.number}&z=15&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ borderRadius: "10px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </Stack>
            </Stack>
          </Stack>
      }
    </Container >
  );
}
