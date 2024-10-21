import {
  Button,
  Stack,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tooltip,
  IconButton,
  Modal,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import SectorsDisplay from "./SectorsDisplay";
import SectorForm from "./SectorForm";
import { AddCircleOutlineOutlined, InfoOutlined } from "@mui/icons-material";
import { customMuiTheme } from "../../config/customMuiTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { patchLocation } from "../../services/LocationService";
import BeeventsModal from "../BeeventsModal";

export default function SectorsSection({
  sectors,
  setSectors,
  configurationsTemplates,
  eventId,
  sectorsWithReservations,
  selectedLocation,
}) {
  const [showForm, setShowForm] = useState(false);
  const [selectedConfiguration, setSelectedConfiguration] = useState("");
  const [
    selectedConfigurationDescription,
    setSelectedConfigurationDescription,
  ] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [configName, setConfigName] = useState("");
  const [error, setError] = useState(false);
  const [configDescription, setConfigDescription] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [subMessage, setSubMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { contrastGreen } = customMuiTheme.colors;
  const isMobile = useMediaQuery("(max-width:1240px)");

  useEffect(() => {
    if (selectedConfiguration) {
      const config = configurationsTemplates.find(
        (config) => config.name === selectedConfiguration
      );
      if (config) {
        let configurations = config?.sectors ? config.sectors : [];
        setSelectedConfigurationDescription(config.description);
        setSectors(configurations);
      } else {
        setSelectedConfiguration("");
        setSelectedConfigurationDescription("");
        setSectors([]);
      }
    }
  }, [selectedConfiguration, configurationsTemplates]);

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
      }, 3000);
    } finally {
      setSaveLoading(false);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setConfigName("");
    setConfigDescription("");
    setError(false);
  };

  return (
    <Stack spacing={3} px={{ xs: 3, sm: 6 }}>
      <Typography variant="h1" alignSelf="center">
        Sectores
      </Typography>
      {!eventId && configurationsTemplates?.length > 0 && (
        <>
          <FormControl fullWidth>
            <InputLabel id="config-label">
              Configuraciones predeterminadas
            </InputLabel>
            <Select
              labelId="config-label"
              value={selectedConfiguration}
              onChange={(e) => setSelectedConfiguration(e.target.value)}
              label="Configuraciones predeterminadas"
            >
              {configurationsTemplates?.map((config, index) => (
                <MenuItem key={index} value={config.name}>
                  <Stack direction="row" alignItems="center">
                    <Typography>{config.name}</Typography>
                    {config.description && (
                      <Tooltip
                        title={config.description}
                        placement="bottom"
                        componentsProps={{
                          tooltip: {
                            sx: {
                              bgcolor: "#000000",
                              color: "white",
                              fontSize: "14px",
                              borderRadius: "4px",
                              p: 2,
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
                        <IconButton size="small">
                          <InfoOutlined fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </MenuItem>
              ))}
            </Select>
            {isMobile && (
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: "10px" }}
              >
                * Mantén presionado el ícono de{" "}
                <InfoOutlined fontSize="small" /> para ver la descripción de la
                configuración.
              </Typography>
            )}
          </FormControl>
        </>
      )}
      {!eventId && selectedLocation.name && sectors?.length > 0 && (
        <Typography
          variant="body1"
          sx={{
            cursor: "pointer",
            color: contrastGreen,
            alignSelf: "center",
            fontSize: "14px",
            textAlign: "center",
          }}
          onClick={() => setModalOpen(true)}
        >
          ¿Quieres guardar esta configuración de sectores?
        </Typography>
      )}
      <SectorsDisplay
        sectors={sectors}
        setSectors={setSectors}
        sectorsWithReservations={sectorsWithReservations}
      />
      {!showForm && (
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
            <Typography variant="info">Agregar sector</Typography>
            <AddCircleOutlineOutlined />
          </Stack>
        </Button>
      )}
      {showForm && (
        <SectorForm
          sectors={sectors}
          setSectors={setSectors}
          showForm={showForm}
          setShowForm={setShowForm}
        />
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
      <BeeventsModal
        open={open}
        handleClose={() => setOpen(false)}
        message={modalMessage}
        processMessageIncludes={"ando"}
        errorMessageIncludes={"error"}
        tryAgainMessage={"Revisa los datos y vuelve a intentarlo"}
        subMessage={subMessage}
      />
    </Stack>
  );
}
