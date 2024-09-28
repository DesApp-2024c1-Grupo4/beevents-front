import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import DatesDisplay from "./DatesDisplay";
import ResponsiveDateTimePicker from "./ResponsiveDateTimePicker";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

export default function DatesSection({ prevStep, nextStep, dates, setDates }) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Stack spacing={3} px={3}>
      <Stack
        direction={{xs: "column-reverse", sm: "row"}}
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button variant="contained" onClick={prevStep} >Anterior</Button>
        <Typography
          variant="h1"
        >
          Fechas
        </Typography>
        <Button variant="contained" onClick={nextStep} >Siguiente</Button>
      </Stack>
      <DatesDisplay dates={dates} setDates={setDates} />
      {!showPicker && (
        <Button
          size="medium"
          variant="outlined"
          onClick={() => setShowPicker(!showPicker)}
          sx={{
            px: 2,
            display: "block",
            alignSelf: "center",
            width: "160px",
            whiteSpace: "nowrap",
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center">
            <Typography variant="info">Agregar fecha</Typography>
            <AddCircleOutlineOutlined />
          </Stack>
        </Button>
      )}
      {showPicker && (
        <ResponsiveDateTimePicker
          dates={dates}
          setDates={setDates}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
        />
      )}
    </Stack>
  );
}
