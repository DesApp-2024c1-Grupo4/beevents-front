import { Box, Stack } from "@mui/material";
import { cyan } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";

function MenuOption({ path, label }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return <Box 
    sx={{ typography: pathname === path ? 'topMenuSelected' : 'topMenu', mr: 8 }} 
    onClick={() => navigate(path)}
  >
    {label}
  </Box>;
}

export function TopMenu() {
  return <Stack direction='row' alignItems='center' sx={{ width: '100%', height: '4rem', backgroundColor: cyan[700], pl: 4 }}>
    <MenuOption path='/films' label='Películas' />
    <MenuOption path='/actors' label='Actores' />
  </Stack>;
}