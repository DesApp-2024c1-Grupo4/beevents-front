import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import logo from '../assets/abreviatura.png'
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
  const [userHasAnAccount, setUserHasAnAccount] = useState(true);
  const [needToRecoverPassword, setNeedToRecoverPassword] = useState(false);
  //const [userCreatedAccount, setUserCreatedAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { oceanicBlue, contrastGreen } = customMuiTheme.colors

  {/**
    sx={{ backgroundColor: 'white' }}
  */}

  return userHasAnAccount && !needToRecoverPassword &&
    <Container
      maxWidth='xs'
      >
      <Stack
        alignItems='center'
        spacing={2}
        >
        {/**Logo and title stack */}
        <Stack
          alignItems='center'
          spacing={2}>
          <Box sx={{ maxWidth: { xs: 60, sm: 100 } }}>
            <img src={logo} alt="brandLogo" style={{ maxWidth: '100%' }} />
          </Box>
          <Typography
            variant="title">
            Iniciar sesión
          </Typography>
        </Stack>
        {/**Form stack */}
        <Box
          sx={{
            background: `linear-gradient(to bottom, ${contrastGreen}, black)`,
            borderRadius: '10px'
          }}>
          <Stack
            alignItems='center'
            spacing={2}
            sx={{
              p: 3,
              m: '1px',
              borderRadius: '10px',
              backgroundColor: oceanicBlue
            }}>
            <TextField
              id="outlined-basic"
              label="Usuario"
              variant="outlined"
              sx={{ maxWidth: '225px' }}
            />
            <FormControl
              variant="outlined"
              sx={{ maxWidth: '225px' }}>
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
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
                }
                label="Password"
              />
            </FormControl>
            <Link
              component="button"
              variant='body2'
              onClick={() => { }}
            >
              <Typography
                variant="info"
                >
                ¿Olvidaste tu contraseña?
              </Typography>
            </Link>
            <Button
              variant="contained"
              size="medium">
              <Typography
                variant="title"
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
                onClick={() => { }}
              >
                <Typography
                  variant="info"
                  >
                  Crea tu cuenta
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </Box>

      </Stack>

    </Container>
}