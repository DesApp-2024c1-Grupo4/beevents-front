import { Button, Stack, Tooltip, Typography } from "@mui/material";
import { indexOf } from "lodash";
import { customMuiTheme } from "../../config/customMuiTheme";
import validator from "validator";

export default function Confirmation({ handleSubmit, formData, selectedLocationName, eventId, datesArray }) {
  const { contrastGreen } = customMuiTheme.colors;

  const name = formData.name ? formData.name : "Ninguno"
  const artist = formData.artist ? formData.artist : "Ninguno/a"
  const image = formData.image;
  const isValidImage = validator.isURL(image);
  const description = formData.description ? formData.description : "Ninguna"
  const location = selectedLocationName ? selectedLocationName : "Ninguno"
  const thereIsOneDateAtLeast = datesArray.length > 0
  const dates = thereIsOneDateAtLeast && datesArray.map(date => date.date_time)
  const thereIsOneSectorAtLeast = thereIsOneDateAtLeast && datesArray[0].sectors.length > 0
  const sectors = thereIsOneSectorAtLeast && datesArray[0].sectors.map(sector => sector.name)
  const allowCreateOrEdit = name && artist && image && description && location && thereIsOneDateAtLeast && thereIsOneSectorAtLeast

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

  const titlesStyle = {
    fontSize: { xs: "14px", sm: "18px" },
    fontWeight: "bold",
    color: contrastGreen,
    alignSelf: { xs: "center", sm: "start" }
  }

  const dataStyle = {
    pl: { xs: 0, sm: 2 },
    alignSelf: { xs: "center", sm: "start" },
    fontSize: { xs: "12px", sm: "16px" },
    textAlign: { xs: "center", sm: "left" }
  }

  const imageStyle = {
    borderRadius: "10px",
    maxWidth: "100%",
    border: "5px solid black",
    alignSelf: { xs: "center", sm: "end" },
  }

  return (
    <Stack spacing={4} px={{ xs: 3, sm: 6 }}>
      <Typography
        variant="h1"
        alignSelf="center"
        textAlign="center"
      >
        Confirma los datos del evento
      </Typography>
      <Stack
        spacing={3}
      >
        {isValidImage && <img src={image} style={imageStyle} />}
        <Typography sx={titlesStyle}>Nombre</Typography>
        <Typography sx={dataStyle}>{name}</Typography>
        <Typography sx={titlesStyle}>Artista</Typography>
        <Typography sx={dataStyle}>{artist}</Typography>
        {!isValidImage && <>
          <Typography sx={titlesStyle}>Imagen</Typography>
          <Typography sx={dataStyle}>Ninguna</Typography>
        </>}
        <Typography sx={titlesStyle}>Descripción</Typography>
        <Typography sx={dataStyle}>{description}</Typography>
        <Typography sx={titlesStyle}>Fechas</Typography>
        {!thereIsOneDateAtLeast && <Typography sx={dataStyle}>Ninguna</Typography>}
        {thereIsOneDateAtLeast &&
          <Stack>
            {dates.map(date =>
              <Stack key={indexOf(dates, date)} direction={{ xs: "column", sm: "row" }} spacing={{ xs: 0, sm: 2 }}>
                <Typography sx={dataStyle}>Fecha {indexOf(dates, date) + 1}:</Typography>
                <Typography sx={dataStyle}>{formatDate(date)}</Typography>
              </Stack>
            )}
          </Stack>
        }
        <Typography sx={titlesStyle}>Predio</Typography>
        <Typography sx={dataStyle}>{location}</Typography>
        <Typography sx={titlesStyle}>Sectores</Typography>
        {!thereIsOneSectorAtLeast && <Typography sx={dataStyle}>Ninguno</Typography>}
        {thereIsOneSectorAtLeast &&
          <Stack>
            {sectors.map(sector => <Typography key={indexOf(sectors, sector)} sx={dataStyle}>{sector}</Typography>)}
          </Stack>
        }
      </Stack>
      <Tooltip
        title={!allowCreateOrEdit ? "¡Te falta completar datos!" : ""}
        placement="top"
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "#000000",
              color: "white",
              fontSize: "14px",
              borderRadius: "4px",
              p: 1,
            },
          },
          arrow: {
            sx: {
              color: "#000000",
            },
          },
        }}
        arrow
      ><Stack alignSelf="center">
          <Button
            size="large"
            onClick={() => handleSubmit(formData)}
            disabled={!allowCreateOrEdit}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: contrastGreen,
              color: "whitesmoke",
              alignSelf: "center",
              "&.Mui-disabled": {
                backgroundColor: "GrayText"
              },
              width: "120px",
            }}
          >
            <Typography variant="h2">
              {eventId ? "Confirmar" : "Crear"}
            </Typography>
          </Button>
        </Stack>
      </Tooltip>
    </Stack>
  )
}