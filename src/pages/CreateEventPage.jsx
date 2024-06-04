import { React, useState, useEffect } from "react";
import { customMuiTheme } from "../config/customMuiTheme";
import {
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import LocationSection from "../components/create-event-page-components/LocationSection"
import DatesSection from "../components/create-event-page-components/DatesSection"
import SectorsSection from "../components/create-event-page-components/SectorsSection"
import LocalDataBaseService from "../services/LocalDataBaseService";

export function CreateEventPage() {
  const [sectors, setSectors] = useState([]);
  const [dates, setDates] = useState([]);
  const [locationId, setLocationId] = useState("");
  const { contrastGreen } = customMuiTheme.colors;
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: "",
      artist: "",
      image: "",
      locationId: locationId,
      dates: dates,
      sectors: sectors,
    },
  });
  const localDBService = new LocalDataBaseService();

  useEffect(() => {
    setValue("locationId", locationId);
  }, [locationId, setValue]);
  useEffect(() => {
    setValue("dates", dates);
  }, [dates, setValue]);
  useEffect(() => {
    setValue("sectors", sectors);
  }, [sectors, setValue]);

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const eventId = await localDBService.createEvent(formData);
      window.alert("Evento creado");
    } catch (error) {
      console.log(error);
    }
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
          {/* Others */}
          <LocationSection locationId={locationId} setLocationId={setLocationId} />
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
              alignSelf: { xs: "center", sm: "flex-end" },
            }}
          >
            <Typography variant="h2">Crear</Typography>
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
