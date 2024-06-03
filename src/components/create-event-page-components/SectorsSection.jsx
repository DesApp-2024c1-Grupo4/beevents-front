import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SectorsDisplay from "./SectorsDisplay"
import SectorForm from "./SectorForm"
import { AddCircleOutlineOutlined } from "@mui/icons-material";

export default function SectorsSection({ sectors, setSectors }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <Stack spacing={3} px={3}>
      <Typography
        variant="h1"
        gutterBottom
        sx={{ alignSelf: { xs: "center", sm: "flex-start" } }}
      >
        Sectores
      </Typography>
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
          }}
        >
          <Stack spacing={1} direction="row" justifyContent="center">
            <Typography variant="info">Agregar nuevo</Typography>
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