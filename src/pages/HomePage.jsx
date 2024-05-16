import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import HeroImage from "../assets/img/hero-image.png";
import Typography from "@mui/material/Typography";
import { customMuiTheme } from "../config/customMuiTheme";
import Grid from "@mui/material/Grid";
import Card from "../components/Card";
import CardHorizontal from "../components/CardHorizontal";

export function HomePage() {
  const { contrastGreen } = customMuiTheme.colors;
  return (
    <>
      <Box
        component="section"
        sx={{
          margin: 0,
          padding: 0,
          width: "100%",
          height: "60vh",
          backgroundImage: `url(${HeroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              color: contrastGreen,
              my: 4,
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
            }}
          >
            Más populares
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <Card />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card />
            </Grid>
          </Grid>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              color: contrastGreen,
              my: 4,
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
            }}
          >
            Pronto
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={4}>
              <Card />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card />
            </Grid>
          </Grid>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              color: contrastGreen,
              my: 4,
              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
              alignSelf: "flex-start",
            }}
          >
            Cerca tuyo
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              marginBottom: 4,
            }}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <CardHorizontal />
            </Grid>
            <Grid item xs={12}>
              <CardHorizontal />
            </Grid>
            <Grid item xs={12}>
              <CardHorizontal />
            </Grid>
            <Grid item xs={12}>
              <CardHorizontal />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
