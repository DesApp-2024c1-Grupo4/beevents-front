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
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/img/abreviatura.png";
import { customMuiTheme } from "../../config/customMuiTheme";
import validator from "validator";
import UserService from "../../services/userService";

export function RegisterPage() {
  const { contrastGreen } = customMuiTheme.colors;
  const userService = new UserService();

  const [emailValue, setEmailValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [repeatPassValue, setRepeatPassValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setRepeatPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    repeatPassword: false,
  });

  const isNotAnEmail = !(
    validator.isEmpty(emailValue) || validator.isEmail(emailValue)
  );
  const getEmailHelperText = isNotAnEmail ? "Escribe un email válido" : "";
  const isWeak = !(
    validator.isEmpty(passValue) || validator.isStrongPassword(passValue)
  );
  const getPassHelperText = isWeak ? (
    <>
      <p>
        La contraseña debe tener:
        <br />
        &ensp;• Al menos 8 caracteres.
        <br />
        &ensp;• Al menos 1 minúscula.
        <br />
        &ensp;• Al menos 1 mayúscula.
        <br />
        &ensp;• Al menos 1 número.
        <br />
        &ensp;• Al menos 1 símbolo.
      </p>
    </>
  ) : (
    ""
  );
  const isNotTheSame = !(
    validator.isEmpty(repeatPassValue) || repeatPassValue === passValue
  );
  const getRepeatPassHelperText = isNotTheSame
    ? "Las contraseñas no coinciden."
    : "";

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
    setErrors({
      ...errors,
      email: false,
    });
  };

  const handlePassChange = (event) => {
    setPassValue(event.target.value);
    setErrors({
      ...errors,
      password: false,
    });
  };

  const handleRepeatPassChange = (event) => {
    setRepeatPassValue(event.target.value);
    setErrors({
      ...errors,
      repeatPassword: false,
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleShowRepeatPassword = () => setRepeatPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  {/**handle password strength */ }
  const [passValue, setPassValue] = useState("");
  const isWeak = !(validator.isEmpty(passValue) || validator.isStrongPassword(passValue))
  const getPassHelperText = isWeak ?
    <>
      <p>
        La contraseña debe tener:
        <br />&ensp;• Al menos 8 caracteres.
        <br />&ensp;• Al menos 1 minúscula.
        <br />&ensp;• Al menos 1 mayúscula.
        <br />&ensp;• Al menos 1 número.
        <br />&ensp;• Al menos 1 símbolo.
      </p>
    </>
    : "";
  function handlePassChange(event) {
    setPassValue(event.target.value);
  }

  {/**handle password matching */ }
  const [repeatPassValue, setRepeatPassValue] = useState("");
  const isNotTheSame = !(validator.isEmpty(repeatPassValue) || repeatPassValue === passValue)
  const getRepeatPassHelperText = isNotTheSame ? "Las contraseñas no coinciden." : "";
  function handleRepeatPassChange(event) {
    setRepeatPassValue(event.target.value);
  }


  return (
  <Container maxWidth='xs'>
    <Stack
      alignItems='center'
      spacing={3}
      sx={{ mt: 8 }}
    >
      {/**Logo and title stack */}
      <Stack
        alignItems='center'
        spacing={{ xs: 3, sm: 5 }}>
        <Box sx={{ maxWidth: { xs: 60, sm: 100 } }}>
          <img src={logo} alt="brandLogo" style={{ maxWidth: '100%' }} />
        </Box>
        <Typography
          variant="h1">
          Crear cuenta
        </Typography>
      </Stack>
      {/**Form stack */}
      <Stack
        alignItems='center'
        spacing={2}
        className="border-grad"
        sx={{ p: 3 }}>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={emailValue}
          helperText={getEmailHelperText}
          onChange={handleEmailChange}
          error={isNotAnEmail}
          sx={{ width: { xs: '225px', sm: '300px' } }}
        />
        <TextField
          id='password'
          label='Contraseña'
          value={passValue}
          helperText={getPassHelperText}
          onChange={handlePassChange}
          error={isWeak}
          type={showPassword ? 'text' : 'password'}
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
          sx={{ width: { xs: '225px', sm: '300px' } }}
        />
        <TextField
          id='repeatPassword'
          label='Repetir contraseña'
          value={repeatPassValue}
          helperText={getRepeatPassHelperText}
          onChange={handleRepeatPassChange}
          error={isNotTheSame}
          type={showRepeatPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowRepeatPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: '225px', sm: '300px' } }}
        />
        <Button
          size="large"
          sx={{
            px: 3,
            display: 'block',
            color: 'white',
            backgroundColor: contrastGreen
          }}>
          <Typography
            variant="h2"

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailError = validator.isEmpty(emailValue);
    const passwordError = validator.isEmpty(passValue);
    const repeatPasswordError = validator.isEmpty(repeatPassValue);

    if (emailError || passwordError || repeatPasswordError) {
      setErrors({
        email: emailError,
        password: passwordError,
        repeatPassword: repeatPasswordError,
      });
      return;
    }

    if (isNotAnEmail || isWeak || isNotTheSame) {
      console.log("Por favor, corrija los errores en el formulario.");
      return;
    }

    const email = emailValue;
    const password = passValue;

    try {
      const userId = await userService.createUser(email, password);
      if (userId) {
        window.alert("Usuario creado", userId);
      } else {
        window.alert("Error al crear el usuario.");
      }
    } catch (error) {
      window.alert("Error al crear el usuario:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Stack alignItems="center" spacing={3} sx={{ mt: 8 }}>
        <Stack alignItems="center" spacing={{ xs: 3, sm: 5 }}>
          <Box sx={{ maxWidth: { xs: 60, sm: 100 } }}>
            <img src={logo} alt="brandLogo" style={{ maxWidth: "100%" }} />
          </Box>
          <Typography variant="h1">Crear cuenta</Typography>
        </Stack>
        <Stack
          alignItems="center"
          spacing={2}
          className="border-grad"
          sx={{ p: 3 }}
        >
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={emailValue}
            helperText={
              errors.email
                ? "El campo de email es obligatorio"
                : getEmailHelperText
            }
            onChange={handleEmailChange}
            error={errors.email || isNotAnEmail}
            sx={{ width: { xs: "225px", sm: "300px" } }}
          />
          <TextField
            id="password"
            label="Contraseña"
            value={passValue}
            helperText={
              errors.password
                ? "El campo de contraseña es obligatorio"
                : getPassHelperText
            }
            onChange={handlePassChange}
            error={errors.password || isWeak}
            type={showPassword ? "text" : "password"}
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
          <TextField
            id="repeatPassword"
            label="Repetir contraseña"
            value={repeatPassValue}
            helperText={
              errors.repeatPassword
                ? "El campo de repetir contraseña es obligatorio"
                : getRepeatPassHelperText
            }
            onChange={handleRepeatPassChange}
            error={errors.repeatPassword || isNotTheSame}
            type={showRepeatPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleShowRepeatPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: { xs: "225px", sm: "300px" } }}
          />
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
            Crear
          </Typography>
        </Button>
        <Link
          component="button"
          variant='body2'
          to="/auth/login"
        >
          <Typography
            variant="info"
          >
            ¿Ya tenés una cuenta?
          </Typography>
        </Link>
      </Stack>
    </Stack>
  </Container>
  )
            <Typography variant="h2">Crear</Typography>
          </Button>
          <Link component="button" variant="body2" to="/auth/login">
            <Typography variant="info">¿Ya tenés una cuenta?</Typography>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
}
