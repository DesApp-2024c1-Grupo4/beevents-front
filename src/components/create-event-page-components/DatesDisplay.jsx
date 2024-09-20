import { Delete, DeleteOutlineOutlined } from "@mui/icons-material";
import { Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";

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
        alignItems="center"
        spacing={1}
      >
        <Stack>
          <Typography>{`Fecha ${dates.indexOf(date) + 1}:`}</Typography>
          <Typography sx={{ textAlign: "center" }}>{`${getFormatedDate(date)}`}</Typography>
        </Stack>
        <Tooltip
            title="Eliminar fecha"
            placement="bottom-end"
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
            <IconButton onClick={() => deleteDate(date)}>
              <Delete />
            </IconButton>
          </Tooltip>
      </Stack>
    ))}
  </Stack>
);
}