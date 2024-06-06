import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/abreviatura.png";
import { customMuiTheme } from "../../config/customMuiTheme";
import UserService from "../../services/userService";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const navigate = useNavigate();
  const { contrastGreen } = customMuiTheme.colors;
  const userService = new UserService();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handlePassChange = (event) => {
    setPassValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailError = emailValue.trim() === "";
    const passwordError = passValue.trim() === "";

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setLoading(true);

    try {
      const isLogged = userService.loginUser(emailValue, passValue);
      if (isLogged) {
        setTimeout(() => {
          navigate("/");
        }, 4000);
      } else {
        console.error("Error al iniciar sesión.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Stack alignItems="center" spacing={3} sx={{ mt: 8 }}>
        <Stack alignItems="center" spacing={{ xs: 3, sm: 5 }}>
          <Box sx={{ maxWidth: { xs: 60, sm: 100 } }}>
            <img src={logo} alt="brandLogo" style={{ maxWidth: "100%" }} />
          </Box>
          <Typography variant="h1">Iniciar sesión</Typography>
        </Stack>
        <Stack
          alignItems="center"
          spacing={2}
          className="border-grad"
          sx={{ p: 3 }}
        >
          <TextField
            id="user"
            label="Usuario"
            variant="outlined"
            value={emailValue}
            onChange={handleEmailChange}
            error={errors.email}
            helperText={
              errors.email ? "El campo de usuario es obligatorio" : ""
            }
            sx={{ width: { xs: "225px", sm: "300px" } }}
          />
          <TextField
            id="password"
            label="Contraseña"
            value={passValue}
            onChange={handlePassChange}
            type={showPassword ? "text" : "password"}
            error={errors.password}
            helperText={
              errors.password ? "El campo de contraseña es obligatorio" : ""
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: "225px", sm: "300px" } }}
          />
          <Link component="button" variant="body2" to="/auth/recover">
            <Typography variant="info">¿Olvidaste tu contraseña?</Typography>
          </Link>
          <Button
            size="large"
            sx={{
              px: 3,
              display: "block",
              color: "white",
              backgroundColor: contrastGreen,
            }}
            onClick={handleSubmit}
          >
            <Typography variant="h2">Ingresar</Typography>
          </Button>
          <Stack alignItems="center">
            <Typography variant="info">¿Nuev@ en BeEvents?</Typography>
            <Link component="button" variant="body2" to="/auth/register">
              <Typography variant="info">Crea tu cuenta</Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
