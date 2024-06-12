import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { customMuiTheme } from "../../config/customMuiTheme";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HeroImageCard({ id, date, artist, imageUrl }) {
  const theme = useTheme();
  const { contrastGreen } = customMuiTheme.colors;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        width: !isMobile ? 200 : 100,
        height: !isMobile ? 250 : 140,
        position: "relative",
        margin: "10px",
        mb: isMobile ? "0.5rem" : "auto",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 2.3)",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 1)",
        },
        border: `2px solid ${contrastGreen}`,
      }}
    >
      <Link to={`/event/${id}`} style={{ textDecoration: "none" }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={imageUrl}
            alt="Event"
            style={{
              width: !isMobile ? 200 : 100,
              height: !isMobile ? 250 : 140,
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
            <Typography
              sx={{
                color: contrastGreen,
                fontWeight: "bold",
                fontSize: "25px",
              }}
            >
              {date}
            </Typography>
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: isMobile ? "13px" : "18px",
              }}
            >
              {artist}
            </Typography>
          </CardContent>
        </div>
      </Link>
    </Card>
  );
}
