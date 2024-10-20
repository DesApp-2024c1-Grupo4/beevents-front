import {
  Autocomplete,
  Button,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import LocationForm from "./LocationForm";
import { useEffect, useState } from "react";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { getAllLocations } from "../../services/LocationService";
import validator from "validator";

export default function LocationSection({
  locationId,
  setLocationId,
  setSelectedLocationName,
  selectedLocationName,
  setConfigurationsTemplates,
  setSelectedLocation
}) {
  const [showForm, setShowForm] = useState(false);
  const [fetchedLocations, setFetchedLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      setFetchedLocations(await getAllLocations());
    };
    fetchLocations();
  }, []);

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

  return (
    <Stack spacing={3} px={{ xs: 3, sm: 6 }}>
      <Typography
        variant="h1"
        alignSelf="center"
      >
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
                <CircularProgress size="2rem" sx={{ alignSelf: "center", justifySelf: "center" }} />
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
    </Stack>
  );
}
