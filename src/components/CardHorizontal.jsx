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

export default function CardHorizontal({
  id,
  title,
  artist,
  imageUrl,
}) {
  const { contrastGreen, iconGrey } = customMuiTheme.colors;
  const isMobile = useMediaQuery("(max-width:600px)");
  /*const randomImageUrl = `https://picsum.photos/600/140?random=${Math.floor(
    Math.random() * 1000
  )}`;*/
  return (
    <Card sx={{ display: "flex", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)", height: isMobile ? 60 : 130, }}>
      <img
          src={imageUrl}
          alt="Event"
          style={{
            width: "33%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 0 auto",
          backgroundColor: "#0C1017",
          border: "2px solid",
          borderImage: `linear-gradient(to left, ${contrastGreen}, gray, transparent) 1`,
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center", padding: 1 }}>
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
            }}
          />
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: iconGrey,
                fontWeight: "bold",
                fontSize: {
                  xs: "1rem",
                  sm: "1.1rem",
                  md: "1.3rem",
                },
              }}
            >
              {artist}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: iconGrey,
                fontWeight: "light",
                fontSize: {
                  xs: "0.8rem",
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
                  xs: "0.8rem",
                  sm: "1.0rem",
                  md: "1.1rem",
                },
              }}
            >
              Predio
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: iconGrey,
                fontSize: {
                  xs: "0.7rem",
                  sm: "0.9rem",
                  md: "1rem",
                },
              }}
            >
              Localidad
            </Typography>
          </Box>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Box>
    </Card>
  );
}
