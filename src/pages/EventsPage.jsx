import React, { useEffect, useState } from "react";
import { Container, Grid, Box } from "@mui/material/";
import { getAllEvents } from "../services/EventService";
import InputSearch from "../components/InputSearch";
import MediaCard from "../components/Card";
import Typography from "@mui/material/Typography";
import { customMuiTheme } from "../config/customMuiTheme";
import LoadingIndicator from "../components/LoadingIndicator";

export function EventsPage() {
  const { contrastGreen } = customMuiTheme.colors;
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getAllEvents();
      setEvents(allEvents);
      setFilteredEvents(allEvents);
    };
    fetchEvents();
  }, []);

  const handleSearch = (searchValue) => {
    const lowercasedFilter = searchValue.toLowerCase();
    const filteredData = events.filter((item) =>
      item.artist.toLowerCase().includes(lowercasedFilter)
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
            options={events.map((event) => event.artist)}
            onSearch={handleSearch}
          />
        </Box>
        <Grid
          container
          spacing={4}
          sx={{
            my: 0.5,
          }}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Grid item xs={12} md={6} lg={4} key={event._id}>
                <MediaCard
                  id={event._id}
                  title={event.name}
                  artist={event.artist}
                  imageUrl={event.image}
                  isHomePage={false}
                />
              </Grid>
            ))
          ) : (
            <Box
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
          )}
        </Grid>
      </Box>
    </Container>
  );
}
