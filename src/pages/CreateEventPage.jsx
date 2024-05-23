import React, { useState } from "react";
import Container from "@mui/material/Container";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

function DateTimePickers({ dates }) {
  return dates.map(date => (
    <Stack key={date} direction='row' spacing={1}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Selecciona la fecha"
          ampm={false}
          disablePast
        />
      </LocalizationProvider>
      <Button
        onClick={() => deleteDateTimePicker(date)}
      >
        <DeleteOutlineIcon></DeleteOutlineIcon>
      </Button>

    </Stack>
  ))

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

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      auto: '',
      check: false
    },
  })
  const options = [
    { id: 'one', label: 'One' },
    { id: 'two', label: 'Two' },
    { id: 'three', label: 'Three' },
  ]

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          justifyContent="center"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Grid item xs={12} sm={6}>
            <form onSubmit={handleSubmit((data) => console.log(data))} noValidate>
              <Stack spacing={2}>
                <TextFieldElement
                  name={'name'}
                  label={'Nombre del evento'}
                  control={control}
                  required
                  fullWidth
                />
                <TextFieldElement
                  name={'name'}
                  label={'Artista'}
                  control={control}
                  required
                  fullWidth
                />
                {dates.map(date => (
                  <Stack key={date} direction='row' spacing={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="Selecciona la fecha"
                        ampm={false}
                        disablePast
                      />
                    </LocalizationProvider>
                    <Button
                      onClick={() => deleteDateTimePicker(date)}
                    >
                      <DeleteOutlineIcon></DeleteOutlineIcon>
                    </Button>

                  </Stack>
                ))}
                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => addDateTimePicker()}
                  sx={{
                    px: 3,
                    display: 'block'
                  }}>
                  <Typography
                    variant="h2"
                  >
                    Agregar fecha
                  </Typography>
                </Button>
                <Button type={'submit'} color={'primary'}>
                  Submit
                </Button>
              </Stack>
            </form>
          </Grid>
          <Grid item xs={12} sm={6}>
            
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}