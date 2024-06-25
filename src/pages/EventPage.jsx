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
          ? <Box
            sx={{
              width: "100%",
              height: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoadingIndicator />
          </Box>
          : <Stack
            my={5}
            spacing={4}
          >
            {/* Artist and name */}
            <Stack spacing={2}>
              <Typography
                variant="h2"
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
                textAlign={{ xs: "center", sm: "left" }}
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  color: contrastGreen
                }}
              >
                {event.name}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              px={{sm:2}}
            >
              {/* Image */}
              <img
                src={event.image}
                alt={event.name}
                style={{
                  borderRadius: "10px",
                  maxHeight: "500px",
                  maxWidth: "50%",
                  border: "5px solid black",
                  alignSelf: "center"
                }}
              />
              <Stack justifyContent="space-between">
                <Stack spacing={3}>
                  {/* Dates */}
                  <Stack
                    alignItems="center"
                    spacing={3}
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
                  {/* Sectors 
                  <Stack
                    alignItems="center"
                    spacing={3}
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
                  */}
                </Stack>
                {/* Reserve button */}
                <Button
                  size="large"
                  sx={{
                    backgroundColor: contrastGreen,
                    color: "whitesmoke",
                    alignSelf: "center",
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
            </Stack>
            {/* About */}
            <Stack
              textAlign={{ xs: "center", sm: "left" }}
              spacing={2}
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
            <Stack
              spacing={2}
              alignItems={{ xs: "center", sm: "start" }}
            >
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" }
                }}
              >
                Ubicación
              </Typography>
              <Stack
                px={{ sm: 2 }}
                spacing={2}
                alignItems={{ xs: "center", sm: "start" }}
              >
                <Stack
                alignItems={{ xs: "center", sm: "start" }}
                >
                  <Typography
                    variant="h2"
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                  >
                    {location.name}
                  </Typography>
                  <Typography
                    variant="h2"
                    gutterBottom
                    sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}
                  >
                    {location.address.street} {location.address.number}
                  </Typography>
                </Stack>
                <Box
                  width={{ xs: "90%", sm: "500px" }}
                  height={{ xs: "90%", sm: "350px" }}
                >
                  <iframe
                    src={`https://maps.google.com/maps?q=${location.name}+${location.address.street}+${location.address.number}&z=15&output=embed`}
                    width="100%"
                    height="100%"
                    style={{
                      borderRadius: "10px",
                      border: "5px solid black"
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </Box>
              </Stack>
            </Stack>
            
          </Stack>
      }
    </Container >
  );
}
