import { Box, Stack, Typography } from "@mui/material";
//import XIcon from '@mui/icons-material/X';
//import InstagramIcon from '@mui/icons-material/Instagram';
//import YouTubeIcon from '@mui/icons-material/YouTube';
import { customMuiTheme } from "../config/customMuiTheme";
import logo from '../assets/abreviatura.png'

function BrandingAndCopyright() {
  return <>
    <Stack
      direction="column"
      justifyContent={{ xs: 'center', sm: 'flex-start' }}
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      spacing={0}
      sx={{backgroundColor: 'green'}}>
      <img
        src={logo}
        alt="brandLogo"
        style={{ maxWidth: 60 }} />
      <Typography
        sx={{ fontSize: '0.8rem', mt: 2, color: 'whitesmoke', backgroundColor: 'blue'}}>
        © Todos los derechos reservados
      </Typography>
    </Stack>
  </>
    ;
}

function ContactAndFollow() {
  return <>
    <Stack 
      direction= {{ sm: 'row'}} 
      alignItems= {{ xs: 'center', sm: 'flex-start' }}
      sx={{backgroundColor: 'green'}}>
      <Stack 
        alignItems= {{ xs: 'center', sm: 'flex-start' }}
        sx={{backgroundColor:'grey', mt: {xs: 2, sm: 0 }}}>
        <Typography
          sx={{ fontSize: '0.8rem', mb: 1, color: 'whitesmoke' }}>
          Contacto
        </Typography>
        <Typography
          sx={{ fontSize: '0.8rem', color: 'whitesmoke' }}>
          ejemplo@mail.com
        </Typography>
        <Typography
          sx={{ fontSize: '0.8rem', mt: 1, color: 'whitesmoke' }}>
          +54 11 3295 1030
        </Typography>
      </Stack>
      <Stack
        sx={{backgroundColor:'grey', mt: {xs: 2, sm: 0 }}}>
        <Typography
          sx={{ fontSize: '0.8rem', mb: 1, color: 'whitesmoke' }}>
          Seguinos
        </Typography>
        <Stack 
          direction= 'row'
          justifyContent='space-between'
          sx={{backgroundColor:'blue'}}>
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
      direction={{ sm: 'row' }}
      justifyContent='space-between'
      alignItems={{ sm: 'flex-start' }}>
      <BrandingAndCopyright />
      <ContactAndFollow />
    </Stack>
  </>
    ;
}