import { React, useState, useEffect } from "react";
import { customMuiTheme } from "../config/customMuiTheme";
import {
  Button,
  Container,
  Stack,
  Typography,
  Box,
  IconButton
} from "@mui/material";
import LocationSection from "../components/create-event-page-components/LocationSection";
import DatesSection from "../components/create-event-page-components/DatesSection";
import {
  createEvent,
  getEventById,
  publishUnpublishEvent,
  updateEvent,
} from "../services/EventService";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../services/userService";
import NotFound from "../components/NotFound";
import MainDataSection from "../components/create-event-page-components/MainDataSection";
import Confirmation from "../components/create-event-page-components/Confirmation";
import ProgressBar from "../components/create-event-page-components/ProgressBar";
import { ArrowBack, ArrowForward, CheckCircle } from "@mui/icons-material";
import BeeventsModal from "../components/BeeventsModal";

export function CreateEventPage() {
  const [datesArray, setDatesArray] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [dates, setDates] = useState([]);
  const [locationId, setLocationId] = useState("");
  const [event, setEvent] = useState(null);
  const { contrastGreen, oceanicBlue } = customMuiTheme.colors;
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
  const [createdEventId, setEventCreatedId] = useState(null);
  const [publicated, setPublicated] = useState(false);
  const [edited, setEdited] = useState(false);

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
    eventId ? updateAnEvent(formData) : createNewEvent(formData);
  };

  const createNewEvent = async (formData) => {
    setModalMessage("Creando evento...");
    setOpen(true);
    const created = await createEvent(formData);
    if (created) {
      setModalMessage("¡Evento creado!");
      setEventCreatedId(created._id);
      window.scrollTo(0, 0);
      setOpen(false);
    } else {
      setModalMessage("Ocurrió un error al crear el evento");
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    }
  };

  const updateAnEvent = async (formData) => {
    setModalMessage("Editando evento...");
    setOpen(true);
    const updated = await updateEvent(formData, eventId);
    if (updated) {
      setModalMessage("¡Evento editado!");
      setEdited(true);
      window.scrollTo(0, 0);
      setOpen(false);
    } else {
      setModalMessage("Ocurrió un error al editar el evento");
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    }
  };

  const publishEvent = async (idEvent) => {
    setModalMessage("Publicando evento...");
    setOpen(true);
    const state = { publicated: true }
    const publicated = await publishUnpublishEvent(state, idEvent)
    if (publicated) {
      setModalMessage("¡Evento publicado!");
      setPublicated(true);
      setOpen(false);
    } else {
      setModalMessage("Ocurrió un error al publicar el evento");
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    }
  }

  const text = "hola"

  return loggedUser && loggedUser.role === "admin" ? (
    <>
      {!createdEventId && !edited &&
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
              <Button
                size="small"
                onClick={() => prevStep()}
                sx={{
                  "&:after": { content: { xs: `""`, sm: `"Anterior"` } },
                  position: "relative",
                  bottom: "15px",
                  minWidth: "0px",
                  color: "lightslategray",
                  "&:hover": { color: contrastGreen}
                }}
              >
                <ArrowBack sx={{ pr: 1 }} />
              </Button>
              : <Box sx={{ width: {xs: "46px", sm: "100px"} }}></Box>
            }
            <ProgressBar currentStep={step} />
            {step !== 4
              ?
              <Button
                size="small"
                onClick={() => nextStep()}
                sx={{
                  "&:before": { content: { xs: `""`, sm: `"Siguiente"` } },
                  position: "relative",
                  bottom: "15px",
                  minWidth: "0px",
                  color: "lightslategray",
                  "&:hover": { color: contrastGreen}
                }}
              >
                <ArrowForward sx={{ pl: 1 }} />
              </Button>
              : <Box sx={{ width: {xs: "46px", sm: "100px"} }}></Box>
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
        </Container >
      }
      {
        (createdEventId || edited) &&
        <Container maxWidth="md" sx={{ my: 10 }}>
          <Stack alignItems="center" spacing={3}>
            <Typography
              variant="h2"
              sx={{
                color: contrastGreen,
                mt: 4,
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                },
                textAlign: "center",
              }}
            >
              {!edited && !publicated && "¡Evento creado!"}
              {!edited && publicated && "¡Evento publicado!"}
              {edited && "¡Evento editado!"}
            </Typography>
            <CheckCircle sx={{ fontSize: { xs: 40, sm: 60 }, color: contrastGreen }} />
            {!publicated && !edited &&
              <>
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                  ¿Quieres publicar el evento ahora?
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="outlined"
                    sx={{
                      "&:hover": {
                        backgroundColor: contrastGreen,
                        color: oceanicBlue,
                        borderColor: oceanicBlue
                      }
                    }}
                    onClick={() => publishEvent(createdEventId)}
                  >
                    <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                      Sí
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      "&:hover": {
                        backgroundColor: contrastGreen,
                        color: oceanicBlue,
                        borderColor: oceanicBlue
                      }
                    }}
                    onClick={() => navigate(`/reservation/${createdEventId}`)}
                  >
                    <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                      No, quiero pre-reservar
                    </Typography>
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      "&:hover": {
                        backgroundColor: contrastGreen,
                        color: oceanicBlue,
                        borderColor: oceanicBlue
                      }
                    }}
                    onClick={() => navigate(`/account`)}
                  >
                    <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                      No, ya terminé
                    </Typography>
                  </Button>
                </Stack>
              </>}
            {(publicated || edited) && <Stack spacing={2}>
              <Button
                variant="outlined"
                sx={{
                  "&:hover": {
                    backgroundColor: contrastGreen,
                    color: oceanicBlue,
                    borderColor: oceanicBlue
                  }
                }}
                onClick={edited ? () => navigate(`/event/${eventId}`) : () => navigate(`/events`)}
              >
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                  Ver evento{edited ? " editado" : "s publicados"}
                </Typography>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  "&:hover": {
                    backgroundColor: contrastGreen,
                    color: oceanicBlue,
                    borderColor: oceanicBlue
                  }
                }}
                onClick={() => navigate("/account")}
              >
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                  Ir a mi cuenta
                </Typography>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  "&:hover": {
                    backgroundColor: contrastGreen,
                    color: oceanicBlue,
                    borderColor: oceanicBlue
                  }
                }}
                onClick={() => navigate("/")}
              >
                <Typography sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}>
                  Ir a inicio
                </Typography>
              </Button>
            </Stack>}
          </Stack>
        </Container>
      }
      <BeeventsModal
        open={open}
        handleClose={() => setOpen(false)}
        message={modalMessage}
        processMessageIncludes={"ando"}
        errorMessageIncludes={"error"}
        tryAgainMessage={"Revisa los datos y vuelve a intentarlo"}
      />
    </>
  ) : (
    <NotFound />
  );
}
