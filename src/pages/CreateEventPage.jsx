import { React, useState, useEffect } from "react";
import { customMuiTheme } from "../config/customMuiTheme";
import {
  Button,
  Container,
  Stack,
  Typography,
  CircularProgress,
  Box,
  IconButton,
} from "@mui/material";
import LocationSection from "../components/create-event-page-components/LocationSection";
import DatesSection from "../components/create-event-page-components/DatesSection";
import {
  createEvent,
  getEventById,
  updateEvent,
} from "../services/EventService";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/userService";
import NotFound from "../components/NotFound";
import MainDataSection from "../components/create-event-page-components/MainDataSection";
import Confirmation from "../components/create-event-page-components/Confirmation";
import ProgressBar from "../components/create-event-page-components/ProgressBar";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import BeeventsModal from "../components/BeeventsModal";

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
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    image: "",
    description: "",
    location_id: locationId,
    user_id: loggedUser.id,
    dates: datesArray
  });
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    setFormData({ ...formData, location_id: locationId });
  }, [locationId]);

  useEffect(() => {
    setFormData({ ...formData, dates: datesArray });
  }, [datesArray]);

  useEffect(() => {
    setDatesArray(dates.map((date) => ({ date_time: date, sectors: sectors })));
  }, [dates, sectors]);

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
      setFormData({
        ...formData,
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
    setModalMessage("Creando evento...");
    setOpen(true);
    const created = await createEvent(formData);
    if (created) {
      setModalMessage("¡Evento creado!");
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    } else {
      setModalMessage("Ocurrió un error al crear el evento");
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    }
    //setTimeout(navigate, 2000, "/account");
    //setTimeout(window.scrollTo, 2001, 0, 0);
  };

  const updateAnEvent = async (formData) => {
    setModalMessage("Editando evento...");
    setOpen(true);
    const updated = await updateEvent(formData, eventId);
    if (updated) {
      setModalMessage("¡Evento editado!");
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    } else {
      setModalMessage("Ocurrió un error al editar el evento");
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    }
    await updateEvent(formData, eventId);
    //setTimeout(navigate, 2000, "/account");
    //setTimeout(window.scrollTo, 2001, 0, 0);
  };
  /** 
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  */

  return loggedUser && loggedUser.role === "admin" ? (
    <>
      <Container maxWidth="md" sx={{ mb: 5 }}>
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{
            color: contrastGreen,
            mt: 4,
            fontSize: {
              xs: "1.5rem",
              md: "2rem",
            },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {eventId ? "Editar evento" : "Crear un evento nuevo"}
        </Typography>
        <Stack
          direction="row"
          alignItems="start"
          justifyContent="center"
          mt={7}
          mb={4}
          spacing={{ xs: 1, sm: 4 }}
        >
          {step !== 1
            ?
            <IconButton
              onClick={() => prevStep()}
              sx={{
                position: "relative",
                bottom: "15px"
              }}
            >
              <ArrowBack></ArrowBack>
            </IconButton>
            : <Box sx={{ width: "46px" }}></Box>
          }
          <ProgressBar currentStep={step} />
          {step !== 4
            ?
            <IconButton
              onClick={() => nextStep()}
              sx={{
                position: "relative",
                bottom: "15px"
              }}
            >
              <ArrowForward></ArrowForward>
            </IconButton>
            : <Box sx={{ width: "46px" }}></Box>
          }
        </Stack>
        {step === 1 && <MainDataSection handleChange={handleChange} formData={formData} />}
        {step === 2 && <DatesSection dates={dates} setDates={setDates} />}
        {step === 3 && <LocationSection
          locationId={locationId}
          setLocationId={setLocationId}
          sectors={sectors}
          setSectors={setSectors}
          setSelectedLocationName={setSelectedLocationName}
          selectedLocationName={selectedLocationName}
        />}
        {step === 4 && <Confirmation
          handleSubmit={handleSubmit}
          formData={formData}
          selectedLocationName={selectedLocationName}
          eventId={eventId}
        />}
      </Container>
      <BeeventsModal
        open={open}
        handleClose={() => setOpen(false)}
        message={modalMessage}
        processMessageIncludes={eventId? "Editando" : "Creando"}
        errorMessageIncludes={"error"}
        tryAgainMessage={"Revisa los datos y vuelve a intentarlo"}
      />
    </>
  ) : (
    <NotFound />
  );
}
