import { React, useState, useEffect } from "react";
import { customMuiTheme } from "../config/customMuiTheme";
import {
  Button,
  Container,
  Stack,
  Typography,
  Tooltip
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
import { ArrowBackIos, ArrowForwardIos, CheckCircle, Info } from "@mui/icons-material";
import BeeventsModal from "../components/BeeventsModal";
import { indexOf } from "lodash";

export function CreateEventPage() {
  const [datesArray, setDatesArray] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [dates, setDates] = useState([]);
  const [datesWithReservations, setDatesWithReservations] = useState([]);
  const [sectorsWithReservations, setSectorsWithReservations] = useState([]);
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

  const navButtonStyle = {
    position: "fixed",
    top: "175px",
    minWidth: "0px",
    color: "lightslategray",
    "&:hover": { color: contrastGreen, backgroundColor: "inherit" }
  }

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
      const dateTimes = event.dates.map((date) => date.date_time)
      setDates(dateTimes);
      const dateTimesWithReservations = dateTimes.filter((date, idx) => hasReservationsDate(idx))
      setDatesWithReservations(dateTimesWithReservations)
      const existentSectors = event.dates[0].sectors
      setSectors(existentSectors);
      const existentSectorsNames = existentSectors.map(sector => sector.name);
      setSectorsWithReservations(existentSectorsNames.filter((sector, idx) => hasReservationsSector(idx)));
    }
  }, [event]);

  const hasReservationsDate = (dateIdx) => {
    const ocupedArray = event.dates[dateIdx].sectors.map((sector) => sector.ocuped)
    var hasReservations = false;
    var i = 0
    while (!hasReservations && i < ocupedArray.length) {
      if (ocupedArray[i]) { hasReservations = true }
      i++
    }
    return hasReservations
  }

  const hasReservationsSector = (sectorIdx) => {
    console.log("Me ejecuté")
    var hasReservations = false
    var i = 0
    while (!hasReservations && i < event.dates.length) {
      if (event.dates[i].sectors[sectorIdx].ocuped) {
        hasReservations = true
      }
      i++
    }
    return hasReservations
  }

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

  return loggedUser && loggedUser.role === "admin" ? (
    <>
      {!createdEventId && !edited &&
        <>
          <Container maxWidth="md" sx={{ mb: 5 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              my={6}
              spacing={{ xs: 1.5, sm: 2 }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: contrastGreen,
                  fontSize: {
                    xs: "1.5rem",
                    md: "2rem",
                  },
                  alignSelf: { xs: "center", sm: "start" }
                }}
              >
                {eventId ? "Editar evento" : "Crear un evento nuevo"}
              </Typography>
              <Tooltip
                title="Usa las flechas laterales o toca un paso de la barra de progreso para navegar"
                placement="top-end"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#000000",
                      color: "white",
                      fontSize: { xs: "12px", sm: "14px" },
                      borderRadius: "4px",
                      textAlign: "center",
                      p: 1,
                    },
                  },
                  arrow: {
                    sx: {
                      color: "#000000",
                    },
                  },
                }}
                arrow
              >
                <Info sx={{
                  fontSize: { xs: 18, sm: 25 },
                  alignSelf: "end",
                  position: "relative",
                  bottom: { xs: "60px", sm: "50px" }
                }}
                />
              </Tooltip>
              <ProgressBar currentStep={step} setStep={setStep} />
            </Stack>
            <Container maxWidth="sm">
              {step === 1 && <MainDataSection handleChange={handleChange} formData={formData} />}
              {step === 2 && <DatesSection
                dates={dates}
                setDates={setDates}
                datesWithReservations={datesWithReservations}
              />}
              {step === 3 && <LocationSection
                locationId={locationId}
                setLocationId={setLocationId}
                sectors={sectors}
                setSectors={setSectors}
                setSelectedLocationName={setSelectedLocationName}
                selectedLocationName={selectedLocationName}
                sectorsWithReservations={sectorsWithReservations}
              />}
              {step === 4 && <Confirmation
                handleSubmit={handleSubmit}
                formData={formData}
                selectedLocationName={selectedLocationName}
                eventId={eventId}
              />}
            </Container>
          </Container >
          {step !== 1
            &&
            <Button
              onClick={() => prevStep()}
              sx={{
                ...navButtonStyle,
                "&:after": { content: { sm: `""`, md: `"Anterior"` } },
                left: "0px",
                py: 30,
                pl: { xs: 0, sm: 3, md: 10, lg: 30, xl: 50 },
                pr: { xs: 0, sm: 1 },
                borderRadius: "250px 10px 10px 250px"
              }}
            >
              <ArrowBackIos sx={{ fontSize: 50 }} />
            </Button>
          }
          {step !== 4
            &&
            <Button
              onClick={() => nextStep()}
              sx={{
                ...navButtonStyle,
                "&:before": { content: { sm: `""`, md: `"Siguiente"` } },
                right: { xs: "-10px", sm: "0px" },
                py: 30,
                pr: { xs: 0, sm: 3, md: 10, lg: 30, xl: 50 },
                borderRadius: "10px 250px 250px 10px"
              }}
            >
              <ArrowForwardIos sx={{ fontSize: 50 }} />
            </Button>
          }
        </>
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
