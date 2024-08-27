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
  Modal,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/abreviatura.png";
import { customMuiTheme } from "../../config/customMuiTheme";
import UserService from "../../services/userService";
import Logo from "../../assets/img/logo.png";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  //const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: false, password: false });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "380px",
    bgcolor: "#13273D",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailError = emailValue.trim() === "";
    const passwordError = passValue.trim() === "";

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    setMessage("Iniciando sesión...");
    handleOpen();

    const user = {
      email: emailValue,
      password: passValue
    }

    /** 
    try {
      const isLogged = userService.loginUser(user);
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
    */
    const isLogged = await userService.loginUser(user);

    if (isLogged) {
      navigate("/");
      /**
      setTimeout(() => {
        navigate("/");
      }, 3000);
       */
    } else {
      setMessage("Ocurrió un error al iniciar sesión");
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
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
      <Modal
        open={open}
        onClose={handleClose}
        hideBackdrop={message.includes("Iniciando") ? true : false}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
        <Box sx={style}>
          <img src={Logo} alt="Logo" style={{ width: 100, marginBottom: 5 }} />
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              textAlign: "center",
              fontWeight: 500,
              color: message.includes("error") ? "red" : contrastGreen,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            {message}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 1,
              mb: 3,
              textAlign: "center",
              fontSize: "14px",
            }}
          > {message.includes("error")
            ? "Revisa tus datos y vuelve a intentarlo"
            : "Solo tomará un momento"
            }
          </Typography>
          {message.includes("Iniciando")
            ? <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={30} />
            </Box>
            : <></>
          }
        </Box>
      </Modal>
    </>
  );
}
