import notFoundSm from "../assets/img/logo404sm.png";
import notFoundLg from "../assets/img/logo404lg.png";
import { customMuiTheme } from "../config/customMuiTheme";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { contrastGreen } = customMuiTheme.colors;

  return <Stack
    spacing={{xs: 7, sm: 10}}
    sx={{
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      p: 8
    }}>
    <Stack spacing={2}>
      <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
        ¡Ups!
      </Typography>
      <Typography variant="h3" sx={{ fontSize: { xs: "0.8rem", md: "1.2rem" } }}>
        Parece que te perdiste...
      </Typography>
    </Stack>
    <Box
      component="img"
      sx={{
        content: { xs: `url(${notFoundSm})`, sm: `url(${notFoundLg})` },
        maxWidth: "100%",
        height: "auto",
        maxHeight: { xs: "300px", md: "100%" }
      }}
    />
    <Button
      component={Link}
      to="/"
      size="large"
      sx={{ color: "white", bgcolor: contrastGreen }} >
      <Typography variant="h2" sx={{ color:"whitesmoke", fontSize: { xs: "0.8rem", md: "1.2rem" } }}>
        Volver a inicio
      </Typography>
    </Button>
  </Stack >
}