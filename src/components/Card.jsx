import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { customMuiTheme } from "../config/customMuiTheme";

export default function MediaCard({
  id,
  title,
  artist,
  imageUrl,
  totalSeats,
  isHomePage,
}) {
  const { contrastGreen, iconGrey } = customMuiTheme.colors;
  const isMobile = useMediaQuery("(max-width:600px)");
  const [reservedSeats, setReservedSeats] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      const increment = Math.floor(totalSeats / 10);
      const interval = setInterval(() => {
        setReservedSeats((prevSeats) =>
          prevSeats < totalSeats ? prevSeats + increment : totalSeats
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [inView, totalSeats]);

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
            height: !isMobile ? 400 : 290,
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
          ref={ref}
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
            sx={{ color: iconGrey, fontWeight: "bold", fontSize: "25px" }}
          >
            {artist}
          </Typography>
          <Typography
            sx={{
              color: contrastGreen,
              fontWeight: "bold",
              fontSize: isHomePage ? "25px" : "13px",
            }}
          >
            {title}
          </Typography>
          {isHomePage && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                color: contrastGreen,
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              + de{" "}
              <span style={{ color: "white", fontSize: "24px" }}>
                {reservedSeats}
              </span>{" "}
              asientos reservados
            </Typography>
          )}
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
