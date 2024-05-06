import { Box, Stack } from "@mui/material";
import { cyan, teal } from "@mui/material/colors";

export function WeatherIndicator({ weatherData }) {
  return <Stack direction='row' alignItems='center' sx={{ width: '100%', height: { xs: '3rem', md: '4rem' }, backgroundColor: cyan[200], pl: 4 }}>
    { weatherData && <>
      <Box sx={{ typography: {xs: 'subtitle1', lg: 'subtitle2'}, mr: 3 }}>{weatherData.currentConditions.temp}&deg; temp.</Box>
      <Box sx={{ typography: {xs: 'subtitle1', lg: 'subtitle2'} }}>{weatherData.currentConditions.humidity}% humedad</Box>
    </>}
  </Stack>;
}