import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography, Box, styled } from "@mui/material";
import { cyan, teal } from "@mui/material/colors";
import { useEffect } from "react";
import { getAllFilms } from "../services/FilmService";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../store/store";

function ColoredLineTableCell(props) {
  return <TableCell sx={{ borderBottomColor: teal[300], borderBottomWidth: 2, ...(props.sx || {}) }} {...props} />;
}

function FilmRow({ film, isLast }) {
  const CellClass = isLast ? TableCell : ColoredLineTableCell;
  return <TableRow>
    <CellClass>{ film.name }</CellClass>
    <CellClass>{ film.year }</CellClass>
    <CellClass>{ film.genre }</CellClass>
    <CellClass>{ film.director }</CellClass>
  </TableRow>
}

function TableOfFilms() {
  const films = useSelector(state => state.films.films);

return <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <ColoredLineTableCell>Nombre</ColoredLineTableCell>
          <ColoredLineTableCell>Año</ColoredLineTableCell>
          <ColoredLineTableCell>Género</ColoredLineTableCell>
          <ColoredLineTableCell>Director</ColoredLineTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { films.map((film, ix) => (
          <FilmRow key={film.id} film={film} isLast={ix === films.length - 1} />
        )) }
      </TableBody>
    </Table>
  </TableContainer>;
}

export function ListOfFilms() {
  const reduxDispatch = useDispatch();
  const allFilms = useSelector(state => state.films.films);

  useEffect(() => {
    const fetchAllFilms = async () => {
      const obtainedFilms = await getAllFilms();
      reduxDispatch(storeActions.films.setAllFilms(obtainedFilms));
    }
    fetchAllFilms();
  }, []);

  return allFilms && <Stack direction='column'>
    <Typography variant='h4'>Películas</Typography>
    <Box sx={{ mt: 4 }}>
      <Paper elevation={4} sx={{ borderStyle: 'solid', borderWidth: '4px', borderColor: cyan[700]}}>
        <TableOfFilms />
      </Paper>
    </Box>
  </Stack>;
}

