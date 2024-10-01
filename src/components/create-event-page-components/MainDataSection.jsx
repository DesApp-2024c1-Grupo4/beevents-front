import { Stack, TextField, Typography } from "@mui/material";

export default function MainDataSection({ handleChange, formData }) {
  return (
    <Stack spacing={3} px={{xs: 3, sm: 6}}>
        <Typography
          variant="h1"
          alignSelf="center"
        >
          Datos principales
        </Typography>
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