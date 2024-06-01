import { Autocomplete, Button, Stack, TextField, Typography } from "@mui/material";
import LocationForm from "./LocationForm"
import { useState } from "react";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

export default function LocationSection({ location, setLocation }) {
  const [showForm, setShowForm] = useState(false);
  const fakeFetchedLocations = [
    {
      _id: 1,
      name: "River Plate",
      address: {
        street: "Av. Pres. Figueroa Alcorta",
        number: 7597,
      },
    },
    {
      _id: 2,
      name: "Movistar Arena",
      address: {
        street: "Humboldt",
        number: 450,
      },
    },
  ];
  const getLocationOptions = () => {
    const options = [];
    for (let i = 0; i < fakeFetchedLocations.length; i++) {
      const location = fakeFetchedLocations[i];
      options.push({ id: location._id, label: location.name });
    }
    return options;
  };
  const getLocationById = (id) => {
    return fakeFetchedLocations.filter((location) => location._id === id)[0];
  };
  const handleLocationChange = (e, value) => {
    if (value !== null) {
      const locationSelected = getLocationById(value.id);
      setLocation({
        name: locationSelected.name,
        address: {
          street: locationSelected.address.street,
          number: locationSelected.address.number,
        },
        already_exists: true,
      });
    } else {
      setLocation({});
    }
  };
  const [displayChangeButton, setDisplayChangeButton] = useState(
    location.name && true
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
      <Typography>{location.name ? location.name : "Ninguno"}</Typography>
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
            id="combo-box-demo"
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
            fakeFetchedLocations={fakeFetchedLocations}
            location={location}
            setLocation={setLocation}
            showForm={showForm}
            setShowForm={setShowForm}
            setDisplayChangeButton={setDisplayChangeButton}
          />
        </Stack>
      )}
    </Stack>
  );
}