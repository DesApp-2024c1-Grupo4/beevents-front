import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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

  const toUpperCase = (text) => text.toUpperCase();

  return (
    <Card
      sx={{
        maxWidth: isMobile ? "100%" : 300,
        width: isMobile ? "80%" : "auto",
        // height: isMobile ? 360 : "auto",
        margin: "auto",
        mb: isMobile ? "0.5rem" : "auto",
        backgroundColor: "rgba(12, 12, 13, 0.6)",
        backgroundImage:
          "linear-gradient(0deg, #080808 20%, #273C51 60%, #01BB89 100%)",
        // backgroundImage:
        //   "conic-gradient(from 0deg, #01BB89 30%, #273C51 50%, #080808 100%)",
        // backgroundImage:
        //   "repeating-conic-gradient(#01BB89 10%, #273C51 15%, #080808 20%)",
        // border: "2px solid #217560",
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
      {/* <Button
        component={Link}
        to={`/event/${id}`}
        size="medium"
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          color: "#000",
          backgroundColor: "#FFCA42",
          fontWeight: "bold",
          textDecoration: "none",
          zIndex: 999,
          "&:hover": {
            color: "#000",
          },
        }}
      >
        <ConfirmationNumberIcon sx={{ mr: 1, color: "#000" }} />
        VER
      </Button> */}
      <Box
        sx={{
          position: "relative",
          height: isMobile ? 260 : 360,
          // overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          paddingBottom: "1rem",
        }}
      >
        <img
          src={imageUrl}
          alt="Event"
          style={{
            width: "70%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "5px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
            marginTop: "1.5rem",
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
              // fontWeight: "bold",
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
        {/* <Typography
          sx={{
            color: contrastGreen,
            fontWeight: "bold",
            // fontSize: isHomePage ? "20px" : "18px",
            fontSize: "14px",
          }}
        >
          {title}
        </Typography> */}
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
