import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "../components/Card";
import CardHorizontal from "../components/CardHorizontal";
import DateCard from "../components/home-page-components/DateCard";
import HeroImage from "../components/home-page-components/HeroImage";
import { customMuiTheme } from "../config/customMuiTheme";
import { getAllEvents } from "../services/EventService";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoadingIndicator from "../components/LoadingIndicator";

export function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { contrastGreen } = customMuiTheme.colors;
  const [eventsOrderByDates, setEventsOrderByDates] = useState([]);
  const [eventsOrderByTickets, setEventsOrderByTickets] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const allEvents = await getAllEvents();
      console.log(allEvents);
      const sortedEvents = orderEventsByDate(allEvents);
      setEventsOrderByDates(sortedEvents);
      const countedTickets = countReservedTickets(allEvents);
      setEventsOrderByTickets(countedTickets);
      console.log(eventsOrderByTickets);
    };
    fetchEvents();
  }, []);

  const orderEventsByDate = (events) => {
    const orderEvents = events.sort((a, b) => {
      const dateA = new Date(a.dates[0].date_time);
      const dateB = new Date(b.dates[0].date_time);
      return dateA - dateB;
    });
    return orderEvents;
  };

  const countReservedTickets = (events) => {
    const countedEvents = events.map((event) => {
      let reservedTicketsCount = 0;
      event.dates.forEach((date) => {
        date.sectors.forEach((sector) => {
          if (sector.numbered) {
            sector.rows.forEach((row) => {
              row.forEach((seat) => {
                if (!seat.available) {
                  reservedTicketsCount++;
                }
              });
            });
          } else {
            sector.rows.forEach((row) => {
              row.forEach((seat) => {
                reservedTicketsCount++;
              });
            });
          }
        });
      });
      return {
        _id: event._id,
        title: event.name,
        artist: event.artist,
        name: event.name,
        image: event.image,
        reservedTickets: reservedTicketsCount,
      };
    });
    countedEvents.sort((a, b) => b.reservedTickets - a.reservedTickets);
    return countedEvents;
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
            <StarIcon sx={{ mr: 2, color: contrastGreen }} /> Más populares
          </Typography>
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            {eventsOrderByTickets.length > 0 ? (
              eventsOrderByTickets.slice(0, 3).map((event, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    id={event._id}
                    title={event.name}
                    artist={event.artist}
                    imageUrl={event.image}
                    totalSeats={event.reservedTickets}
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
            {eventsOrderByDates.length > 0 ? (
              eventsOrderByDates.slice(0, 4).map((event, index) => (
                <Grid item xs={12} sm={3} key={index}>
                  <DateCard
                    id={event._id}
                    date={event.dates}
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
