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
import SnackBar from "../components/SnackBar";
import {
  createEvent,
  getEventById,
  updateEvent,
} from "../services/EventService";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/userService";
import NotFound from "../components/NotFound";
import ReservationSection from "../components/create-event-page-components/ReservationSection";
import MainDataSection from "../components/create-event-page-components/MainDataSection";
import Confirmation from "../components/create-event-page-components/Confirmation";

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
  const loggedUser = userService.getUserFromLocalStorage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    image: "",
    description: "",
    location_id: locationId,
    user_id: loggedUser.id,
    dates: datesArray
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    setFormData({ ...formData, location_id: locationId });
  },[locationId]);

  useEffect(() => {
    setFormData({ ...formData, dates: datesArray });
  },[datesArray]);

  useEffect(() => {
    setDatesArray(dates.map((date) => ({ date_time: date, sectors: sectors })));
  }, [dates, sectors]);
  /**
  useEffect(() => {
    setValue("location_id", locationId);
  }, [locationId, setValue]);

  useEffect(() => {
    setValue("dates", datesArray);
  }, [datesArray, setValue]);
 */
  /*
  useEffect(() => {
    setValue("date_times", dates);
  }, [dates, setValue]);

  useEffect(() => {
    setValue("sectors", sectors);
  }, [sectors, setValue]);
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
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

  const handleSubmit = (formData) => {
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

  return loggedUser && loggedUser.role === "admin" ? (
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
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {eventId ? "Editar evento" : "Crear un evento nuevo"}
      </Typography>
      {step === 1 && <MainDataSection nextStep={nextStep} handleChange={handleChange} formData={formData}/>}
      {step === 2 && <DatesSection prevStep={prevStep} nextStep={nextStep} dates={dates} setDates={setDates} />}
      {step === 3 && <LocationSection
        prevStep={prevStep}
        nextStep={nextStep}
        locationId={locationId}
        setLocationId={setLocationId}
        sectors={sectors}
        setSectors={setSectors}
      />}
      {step === 4 && <ReservationSection prevStep={prevStep} nextStep={nextStep} dates={dates} sectors={sectors} />}
      {step === 5 && <Confirmation prevStep={prevStep} handleSubmit={handleSubmit} formData={formData}/>}
      {/** 
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
        */}
    </Container>
  ) : (
    <NotFound />
  );
}
