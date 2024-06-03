import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

export default function DatesDisplay({ dates, setDates }) {
  const deleteDate = (date) => {
    setDates((current) => current.filter((storedDate) => storedDate !== date));
  };
  return (
    <Stack spacing={1}>
      <Typography>{dates.length > 0 ? "" : "Ninguna"}</Typography>
      {dates.map((date) => (
        <Stack
          key={date}
          direction="row"
          justifyContent="space-between"
          spacing={1}
        >
          <Stack>
            <Typography>{`Fecha ${dates.indexOf(date) + 1}:`}</Typography>
            <Typography sx={{ textAlign: "center" }}>{`${date}`}</Typography>
          </Stack>
          <Button onClick={() => deleteDate(date)}>
            <DeleteOutlineOutlined />
          </Button>
        </Stack>
      ))}
    </Stack>
  );
}