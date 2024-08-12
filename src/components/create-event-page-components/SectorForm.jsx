import { CheckCircleOutlineOutlined, Close } from "@mui/icons-material";
import { Button, FormControlLabel, FormGroup, Input, Slider, Stack, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import validator from "validator";
import { customMuiTheme } from "../../config/customMuiTheme";

export default function SectorForm({ sectors, setSectors, showForm, setShowForm }) {
  const { contrastGreen } = customMuiTheme.colors;
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
    rowsNumber: isNumbered ? rows : 1,
    seatsNumber: isNumbered ? seats : Number(capacity),
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
          labelPlacement="end"
          sx={{ alignSelf: "start", ml: 0.01 }}
        />
      </FormGroup>
      {isNumbered && (
        <Stack spacing={3}>
          <Stack>
            <Typography id="rows" gutterBottom>
              Cant. de filas
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="space-around">
              <Slider
                value={typeof rows === "number" ? rows : 1}
                onChange={handleRowSliderChange}
                aria-labelledby="rows"
                valueLabelDisplay="auto"
                step={20}
                marks
                min={0}
                max={500}
                sx={{ width: "75%" }}
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
                sx={{ width: "55px", alignSelf: "flex-start" }}
              />
            </Stack>
          </Stack>
          <Stack>
            <Typography id="seats" gutterBottom>
              Cant. de asientos por fila
            </Typography>
            <Stack direction="row" spacing={3} justifyContent="space-around">
              <Slider
                value={typeof seats === "number" ? seats : 1}
                onChange={handleSeatSliderChange}
                aria-labelledby="seats"
                valueLabelDisplay="auto"
                step={20}
                marks
                min={0}
                max={500}
                sx={{ width: "75%" }}
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
                sx={{ width: "55px", alignSelf: "flex-start" }}
              />
            </Stack>
          </Stack>
          <Typography>Capacidad: {rows * seats}</Typography>
        </Stack>
      )}
      <Stack
        spacing={2}
        justifyContent="flex-end"
        alignItems="flex-end"
        direction="row"
      >
        <Button
          size="medium"
          variant="outlined"
          onClick={() => setShowForm(!showForm)}
          sx={{
            width: 115,
            display: "block"
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center">
            <Typography variant="info">Cerrar</Typography>
            <Close />
          </Stack>
        </Button>
        <Button
          size="medium"
          variant="outlined"
          onClick={() => addSector(sector)}
          sx={{
            width: 115,
            display: "block",
            color: contrastGreen,
            borderColor: contrastGreen
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center">
            <Typography variant="info" color={contrastGreen}>Agregar</Typography>
            <CheckCircleOutlineOutlined />
          </Stack>
        </Button>
      </Stack>
    </Stack>
  );
}