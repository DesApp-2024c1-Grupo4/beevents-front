import { Button, Stack, Typography } from "@mui/material";

export default function Confirmation({ handleSubmit, formData }) {
  return (
    <Stack spacing={3} px={6}>
      <Typography
        variant="h1"
        alignSelf="center"
        textAlign="center"
      >
        Confirma los datos de tu evento
      </Typography>
      <Stack>
        <Typography>Nombre: {formData.name}</Typography>
        <Typography>Artista: {formData.artist}</Typography>
        <img src={formData.image}/>
        <Typography>Descripción: {formData.description}</Typography>
        <Typography>Lugar: {formData.location_id}</Typography>
        <Typography>Fechas: {formData.dates.map(date => date.date_time)}</Typography>
        <Typography>Sectores: {formData.dates[0].sectors.map(sector => sector.name)}</Typography>
      </Stack>
    </Stack>
  )
}