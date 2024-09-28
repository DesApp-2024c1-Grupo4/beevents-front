import { Button, Stack, Typography } from "@mui/material";

export default function Confirmation({ prevStep, handleSubmit, formData }) {
  return (
    <Stack spacing={3} px={3}>
      <Stack
        direction={{ xs: "column-reverse", sm: "row" }}
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button variant="contained" onClick={prevStep} >Atrás</Button>
        <Typography
          variant="h1"
        >
          Confirma los datos de tu evento
        </Typography>
        <Button variant="contained" onClick={handleSubmit} >Crear evento</Button>
      </Stack>
      <Stack>
        <Typography>{formData.name}</Typography>
        <Typography>{formData.artist}</Typography>
        <Typography>{formData.description}</Typography>
      </Stack>
    </Stack>
  )
}