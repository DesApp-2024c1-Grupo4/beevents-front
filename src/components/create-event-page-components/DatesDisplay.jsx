import { DeleteOutlineOutlined } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";

export default function DatesDisplay({ dates, setDates }) {
  const getFormatedDate = (date) => {
    const thisDate = new Date(date);
    const day = thisDate.getDate()
    const month = thisDate.toLocaleString("es-AR", { month: "long" });
    const year = thisDate.getFullYear()
    const hour = ("0" + thisDate.getHours()).slice(-2);
    const minutes = ("0" + thisDate.getMinutes()).slice(-2);
    const time = "" + hour + ":" + minutes + " hs."
    return ("" + day + " de " + month + " de " + year + ", " + time)
  };

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
          <Typography sx={{ textAlign: "center" }}>{`${getFormatedDate(date)}`}</Typography>
        </Stack>
        <Button onClick={() => deleteDate(date)}>
          <DeleteOutlineOutlined />
        </Button>
      </Stack>
    ))}
  </Stack>
);
}