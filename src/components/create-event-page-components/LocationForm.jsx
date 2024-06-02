import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import validator from "validator";
import { customMuiTheme } from "../../config/customMuiTheme";
import { ArrowBackOutlined, CheckCircleOutlineOutlined } from "@mui/icons-material";


export default function LocationForm({
  fakeFetchedLocations,
  location,
  setLocation,
  showForm,
  setShowForm,
  setDisplayChangeButton,
}) {
  const { contrastGreen } = customMuiTheme.colors;
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
  const numberError =
    validator.isEmpty(number) || !validator.isNumeric(number) || number < 1;

  const locationObject = {
    name: name,
    address: {
      street: street,
      number: Number(number),
    },
    already_exists: false,
  };

  const isValidLocation = (newLocation) => {
    const isFetched = fakeFetchedLocations.some(
      (fetchedLocation) => fetchedLocation.name === newLocation.name
    );
    const isSelected = location.name === newLocation.name;
    return !(isFetched || isSelected);
  };
  const addLocation = (newLocation) => {
    if (isValidLocation(newLocation)) {
      setLocation(newLocation); //Notificar
      setShowForm(false);
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
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button
          size="medium"
          variant="outlined"
          onClick={() => setShowForm(!showForm)}
          sx={{
            width: 115,
            display: "block",
          }}
        >
          <Stack
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
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
            borderColor: contrastGreen,
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
            <Typography variant="info" color={contrastGreen}>Agregar</Typography>
            <CheckCircleOutlineOutlined />
          </Stack>
        </Button>
      </Stack>
    </Stack>
  );
}