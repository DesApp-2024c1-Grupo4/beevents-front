import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

export default function SectorsDisplay({ sectors, setSectors }) {
  const deleteSector = (sector) => {
    setSectors((current) =>
      current.filter((storedSector) => storedSector !== sector)
    );
  };
  return (
    <Stack>
      <Typography>{sectors.length > 0 ? "" : "Ninguno"}</Typography>
      {sectors.map((sector) => (
        <Stack
          key={sector.name}
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <Typography sx={{ alignSelf: "center" }}>
            {`${sector.name} - capacidad: 
            ${sector.rowsNumber * sector.seatsNumber - sector.eliminated.length}`}
          </Typography>
          <Tooltip
            title="Eliminar sector"
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
            <IconButton onClick={() => deleteSector(sector)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
      ))}
    </Stack>
  );
}
