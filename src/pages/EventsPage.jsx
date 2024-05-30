import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import LocalDataBaseService from "../services/LocalDataBaseService";
import MediaCard from "../components/Card";

export function EventsPage() {
  const [events, setEvents] = useState([]);
  const localDBService = new LocalDataBaseService();

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await localDBService.getAllEvents();
      setEvents(allEvents);
    };
    fetchEvents();
  }, []);

  return (
    <Container maxWidth="md">
      <div>
        <h1>Soy la pagina de eventos</h1>
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} md={4} key={event.id}>
              <MediaCard
                title={event.name}
                artist={event.artist}
                imageUrl={event.image} // Asegúrate de que los eventos tienen esta propiedad
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
