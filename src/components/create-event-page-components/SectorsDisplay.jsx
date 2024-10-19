import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

export default function SectorsDisplay({ sectors, setSectors, sectorsWithReservations }) {
  const deleteSector = (sector) => {
    setSectors((current) =>
      current.filter((storedSector) => storedSector !== sector)
    );
  };

  const hasReservations = (sector) => {
    return sectorsWithReservations.includes(sector.name)
  }

  return (
    <Stack>
      <Typography>{sectors.length > 0 ? "" : "Ninguno"}</Typography>
      {sectors.map((sector) => (
        <Stack
          key={sector.name}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Typography sx={{ alignSelf: "center" }}>
            {`${sector.name} - capacidad: 
            ${sector.rowsNumber * sector.seatsNumber - sector.eliminated.length}`}
          </Typography>
          <Tooltip
            title={hasReservations(sector) ? "No puedes eliminar este sector porque tiene lugares reservados para alguna fecha" : "Eliminar sector"}
            placement="top-end"
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "#000000",
                  color: "white",
                  fontSize: "12px",
                  borderRadius: "4px",
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
            <Stack>
              <IconButton
                onClick={() => deleteSector(sector)}
                disabled={hasReservations(sector)}
              >
                <Delete />
              </IconButton>
            </Stack>
          </Tooltip>
        </Stack>
      ))}
    </Stack>
  );
}
