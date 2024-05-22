import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import logo from '../../assets/img/abreviatura.png'
import { Link } from "react-router-dom";
import { customMuiTheme } from "../../config/customMuiTheme";
import validator from "validator";

export function RecoverPage() {
  const { contrastGreen } = customMuiTheme.colors

  {/**handle email error */ }
  const [emailValue, setEmailValue] = useState("");
  const isNotAnEmail = !(validator.isEmpty(emailValue) || validator.isEmail(emailValue))
  const getEmailHelperText = isNotAnEmail ? "Escribe un email válido" : "";
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
          variant="h1"
        >
          Recuperar contraseña
        </Typography>
      </Stack>
      {/**Form stack */}
      <Stack
        alignItems='center'
        spacing={2}
        className="border-grad"
        sx={{ p: 3 }}
      >
        <Typography
          variant="info"
          sx={{ textAlign: 'center'}}
        >
          Ingresa el email con el que te registraste. 
          Te vamos a enviar un correo para reestablecer tu contraseña.
        </Typography>
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
            Recuperar
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
            ¿La recordaste?
          </Typography>
        </Link>
      </Stack>
    </Stack>
  </Container>
}