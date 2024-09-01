import { React, useState, useEffect } from "react";
import { customMuiTheme } from "../config/customMuiTheme";
import {
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  TextareaAutosizeElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import LocationSection from "../components/create-event-page-components/LocationSection";
import DatesSection from "../components/create-event-page-components/DatesSection";
import SectorsSection from "../components/create-event-page-components/SectorsSection";
import SnackBar from "../components/SnackBar";
import {
  createEvent,
  getEventById,
  updateEvent,
} from "../services/EventService";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/userService";
import NotFound from "../components/NotFound";

export function CreateEventPage() {
  const [datesArray, setDatesArray] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [event, setEvent] = useState(null);
  const { contrastGreen } = customMuiTheme.colors;
  const { eventId } = useParams();
  const navigate = useNavigate();
  const userService = new UserService();
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: "",
      artist: "",
      image: "",
      description: "",
      location_id: locationId,
      user_id: "user1",
      dates: datesArray,
    },
  });

  useEffect(() => {
    setDatesArray(dates.map((date) => ({ date_time: date, sectors: sectors })));
  }, [dates, sectors]);

  useEffect(() => {
    setValue("location_id", locationId);
  }, [locationId, setValue]);

  useEffect(() => {
    setValue("dates", datesArray);
  }, [datesArray, setValue]);

  /*
  useEffect(() => {
    setValue("date_times", dates);
  }, [dates, setValue]);

  useEffect(() => {
    setValue("sectors", sectors);
  }, [sectors, setValue]);
  */

  useEffect(() => {
    const fetchEvent = async () => {
      const fetchedEvent = await getEventById(eventId);
      setEvent(fetchedEvent);
    };
    if (eventId) {
      fetchEvent();
    }
  }, []);

  useEffect(() => {
    if (event) {
      reset({
        name: event.name,
        artist: event.artist,
        image: event.image,
        description: event.description,
      });
      setLocationId(event.location_id);
      setDates(event.dates.map((date) => date.date_time));
      event.dates[0] ? setSectors(event.dates[0].sectors) : setSectors([]);
    }
  }, [event]);

  const onSubmit = (formData) => {
    setLoading(true);
    eventId ? updateAnEvent(formData) : createNewEvent(formData);
  };

  const createNewEvent = async (formData) => {
    try {
      await createEvent(formData);
      setSnackbarMessage("¡Evento creado exitosamente!");
      setTimeout(navigate, 2000, "/account");
      setTimeout(window.scrollTo, 2001, 0, 0);
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Hubo un error al crear el evento");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const updateAnEvent = async (formData) => {
    try {
      await updateEvent(formData, eventId);
      setSnackbarMessage("¡Evento editado exitosamente!");
      setTimeout(navigate, 2000, "/account");
      setTimeout(window.scrollTo, 2001, 0, 0);
    } catch (error) {
      console.log(error);
      setSnackbarMessage("Hubo un error al editar el evento");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const loggedUser = userService.getUserFromLocalStorage();

  return (
    loggedUser && loggedUser.role === "admin"
      ? <Container maxWidth="md" sx={{ mb: 5 }}>
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
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {eventId ? "Editar evento" : "Crear un evento nuevo"}
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
              <TextareaAutosizeElement
                name={"description"}
                label={"Descripción"}
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
                width: "120px",
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "whitesmoke" }} />
              ) : (
                <Typography variant="h2">
                  {eventId ? "Confirmar" : "Crear"}
                </Typography>
              )}
            </Button>
          </Stack>
        </form>
      </Container>
      : <NotFound />
  );
}
