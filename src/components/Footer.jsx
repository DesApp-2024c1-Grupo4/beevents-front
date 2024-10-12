import { Box, Link, Stack, Typography } from "@mui/material";
import { customMuiTheme } from "../config/customMuiTheme";
import logo from '../assets/img/abreviatura.png'
import { GitHub, Mail } from "@mui/icons-material";

function BrandingAndCopyright() {
  return <>
    <Stack alignItems={{ xs: 'center', sm: 'flex-start' }} spacing={1}>
      <Box sx={{ maxWidth: { xs: 60, sm: 100 } }}>
        <img src={logo} alt="brandLogo" style={{ maxWidth: '100%' }} />
      </Box>
      <Typography variant="footerFont" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
        © 2024 BeEvents.
      </Typography>
      <Typography variant="footerFont" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
        Todos los derechos reservados.
      </Typography>
    </Stack>
  </>
    ;
}

function ContactAndFollow() {
  const { softGrey, contrastGreen } = customMuiTheme.colors

  return <>
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      spacing={{ xs: 3, md: 5 }}
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
      {/*G4 stack*/}
      <Stack alignItems={{ xs: 'center', sm: 'flex-start' }} >
        <Typography variant="footerTitle">
          Creación y desarrollo
        </Typography>
        <Link
          href="https://github.com/DesApp-2024c1-Grupo4"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            py: 1,
            "&:hover": { color: contrastGreen }
          }}
        >
          <GitHub />
          <Typography variant="footerFont">
            Grupo 4:
          </Typography>
        </Link>
        <Link
          href="https://github.com/hernanconiglio"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          sx={{
            "&:hover": { color: contrastGreen },
            pl: { xs: 0, sm: 4 }
          }}
        >
          <Typography variant="footerFont">
            Hernán Coniglio
          </Typography>
        </Link>
        <Link
          href="https://github.com/LucasBonadeo"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          sx={{
            "&:hover": { color: contrastGreen },
            pl: { xs: 0, sm: 4 }
          }}
        >
          <Typography variant="footerFont">
            Lucas Bonadeo
          </Typography>
        </Link>
        <Link
          href="https://github.com/matiashmuller"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          sx={{
            "&:hover": { color: contrastGreen },
            pl: { xs: 0, sm: 4 }
          }}
        >
          <Typography variant="footerFont">
            Matías Müller
          </Typography>
        </Link>
        <Link
          href="https://github.com/mauriciopintos"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          sx={{
            "&:hover": { color: contrastGreen },
            pl: { xs: 0, sm: 4 }
          }}
        >
          <Typography variant="footerFont">
            Mauricio Pintos
          </Typography>
        </Link>
        <Link
          href="https://github.com/SilvanaMFarias"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          sx={{
            "&:hover": { color: contrastGreen },
            pl: { xs: 0, sm: 4 }
          }}
        >
          <Typography variant="footerFont">
            Silvana Farías
          </Typography>
        </Link>
      </Stack>
      {/**Contact stack*/}
      <Stack alignItems={{ xs: 'center', sm: 'flex-start' }}>
        <Typography variant="footerTitle">
          Contacto
        </Typography>
        <Link
          href="mailto:beevents.contacto@gmail.com"
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            py: 1,
            "&:hover": { color: contrastGreen }
          }}
        >
          <Mail/>
          <Typography variant="footerFont">
            beevents.contacto@gmail.com
          </Typography>
        </Link>
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
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent={{ sm: 'space-between', lg: 'space-around' }}
    >
      <BrandingAndCopyright />
      <ContactAndFollow />
    </Stack>
  </>
    ;
}