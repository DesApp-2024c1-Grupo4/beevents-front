import { Route, Routes } from "react-router-dom";
import { FilmsPage } from "./pages/FilmsPage";
// import { FilmsPage } from "./pages/FilmsPageReduxStyle";
import { ActorsPage } from "./pages/ActorsPage";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export function AppRouter() {
  return (
    <Routes>
      <Route path='/films' element={<FilmsPage />} />
      <Route path='/actors' element={<ActorsPage />} />
      <Route path='/' element={
        <Box sx={{ typography: 'h5', color: grey[900] }}>
          Elija una opción del menú
        </Box>
      } />
    </Routes>
  );
}