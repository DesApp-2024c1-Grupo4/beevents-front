import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

  return (
    <Card
      sx={{
        maxWidth: isMobile ? "100%" : 300,
        width: isMobile ? "100%" : "auto",
        height: isMobile ? 360 : "auto",
        margin: "auto",
        mb: isMobile ? "0.5rem" : "auto",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)",
        transition: "transform 0.3s",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <div style={{ position: "relative" }}>
        <img
          src={imageUrl}
          alt="Event"
          style={{
            width: "100%",
            height: !isMobile ? 500 : 300,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "90%",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 1.0) 20%, rgba(0, 0, 0, 0) 100%)",
            zIndex: 1,
          }}
        ></div>
        <CardContent
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            color: "white",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          {" "}
          <Typography
            sx={{ color: "white", fontWeight: "bold", fontSize: "18px" }}
          >
            {artist}
          </Typography>
          <Typography
            sx={{ color: contrastGreen, fontWeight: "bold", fontSize: "30px" }}
          >
            {formatDateToMonth(date)}
          </Typography>
        </CardContent>
      </div>
      <CardActions sx={{ justifyContent: "center", padding: "10px" }}>
        <Button
          component={Link}
          to={`/event/${id}`}
          size="medium"
          sx={{
            color: contrastGreen,
            fontWeight: "bold",
            textDecoration: "none",
            "&:hover": {
              color: contrastGreen,
            },
            "&:visited": {
              color: contrastGreen,
            },
          }}
        >
          Ver
        </Button>
      </CardActions>
    </Card>
  );
}
