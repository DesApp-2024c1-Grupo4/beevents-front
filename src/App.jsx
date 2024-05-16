import React, { useEffect, useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { TopMenu } from "./components/TopMenu";
import { AppRouter } from "./AppRouter";
import { getCurrentWeather } from "./services/WeatherService";
import { WeatherIndicator } from "./components/WeatherIndicator";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

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
      <Header />
      <Stack direction="column" style={{ minHeight: "100vh" }}>
        <Box sx={{ mx: { xs: 0, md: 0 }, my: 0 }}>
          <AppRouter />
        </Box>
      </Stack>
      <Footer />
    </BrowserRouter>
  );
}
