import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material/";
import { Link, useParams } from "react-router-dom";
import { getEventById } from "../services/EventService";
import { customMuiTheme } from "../config/customMuiTheme";
import { getLocationById } from "../services/LocationService";
import LoadingIndicator from "../components/LoadingIndicator"
import UserService from "../services/userService";

export function EventPage() {
  const { contrastGreen, oceanicBlue } = customMuiTheme.colors;
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [location, setLocation] = useState("")
  const us = new UserService()
  const user = us.getUserFromLocalStorage()

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
            spacing={{ xs: 4, sm: 8 }}
          >
            {/* Artist and name */}
            <Stack spacing={2}>
              <Typography
                variant="h2"
                textAlign={{ xs: "center", sm: "left" }}
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                }}
              >
                {event.artist} en {location.name}
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
            {/* Image and (dates and button) */}
            <Stack
              direction={{ sm: "row" }}
              spacing={{ xs: 4, sm: 0 }}
              justifyContent="space-between"
              px={{ sm: 2 }}
            >
              {/* Image */}
              <Stack
                maxWidth={{ xs: "85%", sm: "50%" }}
                alignSelf="center"
              >
                <img
                  src={event.image}
                  alt={event.name}
                  style={{
                    borderRadius: "10px",
                    maxWidth: "100%",
                    maxHeight: "500px",
                    border: "5px solid black",
                    alignSelf: "center"
                  }}
                />
              </Stack>
              {/* Dates and reserve button */}
              <Stack
                justifyContent="space-between"
                spacing={4}
              >
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
                    {event.dates.map(date =>
                      <Typography
                        key={date.date_time}
                        className="border-grad"
                        backgroundColor={oceanicBlue}
                        borderRadius={2}
                        color="inherit"
                        textAlign="center"
                        variant="info"
                        sx={{ fontSize: { md: "1rem" } }}
                      >
                        {getFormatedDate(date.date_time)}
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
                {/* Reserve button */}
                <Button
                  component={Link}
                  to={user ? `/reservation/${eventId}` : "/auth/login"}
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
              textAlign="center"
              spacing={2}
              maxWidth={{ sm: "70%" }}
              alignSelf="center"
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
                {event.description}
              </Typography>
            </Stack>
            {/* Location */}
            <Stack
              spacing={2}
              alignItems="center"
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
                alignItems="center"
              >
                <Stack
                  alignItems="center"
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
                <Stack
                  width={{ xs: "90%", sm: "400px" }}
                  height={{ xs: "90%", sm: "250px" }}
                  alignSelf="center"
                >
                  <iframe
                    src={`https://maps.google.com/maps?q=${location.name}+${location.address.street}+${location.address.number}&z=14&output=embed`}
                    width="100%"
                    height="100%"
                    style={{
                      borderRadius: "10px",
                      border: "5px solid black",
                      alignSelf: "center"
                    }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade">
                  </iframe>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
      }
    </Container >
  );
}
