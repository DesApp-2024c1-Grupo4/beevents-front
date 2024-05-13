import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { TopMenu } from "./components/TopMenu";
import { AppRouter } from "./AppRouter";
import { getCurrentWeather } from "./services/WeatherService";
import { WeatherIndicator } from "./components/WeatherIndicator";
import { Header } from "./components/Header";
import Container from "@mui/material/Container";

export function App() {
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    const fetchWeatherData = async () => {
      const obtainedData = await getCurrentWeather("Buenos Aires");
      setWeatherData(obtainedData);
    };
    fetchWeatherData();
  }, []);

  return (
    <BrowserRouter>
      <Stack direction="column">
        <Grid container direction="row">
          <Grid item xs={12} md={12}>
            <Header />
          </Grid>
        </Grid>
        <Box sx={{ mx: { xs: 1, md: 4 }, my: 4 }}>
          <Container maxWidth="lg">
            <AppRouter />
          </Container>
        </Box>
      </Stack>
    </BrowserRouter>
  );
}
