import React, { useCallback, useEffect, useState } from "react";
import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";
import { getAllActors } from "../services/ActorsService";
import { blueGrey } from "@mui/material/colors";

const unknownPersonImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/813px-Unknown_person.jpg";

function ActorCard({ actor }) {
  return <Card sx={{ backgroundColor: blueGrey[50], display: 'flex', flexDirection: 'row' }} elevation={2}>
    <Stack direction='column' sx={{ flexGrow: 1, mt: 1, ml: 2 }}>
      <Box sx={{ typography: 'h5', mb: 2 }}>{actor.name}</Box>
      <Box sx={{ typography: 'h6', mb: 1 }}>Películas</Box>
      { actor.films.map((film, ix) => <Box key={ix} sx={{ typography: 'body1' }}>
        {`${film.year} - ${film.name}`}
      </Box> )}
    </Stack>
    <CardMedia
      component="img"
      image={actor.image || unknownPersonImage}
      alt="Jonathan Pryce"
      sx={{ width: { xs: 100, sm: 140 }, height: 200 }}
    />          
  </Card>;
}


export function ActorsPage() {
  const [allActors, setAllActors] = useState();

  const fetchAllActors = useCallback(async () => {
    const obtainedActors = await getAllActors();
    setAllActors(obtainedActors);
  }, []);

  useEffect(() => {
    fetchAllActors();
  }, [fetchAllActors]);

  return allActors && <Stack direction='column'>
    <Typography variant='h4' sx={{ mb: 2 }}>Actores</Typography>
    <Grid container direction='row'>
      { allActors.map(actorData => (
        <Grid item key={actorData.id} xs={12} md={6} sx={{ px: 2, py: 2 }}><ActorCard actor={actorData} /></Grid>
      )) }
    </Grid>
  </Stack>;    
}