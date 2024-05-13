import { Box, Stack, Typography } from "@mui/material";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { customMuiTheme } from "../config/customMuiTheme";
import logo from '../assets/abreviatura.png'

function BrandingAndCopyright() {
  return <>
    <Stack alignItems={{ xs: 'center', sm: 'flex-start' }} spacing={2}>
      <Box sx={{ maxWidth: { xs: 60, sm: 100} }}>
        <img src={logo} alt="brandLogo" style={{maxWidth: '100%'}}/>
      </Box>
      <Typography variant="footerFont" sx={{ textAlign: { xs: 'center', sm: 'left'} }}>
        © 2024 BeEvents. Todos los derechos reservados.
      </Typography>
    </Stack>
  </>
    ;
}

function ContactAndFollow() {
  const { softGrey, contrastGreen, iconGrey } = customMuiTheme.colors

  return <>
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      spacing={{xs: 2, md: 5}}
    >
      {/**Divisory line*/}
      <Stack 
        sx={{
          width: "1.5px",
          height: '100%',
          background: `linear-gradient(to bottom, ${softGrey}, ${contrastGreen})`
        }}
      >
      </Stack>
      {/**Contact stack*/}
      <Stack alignItems={{ xs: 'center', sm: 'flex-start' }}>
        <Typography variant="footerTitle">
          Contacto
        </Typography>
        <Typography variant="footerFont" sx={{ mt: 1.5, mb: 1 }}>
          ejemplo@mail.com
        </Typography>
        <Typography variant="footerFont">
          +54 11 3295 1030
        </Typography>
      </Stack>
      {/**Follow us stack*/}
      <Stack alignItems={{ xs: 'center', sm: 'flex-start' }} spacing={1.5}>
        <Typography variant="footerTitle">
          Seguinos
        </Typography>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <InstagramIcon sx={{ color: iconGrey }}></InstagramIcon>
          <YouTubeIcon sx={{ color: iconGrey, mx: 2}}></YouTubeIcon>
          <XIcon sx={{ color: iconGrey }} fontSize="small"></XIcon>
        </Stack>
      </Stack>
    </Stack>
  </>
    ;
}

export function Footer() {
  const { softGrey } = customMuiTheme.colors

  return <>
    <Stack
      sx={{ backgroundColor: softGrey, padding: 4 }}
      direction={{ xs: 'column-reverse', sm: 'row' }}
      justifyContent={{ sm: 'space-between', lg: 'space-around' }}
      spacing={ 4 }
    >
      <BrandingAndCopyright />
      <ContactAndFollow />
    </Stack>
  </>
    ;
}