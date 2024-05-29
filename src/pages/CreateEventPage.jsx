import React, { useState } from "react";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import {
  AutocompleteElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import {
  Autocomplete,
  Backdrop,
  Button,
  Fade,
  FormControlLabel,
  FormGroup,
  Input,
  Modal,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import {
  DateTimePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import validator from "validator";
import { HighlightOff } from "@mui/icons-material";

const { contrastGreen, oceanicBlue, deepOceanicBlue } = customMuiTheme.colors;
const modalStyle = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundImage: `linear-gradient(to bottom, ${oceanicBlue}, ${deepOceanicBlue})`,
  borderRadius: 5,
  p: { xs: 2, sm: 4 },
  minWidth: 230,
};

let vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);
let isMobile = vw <= 600;

function LocationSection({ location, setLocation }) {
  const [showForm, setShowForm] = useState(false)
  const fakeFetchedLocations = [
    {
      _id: 1,
      name: "River Plate",
      address: {
        street: "Av. Pres. Figueroa Alcorta",
        number: 7597
      }
    },
    {
      _id: 2,
      name: "Movistar Arena",
      address: {
        street: "Humboldt",
        number: 450
      }
    },
  ];
  const getLocationOptions = () => {
    const options = [];
    for (let i = 0; i < fakeFetchedLocations.length; i++) {
      const location = fakeFetchedLocations[i];
      options.push({ id: location._id, label: location.name });
    }
    return options;
  }
  const getLocationById = (id) => {
    return fakeFetchedLocations.filter(location => location._id === id)[0]
  }
  const handleLocationChange = (e, value) => {
    if (value !== null) {
      const locationSelected = getLocationById(value.id)
      setLocation({
        name: locationSelected.name,
        address: {
          street: locationSelected.address.street,
          number: locationSelected.address.number,
        },
        already_exists: true
      })
    } else {
      setLocation({})
    }

  }
  const [displayChangeButton, setDisplayChangeButton] = useState(location.name && true)

  return (
    <Stack spacing={3} sx={{ px: 3 }}>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ alignSelf: { xs: 'center', sm: 'flex-start' } }}
      >
        Predio
      </Typography>
      <Typography>Predio: {location.name ? location.name : "Ninguno"}</Typography>
      {displayChangeButton && (
        <Button
          size="medium"
          variant="outlined"
          onClick={() => setDisplayChangeButton(false)}
          sx={{
            width: 115,
            display: "block",
            alignSelf: "center"
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
            <Typography variant="info">Cambiar</Typography>
          </Stack>
        </Button>
      )}
      {!showForm && !displayChangeButton && (
        <Stack spacing={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={getLocationOptions()}
            onChange={handleLocationChange}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Seleccionar" />}
          />
          <Typography variant="info" sx={{ textAlign: "center" }}>¿No encontrás el lugar?</Typography>
          <Button
            size="medium"
            variant="outlined"
            onClick={() => setShowForm(!showForm)}
            sx={{
              px: 2,
              display: "block",
              alignSelf: "center"
            }}
          >
            <Stack spacing={1} direction="row" justifyContent="center">
              <Typography variant="info">Agregar nuevo</Typography>
              <AddCircleOutlineIcon />
            </Stack>
          </Button>
        </Stack>
      )}
      {showForm && !displayChangeButton && (
        <Stack spacing={2}>
          <LocationForm
            fakeFetchedLocations={fakeFetchedLocations}
            location={location}
            setLocation={setLocation}
            showForm={showForm}
            setShowForm={setShowForm}
            setDisplayChangeButton={setDisplayChangeButton}
          />
        </Stack>

      )}
    </Stack>
  );
}
function LocationForm({
  fakeFetchedLocations,
  location,
  setLocation,
  showForm,
  setShowForm,
  setDisplayChangeButton
  }) {
  const [name, setName] = useState("Nuevo predio");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const nameError = validator.isEmpty(name);

  const [street, setStreet] = useState("Calle del predio");
  const handleStreetChange = (e) => {
    setStreet(e.target.value);
  };
  const streetError = validator.isEmpty(street);

  const [number, setNumber] = useState("1234");
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };
  const numberError = validator.isEmpty(number)
    || !validator.isNumeric(number)
    || number < 1

  const locationObject = {
    name: name,
    address: {
      street: street,
      number: Number(number),
    },
    already_exists: false
  }

  const isValidLocation = (newLocation) => {
    const isFetched = fakeFetchedLocations.some((fetchedLocation) => fetchedLocation.name === newLocation.name);
    const isSelected = location.name === newLocation.name
    return !(isFetched || isSelected)
  };
  const addLocation = (newLocation) => {
    if (isValidLocation(newLocation)) {
      setLocation(newLocation);      //Notificar
      setShowForm(false)
      setDisplayChangeButton(true);
    } else {
      alert("Ya existe ese predio"); //Convertir en notificación
    }
  };

  return (
    <Stack spacing={3}>
      <TextField
        label="Nombre"
        value={name}
        onChange={handleNameChange}
        error={nameError}
        helperText={nameError ? "Ingrese el nombre del predio" : ""}
        required
      />
      <TextField
        label="Dirección: Calle"
        value={street}
        onChange={handleStreetChange}
        error={streetError}
        helperText={streetError ? "Ingrese la calle" : ""}
        required
      />
      <TextField
        label="Dirección: Número"
        value={number}
        onChange={handleNumberChange}
        error={numberError}
        helperText={numberError ? "El número de calle debe ser mayor a 0" : ""}
        required
      />
      <Stack direction="row" spacing={2}>
        <Button
          size="medium"
          variant="outlined"
          onClick={() => setShowForm(!showForm)}
          sx={{
            width: 115,
            display: "block"
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
            <HighlightOff />
            <Typography variant="info">Cancelar</Typography>
          </Stack>
        </Button>
        <Button
          size="medium"
          variant="outlined"
          onClick={() => addLocation(locationObject)}
          sx={{
            width: 115,
            display: "block",
            color: contrastGreen,
            borderColor: contrastGreen
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
            <Typography variant="info" color={contrastGreen}>Crear</Typography>
            <CheckCircleOutlineIcon />
          </Stack>
        </Button>
      </Stack>
    </Stack>
  )
}

function AddDatesModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [dates, setDates] = useState([1]);
  const addDateTimePicker = () => {
    const value = dates.length + 1;
    setDates((current) => [...current, value]);
  };
  const deleteDateTimePicker = (datePicker) => {
    setDates((current) => current.filter((date) => date != datePicker));
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      dates: [],
    },
  });
  return (
    <Stack>
      <Button
        size="large"
        variant="outlined"
        onClick={handleOpen}
        sx={{
          px: 2,
          display: "block",
          alignSelf: "flex-end",
        }}
      >
        <Typography variant="info">Agregar fechas</Typography>
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
          <form onSubmit={handleSubmit}>
            <Stack sx={modalStyle} spacing={3}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  color: contrastGreen,
                  alignSelf: { xs: "center", sm: "flex-start" },
                  textAlign: "center",
                }}
              >
                Agregar fechas
              </Typography>
              <Stack spacing={2}>
                <DateTimePickers
                  dates={dates}
                  deleteDateTimePicker={deleteDateTimePicker}
                />
                <AddButton handleClick={addDateTimePicker} />
              </Stack>
              <ReadyButton handleClick={handleClose} />
            </Stack>
          </form>
        </Fade>
      </Modal>
    </Stack>
  );
}
function DateTimePickers({ dates, deleteDateTimePicker }) {
  return dates.map((date) => (
    <Stack
      key={date}
      direction="row"
      spacing={{ sm: 1 }}
      justifyContent="space-between"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {!isMobile && (
          <DateTimePicker
            label="Seleccione fecha y hora"
            ampm={false}
            disablePast
          />
        )}
        {isMobile && (
          <MobileDateTimePicker
            label="Seleccione fecha y hora"
            ampm={false}
            disablePast
          />
        )}
      </LocalizationProvider>
      <Button onClick={() => deleteDateTimePicker(date)}>
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </Button>
    </Stack>
  ));
}

function SectorsSection({ sectors, setSectors }) {
  const [showForm, setShowForm] = useState(false)

  return (
    <Stack spacing={3} sx={{ px: 3 }}>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ alignSelf: { xs: 'center', sm: 'flex-start' } }}
      >
        Sectores
      </Typography>
      <SectorsDisplay sectors={sectors} setSectors={setSectors} />
      {!showForm && (
        <Button
          size="medium"
          variant="outlined"
          onClick={() => setShowForm(!showForm)}
          sx={{
            px: 2,
            display: "block",
            alignSelf: "center"
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center">
            <Typography variant="info">Agregar nuevo</Typography>
            <AddCircleOutlineIcon />
          </Stack>
        </Button>
      )}
      {showForm && (
        <SectorForm sectors={sectors} setSectors={setSectors} showForm={showForm} setShowForm={setShowForm} />
      )}
    </Stack>
  );
}
function SectorsDisplay({ sectors, setSectors }) {
  const deleteSector = (sector) => {
    setSectors((current) =>
      current.filter((storedSector) => storedSector !== sector)
    );
  };
  return (
    <Stack>
      <Typography>Sectores: {sectors.length > 0 ? "" : "Ninguno"}</Typography>
      {sectors.map((sector) => (
        <Stack
          key={sector.name}
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography sx={{ alignSelf: "center" }}>
            {`${sector.name}, capacidad: ${sector.rows * sector.seats}`}
          </Typography>
          <Button onClick={() => deleteSector(sector)}>
            <DeleteOutlineIcon />
          </Button>
        </Stack>
      ))}
    </Stack>
  );
}
function SectorForm({ sectors, setSectors, showForm, setShowForm }) {
  const [isNumbered, setIsNumbered] = useState(false);
  const [rows, setRows] = useState(1);
  const handleRowSliderChange = (e, newValue) => {
    setRows(newValue);
  };
  const handleRowInputChange = (e) => {
    setRows(e.target.value === "" ? 0 : Number(e.target.value));
  };
  const [seats, setSeats] = useState(1);
  const handleSeatSliderChange = (e, newValue) => {
    setSeats(newValue);
  };
  const handleSeatInputChange = (e) => {
    setSeats(e.target.value === "" ? 0 : Number(e.target.value));
  };

  const [capacity, setCapacity] = useState("1");

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };
  const capacityError =
    validator.isEmpty(capacity) ||
    !validator.isNumeric(capacity, { no_symbols: true }) ||
    capacity < 1;
  const getCapacityHelperText = capacityError
    ? "La capacidad debe ser un número mayor a 0"
    : "";

  const [name, setName] = useState("Nuevo sector");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const nameError = validator.isEmpty(name);

  const sector = {
    name: name,
    numbered: isNumbered,
    rows: rows,
    seats: isNumbered ? seats : Number(capacity)
  };
  const isValidSector = (sector) => {
    return !sectors.some((storedSector) => storedSector.name === sector.name);
  };
  const addSector = (newSector) => {
    isValidSector(newSector)
      ? setSectors([...sectors, newSector])
      : alert("Ya existe un sector con ese nombre"); //Convertir en notificación
  };

  return (
    <Stack spacing={3}>
      <TextField
        label="Nombre"
        value={name}
        onChange={handleNameChange}
        error={nameError}
        required
      />
      {!isNumbered && (
        <TextField
          label="Capacidad"
          value={capacity}
          onChange={handleCapacityChange}
          helperText={getCapacityHelperText}
          error={capacityError}
          required
        />
      )}
      <FormGroup>
        <FormControlLabel
          control={
            <Switch size="small" onChange={() => setIsNumbered(!isNumbered)} />
          }
          label={`${isNumbered ? "Numerado" : "No numerado"}`}
          labelPlacement="start"
          sx={{ alignSelf: "end", mr: 0.01 }}
        />
      </FormGroup>
      {isNumbered && (
        <Stack spacing={3}>
          <Stack>
            <Typography id="rows" gutterBottom>
              Cant. de filas
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="center">
              <Slider
                value={typeof rows === "number" ? rows : 1}
                onChange={handleRowSliderChange}
                aria-labelledby="rows"
                valueLabelDisplay="auto"
                step={20}
                marks
                min={0}
                max={500}
                sx={{ width: "55%" }}
              />
              <Input
                value={rows}
                onChange={handleRowInputChange}
                size="small"
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 500,
                  type: "number",
                  "aria-labelledby": "rows",
                }}
                sx={{ width: "25%", alignSelf: "flex-start" }}
              />
            </Stack>
          </Stack>
          <Stack>
            <Typography id="seats" gutterBottom>
              Cant. de asientos por fila
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="center">
              <Slider
                value={typeof seats === "number" ? seats : 1}
                onChange={handleSeatSliderChange}
                aria-labelledby="seats"
                valueLabelDisplay="auto"
                step={20}
                marks
                min={0}
                max={500}
                sx={{ width: "55%" }}
              />
              <Input
                value={seats}
                onChange={handleSeatInputChange}
                size="small"
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 500,
                  type: "number",
                  "aria-labelledby": "seats",
                }}
                sx={{ width: "25%", alignSelf: "flex-start" }}
              />
            </Stack>
          </Stack>
          <Typography>Capacidad: {rows * seats}</Typography>
        </Stack>
      )}
      <Stack spacing={2} justifyContent="flex-end" alignItems="flex-end">
        <Button
          size="medium"
          variant="outlined"
          onClick={() => addSector(sector)}
          sx={{
            width: 115,
            display: "block"
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center">
            <Typography variant="info">Agregar</Typography>
            <CheckCircleOutlineIcon />
          </Stack>
        </Button>
        <Button
          size="medium"
          variant="contained"
          onClick={() => setShowForm(!showForm)}
          sx={{
            width: 115,
            display: "block",
            backgroundColor: contrastGreen,
            color: "whitesmoke",
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center">
            <Typography variant="info">Listo</Typography>
            <CheckCircleOutlineIcon />
          </Stack>
        </Button>
      </Stack>
    </Stack>
  );
}

function ReadyButton({ handleClick }) {
  return (
    <Button
      size="medium"
      variant="contained"
      onClick={handleClick}
      sx={{
        width: 115,
        display: "block",
        backgroundColor: contrastGreen,
        color: "whitesmoke",
      }}
    >
      <Stack spacing={1} direction="row" justifyContent="center">
        <Typography variant="info">Listo</Typography>
        <CheckCircleOutlineIcon />
      </Stack>
    </Button>
  );
}
function AddButton({ text, handleClick, icon }) {
  return (
    <Button
      size="medium"
      variant="outlined"
      onClick={handleClick}
      sx={{
        width: 115,
        display: "block"
      }}
    >
      <Stack spacing={1} direction="row" justifyContent="center">
        <Typography variant="info">{text}</Typography>
        {icon}
      </Stack>
    </Button>
  );
}

export function CreateEventPage() {
  const [sectors, setSectors] = useState([]);
  const [dates, setDates] = useState([]);
  const [location, setLocation] = useState({});
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      artist: "",
      image: "",
      location: location,
      event_dates: dates,
      sectors: sectors,
      event_state: false,
    },
  });

  useEffect(() => {
    setValue("sectors", sectors);
  }, [sectors, setValue]);
  useEffect(() => {
    setValue("location", location);
  }, [location, setValue]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="md" sx={{ mb: 5 }}>
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={5}>
          {/* Main data */}
          <Stack spacing={2}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{ alignSelf: { xs: 'center', sm: 'flex-start' } }}
            >
              Datos principales
            </Typography>
            <TextFieldElement
              name={"name"}
              label={"Nombre del evento"}
              control={control}
              required
            />
            <TextFieldElement
              name={"artist"}
              label={"Artista"}
              control={control}
              required
            />
            <TextFieldElement
              name={"image"}
              label={"Imagen"}
              control={control}
              required
            />
          </Stack>
          {/* Others */}
          <LocationSection location={location} setLocation={setLocation} />
          <SectorsSection sectors={sectors} setSectors={setSectors} />
          <Button
            size="large"
            variant="contained"
            type={"submit"}
            sx={{
              display: "block",
              backgroundColor: contrastGreen,
              color: "whitesmoke",
              alignSelf: { xs: "center", sm: "flex-end" }
            }}
          >
            <Typography variant="h2">Crear</Typography>
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
