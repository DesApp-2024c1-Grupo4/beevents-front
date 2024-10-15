import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
  Modal,
  Box,
  CircularProgress,
} from "@mui/material";
import LocationForm from "./LocationForm";
import { customMuiTheme } from "../../config/customMuiTheme";
import { useEffect, useState } from "react";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import {
  getAllLocations,
  getLocationById,
  patchLocation,
} from "../../services/LocationService";
import BeeventsModal from "../BeeventsModal";
import SectorsSection from "./SectorsSection";
import validator from "validator";
import { useParams } from "react-router-dom";

export default function LocationSection({
  locationId,
  setLocationId,
  sectors,
  setSectors,
  setSelectedLocationName,
  selectedLocationName,
}) {
  const { contrastGreen } = customMuiTheme.colors;
  const [showForm, setShowForm] = useState(false);
  const [fetchedLocations, setFetchedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});
  const [configurationsTemplates, setConfigurationsTemplates] = useState([]);
  const [configName, setConfigName] = useState("");
  const [configDescription, setConfigDescription] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [subMessage, setSubMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchLocations = async () => {
      setFetchedLocations(await getAllLocations());
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const getLocationName = async () => {
      const location = await getLocationById(locationId);
      setSelectedLocationName(location.name);
    };
    if (eventId && !selectedLocationName) {
      getLocationName();
    }
  }, [locationId]);

  const getLocationOptions = () => {
    const options = [];
    for (let i = 0; i < fetchedLocations.length; i++) {
      const location = fetchedLocations[i];
      options.push({ id: location._id, label: location.name });
    }
    return options;
  };

  const handleLocationChange = (e, value) => {
    if (value !== null) {
      setLocationId(value.id);
      setSelectedLocationName(value.label);
      let location = getLocationOfTheArray(value.id, fetchedLocations);
      setSelectedLocation(location);
      setConfigurationsTemplates(location.configurations);
    }
  };

  function getLocationOfTheArray(locationId, locationsArray) {
    const location = locationsArray.find(
      (location) => location._id === locationId
    );
    return location;
  }

  const [displayChangeButton, setDisplayChangeButton] = useState(
    !validator.isEmpty(locationId) && true
  );

  const handleSaveConfig = async () => {
    if (configName.trim() === "") {
      setError(true);
      return;
    }
    try {
      setSaveLoading(true);
      const config = {
        name: configName,
        description: configDescription,
        sectors: sectors,
      };
      setModalMessage("¡Configuración guardada con éxito!");
      setSubMessage(
        "Ya se encuentra disponible entre las opciones de configuraciones predeterminadas."
      );
      selectedLocation.configurations.push(config);
      await patchLocation(selectedLocation);
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      setModalMessage("¡Hubo un error al guardar la configuración!");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 2500);
    } finally {
      setSaveLoading(false);
      handleCloseModal();
    }
  };

  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => {
    setModalOpen(false);
    setConfigName("");
    setConfigDescription("");
    setError(false);
  };

  return (
    <>
      <Stack spacing={3} px={{ xs: 3, sm: 6 }}>
        <Typography variant="h1" alignSelf="center">
          Predio
        </Typography>
        <Typography>
          {selectedLocationName ? selectedLocationName : "Ninguno seleccionado"}
        </Typography>
        {displayChangeButton && (
          <Button
            size="medium"
            variant="outlined"
            onClick={() => setDisplayChangeButton(false)}
            sx={{
              width: 115,
              display: "block",
              alignSelf: "center",
            }}
          >
            <Stack
              spacing={1}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="info">Cambiar</Typography>
            </Stack>
          </Button>
        )}
        {!showForm && !displayChangeButton && (
          <Stack spacing={3}>
            <Autocomplete
              disablePortal
              options={fetchedLocations ? getLocationOptions() : []}
              onChange={handleLocationChange}
              noOptionsText={
                <Stack width="100%">
                  <CircularProgress
                    size="2rem"
                    sx={{ alignSelf: "center", justifySelf: "center" }}
                  />
                </Stack>
              }
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} label="Seleccionar" />
              )}
            />
            <Typography variant="info" sx={{ textAlign: "center" }}>
              ¿No encontrás el lugar?
            </Typography>
            <Button
              size="medium"
              variant="outlined"
              onClick={() => setShowForm(!showForm)}
              sx={{
                px: 2,
                display: "block",
                alignSelf: "center",
                width: "160px",
                whiteSpace: "nowrap",
              }}
            >
              <Stack spacing={1} direction="row" justifyContent="center">
                <Typography variant="info">Agregar predio</Typography>
                <AddCircleOutlineOutlined />
              </Stack>
            </Button>
          </Stack>
        )}
        {showForm && !displayChangeButton && (
          <Stack spacing={2}>
            <LocationForm
              fetchedLocations={fetchedLocations}
              setSelectedLocationName={setSelectedLocationName}
              setLocationId={setLocationId}
              showForm={showForm}
              setShowForm={setShowForm}
              setDisplayChangeButton={setDisplayChangeButton}
            />
          </Stack>
        )}
        {locationId && (
          <>
            <SectorsSection
              sectors={sectors}
              setSectors={setSectors}
              configurationsTemplates={configurationsTemplates}
              eventId={eventId}
            />
            {!eventId && sectors?.length > 0 && (
              <Typography
                variant="body1"
                sx={{
                  cursor: "pointer",
                  color: contrastGreen,
                  alignSelf: "center",
                  fontSize: "14px",
                  textAlign: "center",
                }}
                onClick={handleOpenModal}
              >
                ¿Quieres guardar esta configuración de sectores?
              </Typography>
            )}
          </>
        )}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "95vw",
              maxWidth: "300px",
              boxShadow: 24,
              borderRadius: "5px",
              bgcolor: "#13273D",
              border: "1px solid #000",
              p: 4,
            }}
          >
            <Typography
              id="modal-title"
              variant="p"
              sx={{
                color: contrastGreen,
                fontSize: "17px",
                fontWeight: 500,
              }}
              required
            >
              Guardar configuración de sectores
            </Typography>
            <TextField
              id="config-name"
              label="Nombre de la configuración"
              value={configName}
              onChange={(e) => {
                setConfigName(e.target.value);
                if (e.target.value.trim() !== "") {
                  setError(false);
                }
              }}
              fullWidth
              margin="normal"
              required
              error={error}
              helperText={error ? "Este campo es obligatorio" : ""}
              sx={{ mt: 3 }}
            />
            <TextField
              id="config-desc"
              label="Descripción"
              value={configDescription}
              onChange={(e) => setConfigDescription(e.target.value)}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              margin="normal"
            />
            <Stack direction="row" justifyContent="space-between" mt={3}>
              <Button
                onClick={handleCloseModal}
                variant="outlined"
                style={{ width: "90px" }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSaveConfig}
                variant="contained"
                style={{ width: "90px" }}
              >
                {saveLoading ? (
                  <CircularProgress size={24} sx={{ color: "whitesmoke" }} />
                ) : (
                  "Guardar"
                )}
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Stack>
      <BeeventsModal
        open={open}
        handleClose={() => setOpen(false)}
        message={modalMessage}
        processMessageIncludes={"ando"}
        errorMessageIncludes={"error"}
        tryAgainMessage={"Revisa los datos y vuelve a intentarlo"}
        subMessage={subMessage}
      />
    </>
  );
}
