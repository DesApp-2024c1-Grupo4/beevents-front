import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { customMuiTheme } from "../config/customMuiTheme";

export default function LoadingIndicator() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { contrastGreen, iconGrey } = customMuiTheme.colors;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 1.5)",
        mt: "2rem",
        mb: "2rem",
      }}
    >
      <CircularProgress sx={{ marginBottom: "15px", color: contrastGreen }} />
      <Typography
        sx={{
          color: iconGrey,
          fontWeight: "semibold",
          fontSize: isMobile ? "15px" : "25px",
        }}
      >
        Cargando eventos{" "}
      </Typography>
    </Box>
  );
}
