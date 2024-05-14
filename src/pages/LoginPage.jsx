import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField } from "@mui/material";
import { useState } from "react";

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
    <Container maxWidth='xs' >
      <Stack alignItems='center'>
        <TextField
          id="outlined-basic"
          label="Usuario"
          variant="outlined"
          sx={{ m: 1 }}
        />
        <FormControl sx={{ m: 1 }} variant="outlined">
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