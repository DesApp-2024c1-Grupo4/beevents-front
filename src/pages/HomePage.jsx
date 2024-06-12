import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "../components/Card";
import CardHorizontal from "../components/CardHorizontal";
import DateCard from "../components/home-page-components/DateCard";
import HeroImage from "../components/home-page-components/HeroImage";
import HeroImageImg from "../assets/img/hero-image.png";
import { customMuiTheme } from "../config/customMuiTheme";
import { getAllEvents } from "../services/EventService";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoadingIndicator from "../components/LoadingIndicator";

export function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { contrastGreen } = customMuiTheme.colors;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getAllEvents();
      const sortedEvents = allEvents.sort((a, b) => {
        const dateA = new Date(a.date_times[0]);
        const dateB = new Date(b.date_times[0]);
        return dateA - dateB;
      });
      setEvents(sortedEvents);
    };

    fetchEvents();
  }, []);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <>
      <HeroImage />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "90%" : "100%",
            mt: isMobile ? "1rem" : "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              my: 4,
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              color: "#bdbdbd",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TrendingUpIcon sx={{ mr: 2, color: contrastGreen }} /> Más
            populares
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            {events.length > 0 ? (
              events.slice(0, 3).map((event, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    id={event._id}
                    title={event.title}
                    artist={event.artist}
                    imageUrl={event.image}
                    totalSeats={getRandomInt(100, 150)}
                    isHomePage={true}
                  />
                </Grid>
              ))
            ) : (
              <LoadingIndicator />
            )}
          </Grid>
        </Box>
        <Box
          sx={{
            width: isMobile ? "90%" : "100%",
            mt: isMobile ? "1rem" : "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              my: 4,
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              color: "#bdbdbd",
              display: "flex",
              alignItems: "center",
            }}
          >
            <EventAvailableIcon sx={{ mr: 2, color: contrastGreen }} /> Pronto
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            {events.length > 0 ? (
              events.slice(0, 4).map((event, index) => (
                <Grid item xs={12} sm={3} key={index}>
                  <DateCard
                    id={event.id}
                    date={event.date_times[0]}
                    artist={event.artist}
                    imageUrl={event.image}
                  />
                </Grid>
              ))
            ) : (
              <LoadingIndicator />
            )}
          </Grid>
        </Box>
        <Box
          sx={{
            width: isMobile ? "90%" : "100%",
            mt: isMobile ? "1rem" : "2rem",
            mb: isMobile ? "2rem" : "6rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              my: 4,
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              color: "#bdbdbd",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LocationOnIcon sx={{ mr: 2, color: contrastGreen }} /> Cerca tuyo
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            {[...Array(4)].map((_, index) => (
              <Grid item xs={12} key={index}>
                <CardHorizontal />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
