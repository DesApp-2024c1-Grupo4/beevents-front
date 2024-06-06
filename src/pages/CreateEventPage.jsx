import { React, useState, useEffect } from "react";
import { customMuiTheme } from "../config/customMuiTheme";
import {
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import LocationSection from "../components/create-event-page-components/LocationSection";
import DatesSection from "../components/create-event-page-components/DatesSection";
import SectorsSection from "../components/create-event-page-components/SectorsSection";
import SnackBar from "../components/SnackBar";
import { createEvent } from "../services/EventService";

export function CreateEventPage() {
  const [sectors, setSectors] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { contrastGreen } = customMuiTheme.colors;
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: "",
      artist: "",
      image: "",
      location_id: locationId,
      user_id: "user1",
      date_times: dates,
      sectors: sectors,
    },
  });

  useEffect(() => {
    setValue("location_id", locationId);
  }, [locationId, setValue]);

  useEffect(() => {
    setValue("date_times", dates);
  }, [dates, setValue]);

  useEffect(() => {
    setValue("sectors", sectors);
  }, [sectors, setValue]);

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      await createEvent(formData);
      setSnackbarMessage("¡Evento creado exitosamente!");
      reset();
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Hubo un error al crear el evento");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ mb: 5 }}>
      <SnackBar
        open={snackbarOpen}
        message={snackbarMessage}
        severity="success"
        handleClose={handleSnackbarClose}
      />
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
          <Stack spacing={3} px={3}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{ alignSelf: { xs: "center", sm: "flex-start" } }}
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
          <LocationSection
            locationId={locationId}
            setLocationId={setLocationId}
          />
          <DatesSection dates={dates} setDates={setDates} />
          <SectorsSection sectors={sectors} setSectors={setSectors} />
          <Button
            size="large"
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: contrastGreen,
              color: "whitesmoke",
              alignSelf: { xs: "center", sm: "flex-end" },
              "&.Mui-disabled": {
                backgroundColor: contrastGreen,
                color: "whitesmoke",
              },
              width: "100px",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "whitesmoke" }} />
            ) : (
              <Typography variant="h2">Crear</Typography>
            )}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
