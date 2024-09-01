import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { customMuiTheme } from "../../config/customMuiTheme";

export default function DateCard({ id, date, artist, imageUrl }) {
  const theme = useTheme();
  const { contrastGreen, iconGrey } = customMuiTheme.colors;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const formatDateToMonth = (dateString) => {
    const date = new Date(dateString[0].date_time);
    const month = date.getMonth() + 1;
    switch (month) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";
      default:
        return "";
    }
  };

  const toUpperCase = (text) => text.toUpperCase();

  return (
    <Card
      sx={{
        maxWidth: isMobile ? "100%" : 300,
        width: isMobile ? "80%" : "auto",
        margin: "auto",
        mb: isMobile ? "0.5rem" : "auto",
        backgroundColor: "rgba(12, 12, 13, 0.6)",
        backgroundImage:
          "linear-gradient(0deg, #080808 20%, #273C51 60%, #01BB89 100%)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.8)",
        color: "white",
        transition: "transform 0.3s, background-image 1s ease-in-out",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          // height: isMobile ? 260 : 360,
          // overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={imageUrl}
          alt="Event"
          style={{
            width: "80%",
            // height: "100%",
            height: isMobile ? 240 : 340,
            objectFit: "cover",
            borderRadius: "5px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
            marginTop: "2rem",
          }}
        />
      </Box>
      <CardContent
        sx={{
          position: "relative",
          zIndex: 2,
          color: "white",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "0.5rem",
        }}
      >
        <Typography
          sx={{
            color: contrastGreen,
            fontWeight: "bold",
            fontSize: "25px",
            mb: "0.5rem",
          }}
        >
          <CalendarMonthIcon
            sx={{ mr: 1, color: contrastGreen, fontSize: "20px" }}
          />
          {toUpperCase(formatDateToMonth(date))}
        </Typography>
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: "15px",
            mb: "0.5rem",
          }}
        >
          {toUpperCase(artist)}
        </Typography>

        <Button
          component={Link}
          to={`/event/${id}`}
          size="medium"
          sx={{
            width: isMobile ? "80%" : "60%",
            color: contrastGreen,
            // backgroundColor: "#FFCA42",
            fontWeight: "bold",
            border: `1px solid ${contrastGreen}`,
            textDecoration: "none",
            marginTop: "0.5rem",
            zIndex: 999,
            "&:hover": {
              color: contrastGreen,
            },
          }}
        >
          <ConfirmationNumberIcon sx={{ mr: 1, color: contrastGreen }} />
          VER
        </Button>
      </CardContent>
    </Card>
  );
}
