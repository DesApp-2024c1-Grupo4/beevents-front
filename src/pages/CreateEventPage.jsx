import React from "react";
import Container from "@mui/material/Container";
import { MultiSelectElement, TextFieldElement, useForm } from "react-hook-form-mui";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export function CreateEventPage() {
  const { contrastGreen } = customMuiTheme.colors;

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
                <MultiSelectElement
                  label={"Required Field"}
                  name={"auto"}
                  control={control}
                  options={[
                    'Oliver Hansen',
                    'Van Henry',
                    'April Tucker'
                  ]}
                  preserveOrder
                  showChips
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker label="Selecciona la fecha" ampm={false} />
                </LocalizationProvider>
                <Button type={'submit'} color={'primary'}>
                  Submit
                </Button>
              </Stack>
            </form>
          </Grid>
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
                <MultiSelectElement
                  label={"Required Field"}
                  name={"auto"}
                  control={control}
                  options={[
                    'Oliver Hansen',
                    'Van Henry',
                    'April Tucker'
                  ]}
                  preserveOrder
                  showChips
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker label="Selecciona la fecha" ampm={false} />
                </LocalizationProvider>
                <Button type={'submit'} color={'primary'}>
                  Submit
                </Button>
              </Stack>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}