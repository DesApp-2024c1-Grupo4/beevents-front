import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { omit } from "lodash";

const commonFieldProps = { variant: 'outlined', size: 'small', sx: {mb: 3} };

function yearMessage(value) {
  if (value.length === 0) { return null; }

  const year = Number(value);
  return isNaN(year) 
    ? 'El año tiene que ser un número'
    : (year < 1880 || year > 2050)
    ? 'El año debe estar entre 1880 y 2050'
    : null;
}

function getFilmDataToStore(newFilmDataForm) {
  return {
    ...omit(newFilmDataForm, 'mainActorsJoined'), 
    year: Number(newFilmDataForm.year),
    mainActors: newFilmDataForm.mainActorsJoined.split(',').map(actorName => actorName.trim())
  };
}

const initialFilmData = { name: '', year: '', genre: '', director: '', mainActorsJoined: '' };

export function AddFilmDialog({ open, closeAction, confirmAction }) {
  const [newFilmData, setNewFilmData] = useState(initialFilmData);

  useEffect(() => {
    if (open) {
      setNewFilmData(initialFilmData);
    }
  }, [open]);

  const formIsValid = ['name', 'year', 'genre', 'director', 'mainActorsJoined']
    .every(attr => newFilmData[attr].length > 0) && !yearMessage(newFilmData.year);

  return <Dialog open={open} maxWidth='xl'>
    <DialogTitle>
      <Box sx={{ typography: 'h5' }}>Agregar película</Box>
    </DialogTitle>
    <DialogContent sx={{ width: { xs: '14rem', sm: '24rem', md: '36rem' } }}>
      <Stack direction='column' sx={{ mx: 2, my: 2 }}>
        <TextField {...commonFieldProps}
          label='Nombre'
          value={newFilmData.name} 
          onChange={event => setNewFilmData(current => ({...current, name: event.target.value}))} 
        />
        <TextField {...commonFieldProps}
          label='Año'
          value={newFilmData.year} 
          onChange={event => setNewFilmData(current => ({...current, year: event.target.value}))} 
          error={!!yearMessage(newFilmData.year)}
          helperText={yearMessage(newFilmData.year)}
        />
        <TextField {...commonFieldProps}
          label='Género'
          value={newFilmData.genre} 
          onChange={event => setNewFilmData(current => ({...current, genre: event.target.value}))} 
        />
        <TextField {...commonFieldProps}
          label='Director'
          value={newFilmData.director} 
          onChange={event => setNewFilmData(current => ({...current, director: event.target.value}))} 
        />
        <TextField {...commonFieldProps}
          label='Actores (separados por coma)'
          value={newFilmData.mainActorsJoined} 
          onChange={event => setNewFilmData(current => ({...current, mainActorsJoined: event.target.value}))} 
        />
        <Stack direction='row' justifyContent='flex-end' sx={{mt: 2}}>
          <Button variant='contained' color='warning' size='medium' onClick={closeAction} sx={{ mr: 5 }}>
            Cancelar
          </Button>
          <Button variant='contained' color='success' size='medium' disabled={!formIsValid}
            onClick={async () => { 
              await confirmAction(getFilmDataToStore(newFilmData)); 
              closeAction(); 
            }}
          >
            Agregar
          </Button>
        </Stack>
      </Stack>
    </DialogContent>
  </Dialog>;
}