import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import logo from '../assets/img/abreviatura.png'
import { Link } from "react-router-dom";
import { customMuiTheme } from "../config/customMuiTheme";
import validator from "validator";

export function RegisterPage() {
  const { contrastGreen } = customMuiTheme.colors

  {/**handle show passwords and icons */}
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setRepeatPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleShowRepeatPassword = () => setRepeatPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  {/**handle email error */}
  const [emailValue, setEmailValue] = useState("");
  const hasError = !validator.isEmpty(emailValue) && !validator.isEmail(emailValue)
  const getEmailHelperText = hasError ? "Escribe un email válido" : "";
  function handleEmailChange(event) {
    setEmailValue(event.target.value);
  }

  return <Container
    maxWidth='xs'
  >
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
          error={hasError}
          sx={{ width: { xs: '225px', sm: '300px' } }}
        />
        <TextField
          id='password'
          label='Contraseña'
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
}