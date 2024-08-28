import React from "react";
import { Box, Stack } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./AppRouter";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export function App() {

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
