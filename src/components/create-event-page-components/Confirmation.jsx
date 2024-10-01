import { Button, Stack, Typography } from "@mui/material";
import { indexOf } from "lodash";

export default function Confirmation({ handleSubmit, formData, selectedLocationName }) {
  const name = formData.name ? formData.name : "Ninguno"
  const artist = formData.artist ? formData.artist : "Ninguno/a"
  const image = formData.image
  const description = formData.description ? formData.description : "Ninguna"
  const location = selectedLocationName ? selectedLocationName : "Ninguno"
  const thereIsOneDateAtLeast = formData.dates.length > 0
  const dates = thereIsOneDateAtLeast && formData.dates.map(date => date.date_time)
  const thereIsOneSectorAtLeast = thereIsOneDateAtLeast && formData.dates[0].sectors.length > 0
  const sectors = thereIsOneSectorAtLeast && formData.dates[0].sectors.map(sector => sector.name)

  const formatDate = (date) => {
    return (
      new Date(date).toLocaleDateString()
      + " - "
      + new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      })
      + "hs"
    )
  }

  return (
    <Stack spacing={3} px={{ xs: 3, sm: 6 }}>
      <Typography
        variant="h1"
        alignSelf="center"
        textAlign="center"
      >
        Confirma los datos de tu evento
      </Typography>
      <Stack spacing={2}>
        <Typography>Nombre:</Typography>
        <Typography pl={2}>{name}</Typography>
        <Typography>Artista:</Typography>
        <Typography pl={2}>{artist}</Typography>
        {!image && <Typography>Imagen: Ninguna</Typography>}
        {image && <img src={image} />}
        <Typography>Descripción:</Typography>
        <Typography pl={2}>{description}</Typography>
        <Typography>Predio:</Typography>
        <Typography pl={2}>{location}</Typography>
        <Typography>Fechas: {!thereIsOneDateAtLeast && "Ninguna"}</Typography>
        {thereIsOneDateAtLeast &&
          <Stack pl={2}>
            {dates.map(date =>
              <Stack direction={{xs: "column", sm: "row"}} spacing={{xs:0, sm: 2}}>
                <Typography key={indexOf(dates, date)}>Fecha {indexOf(dates, date) + 1}:</Typography>
                <Typography>{formatDate(date)}</Typography>
              </Stack>
            )}
          </Stack>
        }
        <Typography>Sectores: {!thereIsOneSectorAtLeast && "Ninguno"}</Typography>
        {thereIsOneSectorAtLeast &&
          <Stack>
            {sectors.map(sector => <Typography key={indexOf(sectors, sector)} pl={2}>{sector}</Typography>)}
          </Stack>
        }
      </Stack>
    </Stack>
  )
}