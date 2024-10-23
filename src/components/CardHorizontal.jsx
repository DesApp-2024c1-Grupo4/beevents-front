import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import RoomIcon from "@mui/icons-material/Room";
import { customMuiTheme } from "../config/customMuiTheme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import { useMediaQuery } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Link } from "react-router-dom";

export default function CardHorizontal({
  id,
  title,
  artist,
  imageUrl,
  locationName,
  locationStreet,
  locationNumber,
}) {
  const { contrastGreen, iconGrey } = customMuiTheme.colors;
  const isMobile = useMediaQuery("(max-width:600px)");
  const toUpperCase = (text) => text.toUpperCase();

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)",
        height: isMobile ? 370 : 150,
        transition: "transform 0.3s, background-image 1s ease-in-out",
        border: "2px solid",
        borderColor: isMobile ? contrastGreen : "transparent",
        borderImage: !isMobile
          ? `linear-gradient(to left, ${contrastGreen}, gray, transparent) 1`
          : "none",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <img
        src={imageUrl}
        alt="Event"
        style={{
          width: isMobile ? "100%" : "30%",
          height: isMobile ? "45%" : "100%",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 0 auto",
          backgroundColor: "#0C1017",
          color: "white",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            padding: isMobile ? 1 : 2,
          }}
        >
          <RoomIcon
            sx={{
              marginLeft: {
                xs: 0,
                sm: 0,
              },
              marginRight: {
                xs: 1,
                sm: 1.5,
              },
              fontSize: {
                xs: 20,
                md: 25,
              },
              flex: {
                xs: "0 0 10%",
                sm: "0 0 7%",
              },
              alignSelf: {
                xs: "center",
                sm: "center",
              },
              padding: {
                xs: 1,
                sm: 0,
              },
            }}
          />
          <Box
            sx={{
              flex: isMobile ? "0 0 55%" : "0 0 70%",
              textAlign: isMobile ? "center" : "left",
              margin: "auto",
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: iconGrey,
                fontWeight: "bold",
                fontSize: {
                  xs: "1.1rem",
                  sm: "1.1rem",
                  md: "1.3rem",
                },
              }}
            >
              {toUpperCase(artist)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: iconGrey,
                fontWeight: "light",
                fontSize: {
                  xs: "0.9rem",
                  sm: "1.0rem",
                  md: "1.1rem",
                },
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: iconGrey,
                fontSize: {
                  xs: "0.9rem",
                  sm: "1.0rem",
                  md: "1.1rem",
                },
                fontWeight: "bold",
              }}
            >
              {locationName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: iconGrey,
                fontSize: {
                  xs: "0.8rem",
                  sm: "0.9rem",
                  md: "1rem",
                },
              }}
            >
              {locationStreet} {locationNumber}
            </Typography>
          </Box>
          <Button
            component={Link}
            to={`/event/${id}`}
            size="medium"
            sx={{
              flex: "0 0 18%",
              color: contrastGreen,
              fontWeight: "bold",
              border: `1px solid ${contrastGreen}`,
              textDecoration: "none",
              marginTop: "1rem",
              margin: isMobile ? "1rem auto 0 auto" : "1rem 0 0 0",
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
      </Box>
    </Card>
  );
}
