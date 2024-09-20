import { CheckCircleOutlineOutlined, Close } from "@mui/icons-material";
import { Box, Button, FormControlLabel, FormGroup, Input, Modal, Slider, Stack, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import validator from "validator";
import { customMuiTheme } from "../../config/customMuiTheme";
import SectorDistributionMap from "./SectorDistributionMap";

export default function SectorForm({ sectors, setSectors, showForm, setShowForm }) {
  const { contrastGreen } = customMuiTheme.colors;
  const [isNumbered, setIsNumbered] = useState(false);
  const [rows, setRows] = useState(1);
  const [seats, setSeats] = useState(1);
  const [capacity, setCapacity] = useState("1");
  const [name, setName] = useState("Nuevo sector");
  const [openNumbered, setOpenNumbered] = useState(false);
  const [openNonNumbered, setOpenNonNumbered] = useState(false);
  const [seatMap, setSeatMap] = useState({ name: name, rows: [] });
  const [reservedSeats, setReservedSeats] = useState([]);
  const [eliminatedSeats, setEliminatedSeats] = useState([]);
  const [reservedPlaces, setReservedPlaces] = useState(1);

  const resetSeatMap = () => {
    const newRows = [];
    for (var i = 0; i < rows; i++) {
      newRows[i] = [];
      for (var j = 0; j < seats; j++) {
        const seat = { _id: [i, j], available: true, reservedBy: "vacio" }
        newRows[i][j] = seat;
      }
    }
    setSeatMap(prevSeatMap => ({
      ...prevSeatMap,
      rows: newRows
    }));
  }
  useEffect(() => {
    resetSeatMap();
  }, [rows, seats])

  useEffect(() => {
    setSeatMap(prevSeatMap => ({
      ...prevSeatMap,
      name: name
    }));
  }, [name])

  const handleRowSliderChange = (e, newValue) => {
    setRows(newValue);
  };

  const handleRowInputChange = (e) => {
    setRows(e.target.value === "" ? 0 : Number(e.target.value));
  };

  const handleSeatSliderChange = (e, newValue) => {
    setSeats(newValue);
  };

  const handleSeatInputChange = (e) => {
    setSeats(e.target.value === "" ? 0 : Number(e.target.value));
  };

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

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const nameError = validator.isEmpty(name);

  const sector = {
    name: name,
    numbered: isNumbered,
    rowsNumber: isNumbered ? rows : 1,
    seatsNumber: isNumbered ? seats : Number(capacity),
    preReserved: reservedSeats,
    eliminated: eliminatedSeats
  };

  const isValidSector = (sector) => {
    return !sectors.some((storedSector) => storedSector.name === sector.name);
  };

  const addSector = (newSector) => {
    if (isValidSector(newSector)) {
      setSectors([...sectors, newSector]);
      setShowForm(!showForm);
    } else {
      alert("Ya existe un sector con ese nombre"); //Convertir en notificación
    }
    console.log(newSector)
  };

  const handleOpen = () => {
    if (isNumbered) {
      rows < 1 || seats < 1
        ? alert("El sector debe tener al menos un asiento")
        : setOpenNumbered(true);
    } else {
      capacity < 1
        ? alert("El sector debe tener al menos un lugar para poder reservar")
        : setOpenNonNumbered(true);
    }
  }

  const handleCancelNumbered = () => {
    resetSeatMap();
    setOpenNumbered(false);
  }

  const handleCloseNumbered = () => {
    const reserved = []
    const eliminated = []
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < seats; j++) {
        const seat = seatMap.rows[i][j]
        if (!eliminated.includes(seat._id) && !seat.available && seat.reservedBy === "vacio") {
          eliminated.push(seat._id)
        } else if (!reserved.includes(seat._id) && seat.reservedBy === "pre-reserved") {
          reserved.push(seat._id)
        }
      }
    }
    setReservedSeats(reserved);
    setEliminatedSeats(eliminated);
    //console.log(seatMap.rows)
    setOpenNumbered(false)
  }

  const handleNonNumberedReservationChange = (e) => {
    setReservedPlaces(Number(e.target.value));
  };

  const handleCancelNonNumbered = () =>{
    setReservedPlaces(1);
    setOpenNonNumbered(false);
  }

  const handleCloseNonNumbered = () => {
    setReservedSeats([[reservedPlaces, 0]]);
    setOpenNonNumbered(false);
  }

  const handleSeatClick = (clickedSeat) => {
    if (clickedSeat.available) {
      clickedSeat.available = false
      clickedSeat.reservedBy = "pre-reserved"
    } else if (clickedSeat.reservedBy === "pre-reserved") {
      clickedSeat.reservedBy = "vacio"
    } else {
      clickedSeat.available = true
    }
    const rowsCopy = seatMap.rows.slice();
    const clickedSeatIdx = clickedSeat._id
    const clickedSeatCopy = rowsCopy[clickedSeatIdx[0]][clickedSeatIdx[1]]
    clickedSeatCopy.available = clickedSeat.available
    clickedSeatCopy.reservedBy = clickedSeat.reservedBy
    setSeatMap(prevSeatMap => ({
      ...prevSeatMap,
      rows: rowsCopy
    }))
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField
          label="Nombre"
          value={name}
          onChange={handleNameChange}
          error={nameError}
          required
        />
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          alignItems="center"
          justifyContent="space-between"
          spacing={3}
        >
          <Button
            size="medium"
            onClick={handleOpen}
            variant="contained"
          >
            {isNumbered ? 'Personalizar/Reservar ' : 'Reservar'}
          </Button>
          <FormGroup>
            <FormControlLabel
              control={<Switch sx={{ ml: 0.5 }} size="small" onChange={() => setIsNumbered(!isNumbered)} />}
              label={`${isNumbered ? "Numerado" : "No numerado"}`}
              labelPlacement="start"
              sx={{ mr: 0.01 }}
            />
          </FormGroup>
        </Stack>
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
        {isNumbered && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={{ xs: 4, md: 8 }}
          >
            <Stack
              spacing={3}
              sx={{ width: { xs: "100%", md: "80%" } }}
            >
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
                    step={10}
                    marks
                    min={0}
                    max={250}
                    sx={{ width: "75%" }}
                  />
                  <Input
                    value={rows}
                    onChange={handleRowInputChange}
                    size="small"
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 250,
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
                    step={10}
                    marks
                    min={0}
                    max={250}
                    sx={{ width: "75%" }}
                  />
                  <Input
                    value={seats}
                    onChange={handleSeatInputChange}
                    size="small"
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 250,
                      type: "number",
                      "aria-labelledby": "seats",
                    }}
                    sx={{ width: "55px", alignSelf: "flex-start" }}
                  />
                </Stack>
              </Stack>
            </Stack>
            <Stack alignItems="center" justifyContent="center" p={{ sm: 4 }}>
              <Typography>Capacidad: </Typography>
              <Typography variant="h1">{rows * seats}</Typography>
            </Stack>
          </Stack>
        )}
        <Stack
          spacing={2}
          justifyContent="flex-end"
          alignItems="flex-end"
          direction="row"
          sx={{ py: { xs: 1, sm: 3 } }}
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
      <Modal
        open={openNumbered}
        onClose={handleCloseNumbered}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            // maxWidth: "90%",
            width: "auto",
            maxWidth: "90vw",
            maxHeight: "95vh",
            flexWrap: "wrap",
            bgcolor: "#142539",
            color: "lightgray",
            border: "1px solid lightgray",
            borderRadius: "5px",
            boxShadow: 24,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {seatMap && (
            <SectorDistributionMap
              rows={seatMap.rows}
              sectorName={seatMap.name}
              onSeatClick={handleSeatClick}
            />
          )}
          <Stack direction="row" mt={2} spacing={2}>
            <Button onClick={handleCancelNumbered}>Cancelar</Button>
            <Button onClick={handleCloseNumbered} variant="contained">Aceptar</Button>
          </Stack>

        </Box>
      </Modal>
      <Modal
        open={openNonNumbered}
        onClose={handleCloseNonNumbered}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            maxWidth: "90vw",
            maxHeight: "95vh",
            flexWrap: "wrap",
            bgcolor: "#142539",
            color: "lightgray",
            border: "1px solid lightgray",
            borderRadius: "5px",
            boxShadow: 24,
            p: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              color: "#fff",
              fontSize: "18px",
              letterSpacing: "2px",
              marginBottom: "1rem",
              paddingRight: "1rem",
              paddingLeft: "1rem",
              paddingBottom: "0.5rem",
              borderBottom: "1px solid #01BB89",
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "#01BB89", fontWeight: 600 }}>
              Reservar lugares
            </Typography>
            <Typography>{name}</Typography>
          </Stack>
          <Stack direction="row" spacing={3} p={2}>
            <Typography id="cantidad" alignSelf="center">Cantidad</Typography>
            <Input
              value={reservedPlaces}
              onChange={handleNonNumberedReservationChange}
              size="small"
              inputProps={{
                step: 1,
                min: 1,
                max: capacity,
                type: "number",
                "aria-labelledby": "cantidad",
              }}
              sx={{ width: "55px", alignSelf: "center" }}
            />
          </Stack>
          <Stack direction="row" mt={2} spacing={2}>
            <Button onClick={handleCancelNonNumbered}>Cancelar</Button>
            <Button variant="contained" onClick={handleCloseNonNumbered}>Aceptar</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}