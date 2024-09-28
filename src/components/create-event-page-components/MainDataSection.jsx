import { Button, Stack, TextField, Typography } from "@mui/material";

export default function MainDataSection({ nextStep, handleChange, formData }) {
  return (
    <Stack spacing={3} px={3}>
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h1"
        >
          Datos principales
        </Typography>
        <Button variant="contained" onClick={nextStep} >Siguiente</Button>
      </Stack>
      <TextField
        name="name"
        label={"Nombre del evento"}
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="artist"
        label={"Artista"}
        value={formData.artist}
        onChange={handleChange}
        required
      />
      <TextField
        name="image"
        label={"Imagen"}
        value={formData.image}
        onChange={handleChange}
        required
      />
      <TextField
        name="description"
        label={"Descripción"}
        value={formData.description}
        onChange={handleChange}
        multiline
        required
      />
    </Stack>
  )
}