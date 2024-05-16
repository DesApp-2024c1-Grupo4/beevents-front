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

export default function CardHorizontal() {
  const { contrastGreen, iconGrey } = customMuiTheme.colors;
  const randomImageUrl = `https://picsum.photos/600/140?random=${Math.floor(
    Math.random() * 1000
  )}`;
  return (
    <Card sx={{ display: "flex", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)" }}>
      <CardMedia
        sx={{ width: "50%", minWidth: 140 }}
        image={randomImageUrl}
        title="green iguana"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: "1 0 auto",
          backgroundColor: "#0C1017",
          border: "2px solid",
          borderImage: "linear-gradient(to left, white, transparent) 1",
        }}
      >
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <RoomIcon
            sx={{
              marginLeft: {
                xs: 0,
                sm: 2,
              },
              marginRight: {
                xs: 1,
                sm: 2,
              },
              fontSize: {
                xs: 20,
                md: 40,
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
                  sm: "1.5rem",
                  md: "1.6rem",
                },
              }}
            >
              Dirección
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: iconGrey,
                fontWeight: "light",
                fontSize: {
                  xs: "0.8rem",
                  sm: "1rem",
                  md: "1.2rem",
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
