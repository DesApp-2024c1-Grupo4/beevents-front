import { CheckCircleOutlineOutlined, Close } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { DateTimePicker, LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import validator from "validator";
import { customMuiTheme } from "../../config/customMuiTheme";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ResponsiveDateTimePicker({
  dates,
  setDates,
  showPicker,
  setShowPicker,
}) {
  const { contrastGreen } = customMuiTheme.colors;
  const [date, setDate] = useState("");
  const handleDateChange = (value) => {
    const thisDate = new Date(value).toString();
    setDate(thisDate);
  };
  const isValidDate = (aDate) => {
    const isEmpty = validator.isEmpty(aDate);
    const alreadyExists = dates.includes(aDate);
    return !(isEmpty || alreadyExists);
  };
  const addDate = (stringDate) => {
    if (isValidDate(stringDate)) {
      setDates([...dates, stringDate]);
    } else {
      alert("Introduce una fecha válida");
    }
  };
  let vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  let isMobile = vw <= 600;
  return (
    <Stack spacing={2} justifyContent="space-between">
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
      <Stack
        spacing={2}
        justifyContent="flex-end"
        alignItems="flex-end"
        direction="row"
      >
        <Button
          size="medium"
          variant="outlined"
          onClick={() => setShowPicker(!showPicker)}
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
          onClick={() => addDate(date)}
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