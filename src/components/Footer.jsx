import { Box, Stack, Typography } from "@mui/material";
//import XIcon from '@mui/icons-material/X';
//import InstagramIcon from '@mui/icons-material/Instagram';
//import YouTubeIcon from '@mui/icons-material/YouTube';
import { customMuiTheme } from "../config/customMuiTheme";
import logo from '../assets/abreviatura.png'

function BrandingAndCopyright() {
  return <>
    <Stack
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      spacing={2}
      >
      <img
        src={logo}
        alt="brandLogo"
        style={{ maxWidth: 60 }} />
      <Typography
        sx={{ fontSize: '0.8rem', color: 'whitesmoke' }}>
        © Todos los derechos reservados
      </Typography>
    </Stack>
  </>
    ;
}

function ContactAndFollow() {
  return <>
    <Stack
      direction={{xs: 'column', sm: 'row'}}
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      spacing={2}
      >
      {/**Contact stack*/}
      <Stack
        alignItems={{ xs: 'center', sm: 'flex-start' }}
        >
        <Typography
          sx={{ fontSize: '0.8rem', color: 'whitesmoke' }}>
          Contacto
        </Typography>
        <Typography
          sx={{ fontSize: '0.8rem', mt: 1.5, mb: 1, color: 'whitesmoke' }}>
          ejemplo@mail.com
        </Typography>
        <Typography
          sx={{ fontSize: '0.8rem', color: 'whitesmoke' }}>
          +54 11 3295 1030
        </Typography>
      </Stack>
      {/**Follow us stack*/}
      <Stack
        spacing={1.5}
        >
        <Typography
          sx={{ fontSize: '0.8rem', color: 'whitesmoke' }}>
          Seguinos
        </Typography>
        <Stack
          direction='row'
          justifyContent='space-between'
          >
          <Typography
            sx={{ fontSize: '0.8rem', color: 'whitesmoke' }}>
            Ig
          </Typography>
          <Typography
            sx={{ fontSize: '0.8rem', color: 'whitesmoke' }}>
            Yt
          </Typography>
          <Typography
            sx={{ fontSize: '0.8rem', color: 'whitesmoke' }}>
            X
          </Typography>
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
      direction={{xs: 'column-reverse', sm: 'row'}}
      justifyContent={{sm: 'space-evenly'}}
      spacing={{xs: 2, sm: 0}}
      >

      <BrandingAndCopyright />
      <ContactAndFollow />
    </Stack>
  </>
    ;
}