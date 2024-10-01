import { ArrowBackOutlined, CheckCircleOutlineOutlined, Close } from "@mui/icons-material";
import { Box, Button, FormControlLabel, FormGroup, IconButton, Input, Modal, Slider, Stack, Switch, TextField, Tooltip, Typography } from "@mui/material";
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
  const [seatMap, setSeatMap] = useState({ name: name, rows: [] });
  const [eliminatedSeats, setEliminatedSeats] = useState([]);

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

  const updateSeatMapAfterCancel = () => {
    const newRows = seatMap.rows.slice();
    for (var i = 0; i < eliminatedSeats.length; i++) {
      const seat = newRows[eliminatedSeats[i][0]][eliminatedSeats[i][1]]
      seat.available = true;
      seat.reservedBy = "vacio";
    }
    setSeatMap(prevSeatMap => ({
      ...prevSeatMap,
      rows: newRows
    }));
  }

  const resetAll = () => {
    resetSeatMap();
    setEliminatedSeats([]);
  }

  useEffect(() => {
    resetAll();
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
    rows < 1 || seats < 1
      ? alert("El sector debe tener al menos un asiento")
      : setOpenNumbered(true);
  }

  const handleCloseNumbered = () => {
    const eliminated = []
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < seats; j++) {
        const seat = seatMap.rows[i][j]
        if (!seat.available) {
          eliminated.push(seat._id)
        }
      }
    }
    setEliminatedSeats(eliminated);
    setOpenNumbered(false)
  }

  const handleSeatClick = (clickedSeat) => {
    clickedSeat.available = !clickedSeat.available
    const rowsCopy = seatMap.rows.slice();
    const clickedSeatIdx = clickedSeat._id
    const clickedSeatCopy = rowsCopy[clickedSeatIdx[0]][clickedSeatIdx[1]]
    clickedSeatCopy.available = clickedSeat.available
    setSeatMap(prevSeatMap => ({
      ...prevSeatMap,
      rows: rowsCopy
    }))
  }

  const handleSwitchChange = () => {
    resetAll();
    setIsNumbered(!isNumbered);
  }

  const cancelDistribution = () => {
    updateSeatMapAfterCancel();
    setEliminatedSeats([]);
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
          alignItems={{ xs: "center", sm: "start" }}
          justifyContent={isNumbered ? "space-between" : "end"}
          spacing={3}
        >
          {isNumbered &&
            <Button
              size="medium"
              onClick={handleOpen}
              variant="contained"
            >
              Personalizar disposición
            </Button>}
          {eliminatedSeats.length > 0 &&
            <Stack direction="row" alignItems="center">
              <Tooltip
                title="Resetear disposición"
                placement="bottom"
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
              >
                <IconButton size="small" onClick={cancelDistribution}>
                  <Close fontSize="small" />
                </IconButton>
              </Tooltip>
              <Typography color={contrastGreen}>¡Personalizado!</Typography>
            </Stack>
          }
          <FormGroup>
            <FormControlLabel
              control={<Switch sx={{ ml: 0.5 }} size="small" onChange={handleSwitchChange} />}
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
              <Typography variant="h1">{rows * seats - eliminatedSeats.length}</Typography>
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
              statuses={["Disponible", "Eliminado"]}
              reserving={false}
            />
          )}
          <Tooltip
            title="Cerrar"
            placement="left-end"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#000000",
                  color: "white",
                  fontSize: { xs: "10px", sm: "12px" },
                  borderRadius: "4px",
                  p: 1
                },
              },
              arrow: {
                sx: {
                  color: "#000000",
                },
              },
            }}
            arrow
          >
            <IconButton
              size="small"
              onClick={() => setOpenNumbered(false)}
              sx={{
                position: "absolute",
                top: "-1px",
                right: "-2px"
              }}>
              <Close fontSize="small" />
            </IconButton>
          </Tooltip>
          <Stack direction="row" mt={2} spacing={2}>
            <Button onClick={() => setOpenNumbered(false)} size="small">Cancelar</Button>
            <Button onClick={() => resetSeatMap()} variant="outlined" size="small">Resetear</Button>
            <Button onClick={handleCloseNumbered} variant="contained" size="small">Aceptar</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}