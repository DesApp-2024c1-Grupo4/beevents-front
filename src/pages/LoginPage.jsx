import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Container, CssBaseline, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import logo from '../assets/abreviatura.png'

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
  //const [needToRecoverPassword, setNeedToRecoverPassword] = useState(false);
  //const [userCreatedAccount, setUserCreatedAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  var needToRecoverPassword = false
  var userCreatedAccount = false

  return userHasAnAccount &&
    <Container maxWidth='xs' sx={{ }}>
      <Stack alignItems='center' spacing={2}>
        <Box sx={{ maxWidth: { xs: 60, sm: 100 } }}>
          <img src={logo} alt="brandLogo" style={{ maxWidth: '100%' }} />
        </Box>
        <Typography variant="title" sx={{ textAlign: 'center' }}>
          Iniciar sesión
        </Typography>
      </Stack>
      <Stack alignItems='center' spacing={2} sx={{ mx: 5, my: 3 }}>
        <TextField
          id="outlined-basic"
          label="Usuario"
          variant="outlined"
        />
        <FormControl variant="outlined">
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
      </Stack>

    </Container>
}