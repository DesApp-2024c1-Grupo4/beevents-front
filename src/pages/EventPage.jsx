import React, { useEffect, useState } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material/";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/EventService";
import { customMuiTheme } from "../config/customMuiTheme";
import { getLocationById } from "../services/LocationService";

export function EventPage() {
  const { contrastGreen } = customMuiTheme.colors;
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
  }, [eventId]);

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
      {event && (
        <Stack my={4}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
            >
            <Stack alignItems={{xs:"center", sm: "start"}}>
              <Typography
                variant="h2"
                gutterBottom
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
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  color: contrastGreen
                }}
              >
                {event.name}
              </Typography>
            </Stack>
            <Stack alignItems={{xs: "center", sm:"end"}}>
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
          </Stack>
          <Stack
            alignItems="center"
            className="border-grad"
            my={3}
          >
            <img
              src={event.image}
              alt={event.name}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px"
              }}
            />
          </Stack>
          <Stack direction={{ sm: "row" }} justifyContent="space-evenly">
            {event.date_times.map(date =>
              <Typography
                className="border-grad"
                m={2}
                color="inherit"
                textAlign="center">
                {getFormatedDate(date)}
              </Typography>
            )}

          </Stack>
        </Stack>
      )}
    </Container>
  );
}
