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
} from "@mui/material";
import { useState, useEffect } from "react";
import SectorsDisplay from "./SectorsDisplay";
import SectorForm from "./SectorForm";
import { AddCircleOutlineOutlined, InfoOutlined } from "@mui/icons-material";
import { customMuiTheme } from "../../config/customMuiTheme";

export default function SectorsSection({
  sectors,
  setSectors,
  configurationsTemplates,
  eventId,
}) {
  const [showForm, setShowForm] = useState(false);
  const [selectedConfiguration, setSelectedConfiguration] = useState("");
  const [
    selectedConfigurationDescription,
    setSelectedConfigurationDescription,
  ] = useState("");
  const { contrastGreen } = customMuiTheme.colors;

  useEffect(() => {
    if (selectedConfiguration) {
      const config = configurationsTemplates.find(
        (config) => config.name === selectedConfiguration
      );
      let configurations = config?.sectors ? config.sectors : [];
      setSelectedConfigurationDescription(config.description);
      setSectors(configurations);
    }
  }, [selectedConfiguration, configurationsTemplates]);

  return (
    <Stack spacing={3} px={0}>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ alignSelf: { xs: "center", sm: "flex-start" } }}
      >
        Sectores
      </Typography>
      {!eventId && configurationsTemplates?.length > 0 && (
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
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <SectorsDisplay sectors={sectors} setSectors={setSectors} />
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
    </Stack>
  );
}
