import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
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
  locationName,
}) {
  const { contrastGreen, iconGrey } = customMuiTheme.colors;
  const isMobile = useMediaQuery("(max-width:600px)");
  const [reservedSeats, setReservedSeats] = useState(0);
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      const increment = Math.floor(totalSeats / 30);
      const interval = setInterval(() => {
        setReservedSeats((prevSeats) =>
          prevSeats < totalSeats ? prevSeats + increment : totalSeats
        );
      }, 100);
      return () => clearInterval(interval);
    }
  }, [inView, totalSeats]);

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
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={imageUrl}
          alt="Event"
          style={{
            width: "80%",
            height: isMobile ? 230 : 260,
            objectFit: "cover",
            borderRadius: "5px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
            marginTop: "2rem",
          }}
        />
      </Box>
      <CardContent
        ref={ref}
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
        {isHomePage && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: "17px",
            }}
          >
            <span style={{ color: "white", fontSize: "30px" }}>
              <span
                style={{
                  color: contrastGreen,
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                +
              </span>{" "}
              de{" "}
              <span
                style={{
                  color: contrastGreen,
                  fontWeight: "bold",
                  fontSize: "30px",
                }}
              >
                {reservedSeats}
              </span>
            </span>{" "}
            <br />
            asientos reservados
          </Typography>
        )}
        <Typography
          sx={{ color: iconGrey, fontWeight: "bold", fontSize: "20px" }}
        >
          {toUpperCase(artist)}
        </Typography>
        {!isHomePage && (
          <>
            <Typography
              sx={{
                color: contrastGreen,
                fontSize: "12px",
                marginTop: isMobile ? "0.3rem" : "0.3rem",
              }}
            >
              PRESENTA
            </Typography>
            <Typography
              sx={{
                color: contrastGreen,
                fontWeight: "bold",
                fontSize: "14px",
                marginTop: "0.3rem",
              }}
            >
              {title}
            </Typography>
            <Typography
              component="div"
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
                marginTop: "0.1rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocationOnIcon
                  sx={{
                    mr: "3px",
                    color: contrastGreen,
                    fontSize: "15px",
                  }}
                />
                {locationName}
              </Box>
            </Typography>
          </>
        )}
        <Button
          component={Link}
          to={`/event/${id}`}
          size="medium"
          sx={{
            width: isMobile ? "80%" : "60%",
            color: contrastGreen,
            fontWeight: "bold",
            border: `1px solid ${contrastGreen}`,
            textDecoration: "none",
            marginTop: "1rem",
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
