import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material/";
import LocalDataBaseService from "../services/LocalDataBaseService";
import MediaCard from "../components/Card";
import Typography from "@mui/material/Typography";
import { customMuiTheme } from "../config/customMuiTheme";
import InputSearch from "../components/InputSearch";

export function EventsPage() {
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

  const handleSearch = (searchValue) => {
    const lowercasedFilter = searchValue.toLowerCase();
    const filteredData = events.filter((item) =>
      item.name.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredEvents(filteredData);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
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
            Todos los eventos
          </Typography>
          <InputSearch
            options={events.map((event) => event.name)}
            onSearch={handleSearch}
          />
        </Box>
        <Grid container spacing={4}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <MediaCard
                id={event.id}
                title={event.name}
                artist={event.artist}
                imageUrl={event.image}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
