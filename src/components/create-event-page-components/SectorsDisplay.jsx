import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

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
            {`${sector.name}, capacidad: ${
              sector.rowsNumber * sector.seatsNumber
            }`}
          </Typography>
          <Button onClick={() => deleteSector(sector)}>
            <DeleteOutlineOutlined />
          </Button>
        </Stack>
      ))}
    </Stack>
  );
}
