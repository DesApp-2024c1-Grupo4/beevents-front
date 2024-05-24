import React, { useState } from "react";
import Container from "@mui/material/Container";
import { AutocompleteElement, TextFieldElement, useForm } from "react-hook-form-mui";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function DateTimePickers({ dates, deleteDateTimePicker }) {
  return dates.map(date => (
    <Stack
      key={date}
      direction='row'
      spacing={1}
      justifyContent='space-between'
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Selecciona la fecha"
          ampm={false}
          disablePast
          sx={{ width: '80%' }}
        />
      </LocalizationProvider>
      <Button onClick={() => deleteDateTimePicker(date)}>
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </Button>

    </Stack>
  ))
}

function LocationForm({ cancel }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      artist: '',
      image: '',
      location_id: '',
      event_dates: [],
      event_state: false
    },
  })

  return (
    <Stack spacing={2}>
      <TextFieldElement
        name="name"
        label='Nombre del lugar'
        control={control}
      />
      <TextFieldElement
        name="artist"
        label='Dirección'
        control={control}
      />
      <Button onClick={cancel}> Cancelar </Button>
    </Stack>
  )
}


export function CreateEventPage() {
  const { contrastGreen } = customMuiTheme.colors;

  const [dates, setDates] = useState([]);
  const addDateTimePicker = () => {
    const value = dates.length + 1
    setDates(current => [...current, value])
  }
  const deleteDateTimePicker = (datePicker) => {
    setDates(current => current.filter(date => date != datePicker))
  }

  const fetchedLocations = [
    {
      _id: 1,
      name: 'River Plate',
      address: {
        street: 'Av. Pres. Figueroa Alcorta',
        number: 7597,
        city: 'Buenos Aires',
        country: 'Argentina'
      },
      gps: {
        lat: -34.546388,
        long: -58.449993
      }
    },
    {
      _id: 2,
      name: 'Movistar Arena',
      address: {
        street: 'Humboldt',
        number: 450,
        city: 'CABA',
        country: 'Argentina'
      },
      gps: {
        lat: -34.594632,
        long: -58.447707
      }
    },
  ]
  const [locationForm, setLocationForm] = useState(false);
  const cancel = () => {
    setLocationForm(false)
  }
  function getLocationOptions() {
    const options = []
    for (let i = 0; i < fetchedLocations.length; i++) {
      const location = fetchedLocations[i]
      options.push(
        { id: location._id, label: location.name }
      )
    }
    return options
  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      artist: '',
      image: '',
      location_id: '',
      event_dates: [],
      event_state: false
    },
  })

  return (
    <Container maxWidth="md">
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
        Crear un evento nuevo
      </Typography>
      <form onSubmit={handleSubmit((data) => console.log(data))} noValidate>
        <Stack spacing={5}>
          <Stack spacing={2}>
            <TextFieldElement
              name={'name'}
              label={'Nombre del evento'}
              control={control}
              required
              fullWidth
            />
            <TextFieldElement
              name={'artist'}
              label={'Artista'}
              control={control}
              required
            />
            <TextFieldElement
              name={'image'}
              label={'Imagen'}
              control={control}
              required
              fullWidth
            />
          </Stack>
          <Stack spacing={2}>
            <AutocompleteElement
              name="location_id"
              label="Lugar"
              control={control}
              options={getLocationOptions()}
            />
            {locationForm && <LocationForm cancel={cancel} />}
            {!locationForm &&
              <Button
                size="large"
                variant="outlined"
                onClick={() => setLocationForm(true)}
                sx={{
                  px: 3,
                  display: 'block',
                  alignSelf: 'flex-end'
                }}
              >
                <Typography
                  variant="h2"
                >
                  Agregar lugar
                </Typography>
              </Button>
            }
          </Stack>
          <Stack spacing={2}>
            <DateTimePickers
              dates={dates}
              deleteDateTimePicker={deleteDateTimePicker}
            />
            <Button
              size="large"
              variant="outlined"
              onClick={() => addDateTimePicker()}
              sx={{
                px: 3,
                display: 'block',
                alignSelf: 'flex-end'
              }}>
              <Typography
                variant="h2"
              >
                Agregar fecha
              </Typography>
            </Button>
          </Stack>
          <Button
            size="large"
            variant="outlined"
            color="success"
            type={'submit'}
            sx={{
              px: 3,
              display: 'block'
            }}>
            <Typography
              variant="h2"
            >
              Crear
            </Typography>
          </Button>
        </Stack>
      </form>
    </Container>
  );
}


/**
 * <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            justifyContent="center"
            alignItems="center"
            sx={{ p: 2 }}
          >
 */