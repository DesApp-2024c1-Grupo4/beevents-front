import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import logo from '../assets/img/abreviatura.png'
import { Link } from "react-router-dom";
import { customMuiTheme } from "../config/customMuiTheme";

function CreateAccountForm() {
  return <>
  </>
}

function RecoverPasswordForm() {
  return <>
  </>
}

function AccountCreatedSuccessfully() {
  return <>
  </>
}

export function LoginPage() {

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const { contrastGreen } = customMuiTheme.colors

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
          Iniciar sesión
        </Typography>
      </Stack>
      {/**Form stack */}
      <Stack
        alignItems='center'
        spacing={2}
        className="border-grad"
        sx={{ p: 3 }}>
        <TextField
          id="user"
          label="Usuario"
          variant="outlined"
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
        <Link
          component="button"
          variant='body2'
        >
          <Typography
            variant="info"
          >
            ¿Olvidaste tu contraseña?
          </Typography>
        </Link>
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
            Ingresar
          </Typography>
        </Button>
        <Stack alignItems='center'>
          <Typography
            variant="info"
          >
            ¿Nuev@ en BeEvents?
          </Typography>
          <Link
            component="button"
            variant='body2'
            to="/auth/register"
          >
            <Typography
              variant="info"
            >
              Crea tu cuenta
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Stack>
  </Container>
}