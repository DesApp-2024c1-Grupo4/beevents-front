import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material/";
import { useParams } from "react-router-dom";
import LocalDataBaseService from "../services/LocalDataBaseService";
import { customMuiTheme } from "../config/customMuiTheme";

export function EventPage() {
  const { contrastGreen } = customMuiTheme.colors;
  const localDBService = new LocalDataBaseService();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const fetchedEvent = await localDBService.getEventById(eventId);
      setEvent(fetchedEvent);
    };
    fetchEvent();
  }, [eventId]);

  return (
    <Container maxWidth="md">
      {event && (
        <>
          <Typography
            variant="h6"
            component="h6"
            gutterBottom
            sx={{
              color: contrastGreen,
              my: {
                xs: 3,
                md: 6,
              },
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
            }}
          >
            Evento Id: {event.id}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: contrastGreen,
              my: {
                xs: 3,
                md: 6,
              },
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
            }}
          >
            Nombre: {event.name}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: contrastGreen,
              my: {
                xs: 3,
                md: 6,
              },
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
            }}
          >
            Artista: {event.artist}
          </Typography>
          <img
            src={event.image}
            alt={event.name}
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "100%",
            }}
          />{" "}
        </>
      )}
    </Container>
  );
}