import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EventsPage } from "./pages/EventsPage";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/events" element={<EventsPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
