import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { customMuiTheme } from "../config/customMuiTheme";

export default function MediaCard({ id, title, artist, imageUrl }) {
  const { contrastGreen, iconGrey } = customMuiTheme.colors;

  return (
    <Card sx={{ maxWidth: 600, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.8)" }}>
      <div style={{ position: "relative" }}>
        <img
          src={imageUrl}
          alt="Event"
          style={{ width: "100%", height: 350, objectFit: "cover" }}
        />
        <CardContent
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(5px)",
            padding: "10px",
            height: "100px", // Altura fija para el CardContent
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", // Alinear contenido verticalmente
          }}
        >
          <div>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ color: iconGrey, lineHeight: 1.2 }} // Ajustar el espacio entre líneas
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: iconGrey, fontWeight: "light" }}
            >
              {artist}
            </Typography>
          </div>
          {/* Contenedor adicional para el botón Ver */}
          <div style={{ position: "absolute", bottom: 0, right: 0 }}>
            <CardActions>
              <Button
                component={Link}
                to={`/event/${id}`}
                size="medium"
                sx={{ color: contrastGreen, fontWeight: "bold" }}
              >
                Ver
              </Button>
            </CardActions>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
