import { Stack } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import logo from '../assets/logo.png'

function BrandingAndCopyright() {
  return <>
    <Stack direction='column' justifyContent='flex-end' sx={{backgroundColor: "blue"}}>
      <img
        src= {logo}
        alt="brandLogo" 
        style={{maxWidth: 200}}/>
      <p>©Todos los derechos reservados</p>
    </Stack>
  </>
  ;
}

export function Footer() {
  const { softGrey } = customMuiTheme.colors

  return <>
    <Stack
      sx={{backgroundColor: softGrey }}
      direction='row' 
      justifyContent='space-around' 
      alignItems='center'>
      <BrandingAndCopyright />
      <BrandingAndCopyright />
    </Stack>
  </>
  ;
}