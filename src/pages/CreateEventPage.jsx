import {
  React,
  useState,
  useEffect
} from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import validator from "validator";
import { customMuiTheme } from "../config/customMuiTheme";
import {
  Autocomplete,
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Input,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { 
  AddCircleOutlineOutlined,
  ArrowBackOutlined,
  CheckCircleOutlineOutlined,
  DeleteOutlineOutlined
} from "@mui/icons-material";
import {
  DateTimePicker,
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import {
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";

const { contrastGreen } = customMuiTheme.colors;

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
              <AddCircleOutlineOutlined />
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
            <ArrowBackOutlined />
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
            <CheckCircleOutlineOutlined />
          </Stack>
        </Button>
      </Stack>
    </Stack>
  )
}

function DatesSection({ dates, setDates }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Stack spacing={3} sx={{ px: 3 }}>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ alignSelf: { xs: 'center', sm: 'flex-start' } }}
      >
        Fechas
      </Typography>
      <DatesDisplay dates={dates} setDates={setDates} />
      {!showPicker && (
        <Button
          size="medium"
          variant="outlined"
          onClick={() => setShowPicker(!showPicker)}
          sx={{
            px: 2,
            display: "block",
            alignSelf: "center"
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center">
            <Typography variant="info">Agregar nueva</Typography>
            <AddCircleOutlineOutlined />
          </Stack>
        </Button>
      )}
      {showPicker && (
        <ResponsiveDateTimePicker dates={dates} setDates={setDates} showPicker={showPicker} setShowPicker={setShowPicker} />
      )}
    </Stack>
  )
}
function DatesDisplay({ dates, setDates }) {
  const deleteDate = (date) => {
    setDates((current) =>
      current.filter((storedDate) => storedDate !== date)
    );
  };
  return (
    <Stack spacing={1}>
      <Typography>Fechas: {dates.length > 0 ? "" : "Ninguna"}</Typography>
      {dates.map((date) => (
        <Stack
          key={date}
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <Stack>
            <Typography>
              {`Fecha ${dates.indexOf(date) + 1}:`}
            </Typography>
            <Typography sx={{ textAlign: "center" }}>
              {`${date}`}
            </Typography>
          </Stack>
          <Button onClick={() => deleteDate(date)}>
            <DeleteOutlineOutlined />
          </Button>
        </Stack>
      ))}
    </Stack>
  );
}
function ResponsiveDateTimePicker({ dates, setDates, showPicker, setShowPicker }) {
  const [date, setDate] = useState("")
  const handleDateChange = (value) => {
    const date = new Date(value).toLocaleString();
    setDate(date);
  }
  const isValidDate = (aDate) => {
    const isEmpty = validator.isEmpty(aDate)
    const alreadyExists = dates.includes(aDate)
    return !(isEmpty || alreadyExists)
  }
  const addDate = (stringDate) => {
    if (isValidDate(stringDate)) {
      setDates([...dates, stringDate]);
    } else {
      alert("Introduce una fecha válida");
    }
  }
  let vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  let isMobile = vw <= 600;
  return (
    <Stack
      spacing={2}
      justifyContent="space-between"
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {!isMobile && (
          <DateTimePicker
            label="Seleccione fecha y hora"
            onChange={handleDateChange}
            ampm={false}
            disablePast
          />
        )}
        {isMobile && (
          <MobileDateTimePicker
            label="Seleccione fecha y hora"
            onChange={handleDateChange}
            ampm={false}
            disablePast
          />
        )}
      </LocalizationProvider>
      <Stack spacing={2} justifyContent="flex-end" alignItems="flex-end">
        <Button
          size="medium"
          variant="outlined"
          onClick={() => addDate(date)}
          sx={{
            width: 115,
            display: "block"
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center">
            <Typography variant="info">Agregar</Typography>
            <CheckCircleOutlineOutlined />
          </Stack>
        </Button>
        <Button
          size="medium"
          variant="contained"
          onClick={() => setShowPicker(!showPicker)}
          sx={{
            width: 115,
            display: "block",
            backgroundColor: contrastGreen,
            color: "whitesmoke",
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center">
            <Typography variant="info">Listo</Typography>
            <CheckCircleOutlineOutlined />
          </Stack>
        </Button>
      </Stack>
    </Stack>
  );
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
            <AddCircleOutlineOutlined />
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
            <DeleteOutlineOutlined />
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
            <CheckCircleOutlineOutlined />
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
            <CheckCircleOutlineOutlined />
          </Stack>
        </Button>
      </Stack>
    </Stack>
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
      dates: dates,
      sectors: sectors
    },
  });

  useEffect(() => {
    setValue("location", location);
  }, [location, setValue]);
  useEffect(() => {
    setValue("dates", dates);
  }, [dates, setValue]);
  useEffect(() => {
    setValue("sectors", sectors);
  }, [sectors, setValue]);
  
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
          <Stack spacing={3} px={3}>
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
          <DatesSection dates={dates} setDates={setDates} />
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
