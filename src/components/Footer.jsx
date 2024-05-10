import { Stack, Typography } from "@mui/material";
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
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
        © 2024 BeEvents. Todos los derechos reservados.
      </Typography>
    </Stack>
  </>
    ;
}

function ContactAndFollow() {
  const { iconGrey } = customMuiTheme.colors

  return <>
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      spacing={2}
    >
      {/**Contact stack*/}
      <Stack
        alignItems={{ xs: 'center', sm: 'flex-start' }}
      >
        <Typography
          variant="footerTitle">
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
          variant="footerTitle">
          Seguinos
        </Typography>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <InstagramIcon sx={{ color: iconGrey }}></InstagramIcon>
          <YouTubeIcon sx={{ color: iconGrey }}></YouTubeIcon>
          <XIcon sx={{ color: iconGrey }} fontSize="small"></XIcon>
        </Stack>
      </Stack>
    </Stack>
  </>
    ;
}

export function Footer() {
  const { softGrey, contrastGreen } = customMuiTheme.colors

  return <>
    <Stack
      sx={{ backgroundColor: softGrey, padding: 4 }}
      direction={{ xs: 'column-reverse', sm: 'row' }}
      justifyContent={{ sm: 'space-evenly' }}
      spacing={{ xs: 2, sm: 0 }}
    >
      <BrandingAndCopyright />
      <Stack sx={{
        width: "1.5px",
        background: `linear-gradient(to bottom, ${softGrey}, ${contrastGreen})`
        }}>
      </Stack>
      <ContactAndFollow />
    </Stack>
  </>
    ;
}