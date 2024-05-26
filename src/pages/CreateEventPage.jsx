import React, { useState } from "react";
import Container from "@mui/material/Container";
import { AutocompleteElement, SliderElement, SwitchElement, TextFieldElement, useForm } from "react-hook-form-mui";
import { Backdrop, Button, Fade, FormControlLabel, FormGroup, Input, Modal, Slider, Stack, Switch, TextField, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const { contrastGreen, oceanicBlue, deepOceanicBlue } = customMuiTheme.colors;
const modalStyle = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundImage: `linear-gradient(to bottom, ${oceanicBlue}, ${deepOceanicBlue})`,
  borderRadius: 5,
  p: { xs: 2, sm: 4 },
  minWidth: 230
};

let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let isMobile = vw <= 600

function AddLocationModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fakeFetchedLocations = [
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
  function getLocationOptions() {
    const options = []
    for (let i = 0; i < fakeFetchedLocations.length; i++) {
      const location = fakeFetchedLocations[i]
      options.push(
        { id: location._id, label: location.name }
      )
    }
    return options
  }
  const [locationExists, setLocationExists] = useState(true)

  const { control, handleLocationSubmit } = useForm({
    defaultValues: {
      name: '',
      address: {
        street: '',
        number: 0,
        city: '',
        country: ''
      },
      gps: {
        lat: 0,
        long: 0
      }
    }
  })
  return (
    <Stack>
      <Button
        size="large"
        variant="outlined"
        onClick={handleOpen}
        sx={{
          px: 2,
          display: 'block',
          alignSelf: 'flex-end'
        }}>
        <Typography variant="info" >Seleccionar predio</Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <form onSubmit={handleLocationSubmit} >
            <Stack sx={modalStyle} spacing={3}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  color: contrastGreen,
                  alignSelf: { xs: 'center', sm: "flex-start" },
                  textAlign: 'center'
                }}
              >
                Seleccionar predio
              </Typography>
              <AutocompleteElement
                name="name"
                label="Seleccionar"
                control={control}
                options={getLocationOptions()}
              />
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  alignSelf: 'center',
                  textAlign: 'center'
                }}
              >
                o...
              </Typography>
              {locationExists &&
                <AddButtonForModal handleClick={() => setLocationExists(false)} />}
              {!locationExists &&
                <Stack spacing={2}>
                  <TextFieldElement
                    name="name"
                    label='Nombre'
                    control={control}
                  />
                  <TextFieldElement
                    name="address.street"
                    label='Calle'
                    control={control}
                  />
                  <TextFieldElement
                    name="address.number"
                    label='Número'
                    control={control}
                  />
                  <Button
                    size="medium"
                    variant="outlined"
                    onClick={() => setLocationExists(true)}
                    sx={{
                      px: 2,
                      display: 'block',
                      alignSelf: 'center'
                    }}>
                    <Stack
                      spacing={1}
                      direction='row'
                      justifyContent='center'
                    >
                      <Typography variant="info">Cancelar</Typography>
                    </Stack>
                  </Button>
                </Stack>
              }
              <ReadyButtonForModal handleClick={handleClose} />
            </Stack>
          </form>
        </Fade>
      </Modal>
    </Stack>
  );
}

function AddDatesModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dates, setDates] = useState([1]);
  const addDateTimePicker = () => {
    const value = dates.length + 1
    setDates(current => [...current, value])
  }
  const deleteDateTimePicker = (datePicker) => {
    setDates(current => current.filter(date => date != datePicker))
  }

  const { control, handleSubmit } = useForm({
    defaultValues: {
      dates: [],
    }
  })
  return (
    <Stack>
      <Button
        size="large"
        variant="outlined"
        onClick={handleOpen}
        sx={{
          px: 2,
          display: 'block',
          alignSelf: 'flex-end'
        }}>
        <Typography
          variant="info"
        >
          Agregar fechas
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <form onSubmit={handleSubmit} >
            <Stack sx={modalStyle} spacing={3}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  color: contrastGreen,
                  alignSelf: { xs: 'center', sm: "flex-start" },
                  textAlign: 'center'
                }}
              >
                Agregar fechas
              </Typography>
              <Stack spacing={2}>
                <DateTimePickers
                  dates={dates}
                  deleteDateTimePicker={deleteDateTimePicker}
                />
                <AddButtonForModal handleClick={addDateTimePicker} />
              </Stack>
              <ReadyButtonForModal handleClick={handleClose} />
            </Stack>
          </form>
        </Fade>
      </Modal>
    </Stack>
  );
}
function DateTimePickers({ dates, deleteDateTimePicker }) {
  return dates.map(date => (
    <Stack
      key={date}
      direction='row'
      spacing={{ sm: 1 }}
      justifyContent='space-between'
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {!isMobile &&
          <DateTimePicker
            label="Seleccione fecha y hora"
            ampm={false}
            disablePast
          />
        }
        {isMobile &&
          <MobileDateTimePicker
            label='Seleccione fecha y hora'
            ampm={false}
            disablePast
          />}
      </LocalizationProvider>
      <Button onClick={() => deleteDateTimePicker(date)}>
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </Button>

    </Stack>
  ))
}

function AddSectorsModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sectors, setSectors] = useState(1);
  const addSectorForm = () => {
    setSectors(sectors + 1)
    console.log(sectors)
  }
  const deleteSectorForm = () => {
    setSectors(sectors - 1)
  }
  const forms = [...Array(sectors).keys()]

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      numbered: false,
      seats: [
        {
          row: '',
          seat: 0,
          available: true
        }
      ],
      capacity: 0
    }
  })
  return (
    <Stack>
      <Button
        size="large"
        variant="outlined"
        onClick={handleOpen}
        sx={{
          px: 2,
          display: 'block',
          alignSelf: 'flex-end'
        }}>
        <Typography
          variant="info"
        >
          Agregar sectores
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <form onSubmit={handleSubmit} >
            <Stack sx={modalStyle} spacing={3}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  color: contrastGreen,
                  alignSelf: { xs: 'center', sm: "flex-start" },
                  textAlign: 'center'
                }}
              >
                Agregar sectores
              </Typography>
              {forms.map(form => (
                <SectorForm key={form} deleteSectorForm={deleteSectorForm} />
              ))}
              <AddButtonForModal handleClick={addSectorForm} />
              <ReadyButtonForModal handleClick={handleClose} />
            </Stack>
          </form>
        </Fade>
      </Modal>
    </Stack>
  );
}
function SectorForm({ deleteSectorForm }) {
  const [isNumbered, setIsNumbered] = useState(false)
  const [rows, setRows] = useState(0)
  const handleRowSliderChange = (e, newValue) => {
    setRows(newValue)
  }
  const handleRowInputChange = (e) => {
    setRows(e.target.value === '' ? 0 : Number(e.target.value))
  }
  const [seats, setSeats] = useState(0)
  const handleSeatSliderChange = (e, newValue) => {
    setSeats(newValue)
  }
  const handleSeatInputChange = (e) => {
    setSeats(e.target.value === '' ? 0 : Number(e.target.value))
  }
  
  return (
    <Stack spacing={3}>
      <TextField label='Nombre' />
      { !isNumbered &&
        <TextField label='Capacidad' />
      }
      <FormGroup>
        <FormControlLabel
          control={<Switch size="small" onChange={() => setIsNumbered(!isNumbered)} />}
          label={`${isNumbered ? 'Numerado' : 'No numerado'}`}
          labelPlacement="start"
          sx={{ alignSelf: 'end', mr: 0.01 }}
        />
      </FormGroup>
      {isNumbered &&
        <Stack spacing={3}>
          <Stack>
            <Typography id="rows" gutterBottom>
            Cant. de filas
          </Typography>
          <Stack direction='row' spacing={3}>
            <Slider
              value={typeof rows === 'number' ? rows : 0}
              onChange={handleRowSliderChange}
              aria-labelledby='rows'
              valueLabelDisplay="auto"
              step={20}
              marks
              min={0}
              max={500}
            />
            <Input
              value={rows}
              onChange={handleRowInputChange}
              size="small"
              inputProps={{
                step: 1,
                min: 0,
                max: 500,
                type: 'number',
                'aria-labelledby': 'rows',
              }}
              sx={{ width: '30%', alignSelf: 'flex-start' }}
            />
          </Stack>
          </Stack>
          <Stack>
            <Typography id="seats" gutterBottom>
            Cant. de asientos por fila
          </Typography>
          <Stack direction='row' spacing={3}>
            <Slider
              value={typeof seats === 'number' ? seats : 0}
              onChange={handleSeatSliderChange}
              aria-labelledby='seats'
              valueLabelDisplay="auto"
              step={20}
              marks
              min={0}
              max={500}
            />
            <Input
              value={seats}
              onChange={handleSeatInputChange}
              size="small"
              inputProps={{
                step: 1,
                min: 0,
                max: 500,
                type: 'number',
                'aria-labelledby': 'seats',
              }}
              sx={{ width: '30%', alignSelf: 'flex-start' }}
            />
          </Stack>
          </Stack>
          <Typography>
            Capacidad: {rows*seats}
          </Typography>
        </Stack>
      }
      <Stack direction='row' justifyContent='space-between'>
        <Button onClick={deleteSectorForm}>
          <DeleteOutlineIcon></DeleteOutlineIcon>
        </Button>
        <Button onClick={deleteSectorForm}>
          <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
        </Button>
      </Stack>
    </Stack>
  )
}

function ReadyButtonForModal({ handleClick }) {
  return (
    <Button
      size="medium"
      variant="contained"
      onClick={handleClick}
      sx={{
        px: 2,
        display: 'block',
        alignSelf: 'flex-end',
        backgroundColor: contrastGreen,
        color: 'whitesmoke'
      }}>
      <Stack
        spacing={1}
        direction='row'
        justifyContent='center'
      >
        <Typography variant="info">Listo</Typography>
        <CheckCircleOutlineIcon />
      </Stack>
    </Button>
  )
}
function AddButtonForModal({ handleClick }) {
  return (
    <Button
      size="medium"
      variant="outlined"
      onClick={handleClick}
      sx={{
        px: 2,
        display: 'block',
        alignSelf: 'center'
      }}>
      <Stack
        spacing={1}
        direction='row'
        justifyContent='center'
      >
        <Typography variant="info">Agregar</Typography>
        <AddCircleOutlineIcon />
      </Stack>
    </Button>
  )
}

export function CreateEventPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      artist: '',
      image: '',
      location_name: '',
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
          {/*Name, artist, image*/}
          <Stack spacing={2}>
            <TextFieldElement
              name={'name'}
              label={'Nombre del evento'}
              control={control}
              required
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
            />
          </Stack>
          {/*Others*/}
          <Stack spacing={2} >
            <AddLocationModal />
            <AddDatesModal />
            <AddSectorsModal />
          </Stack>
          <Button
            size="large"
            variant="contained"
            type={'submit'}
            sx={{
              px: 3,
              display: 'block',
              backgroundColor: contrastGreen,
              color: 'whitesmoke'
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