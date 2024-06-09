import { Autocomplete, Button, Stack, TextField, Typography } from "@mui/material";
import LocationForm from "./LocationForm"
import { useEffect, useState } from "react";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { getAllLocations, getLocationById } from "../../services/LocationService"
import validator from "validator";

export default function LocationSection({ locationId, setLocationId }) {
  const [showForm, setShowForm] = useState(false);
  const [ fetchedLocations, setFetchedLocations ] = useState([])
  const [ selectedLocationName, setSelectedLocationName ] = useState("")

  useEffect(() => {
    const fetchLocations = async () => {
      setFetchedLocations(await getAllLocations());
    }
    fetchLocations()
  }, [])

  useEffect(() => {
    const getLocationName = async() => {
      const location = await getLocationById(locationId);
      setSelectedLocationName(location.name)
    }
    getLocationName()
  },[locationId])

  const getLocationOptions = () => {
    const options = [];
    for (let i = 0; i < fetchedLocations.length; i++) {
      const location = fetchedLocations[i];
      options.push({ id: location._id , label: location.name });
    }
    return options;
  };

  const handleLocationChange = (e, value) => {
    if (value !== null) {
      setLocationId(value.id);
      setSelectedLocationName(value.label)
    }
  };
  const [displayChangeButton, setDisplayChangeButton] = useState(
    !validator.isEmpty(locationId) && true
  );

  return (
    <Stack spacing={3} px={3}>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ alignSelf: { xs: "center", sm: "flex-start" } }}
      >
        Predio
      </Typography>
      <Typography>{selectedLocationName ? selectedLocationName : "Ninguno"}</Typography>
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
            options={getLocationOptions()}
            onChange={handleLocationChange}
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
            }}
          >
            <Stack spacing={1} direction="row" justifyContent="center">
              <Typography variant="info">Agregar nuevo</Typography>
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