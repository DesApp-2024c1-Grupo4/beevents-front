const FIXED_FILMS = [
  {
    id: 1,
    name: 'Brazil', director: 'Terry Gilliam', year: 1985, genre: 'Fantasía',
    mainActors: ['Jonathan Pryce', 'Kim Greist', 'Robert de Niro', 'Michael Palin']
  },
  {
    id: 2,
    name: 'The Matrix', director: 'Lana & Lilly Wachowski', year: 1999, genre: 'Ciencia Ficción',
    mainActors: ['Keanu Reeves', 'Carrie-Anne Moss', 'Laurence Fishburne', 'Hugo Weaving']
  },
  { 
    id: 3,
    name: 'Los dos papas', director: 'Fernando Meirelles', year: 2019, genre: 'Drama biográfico',
    mainActors: ['Jonathan Pryce', 'Anthony Hopkins']
  }
];

function initFakeStorage() {
  sessionStorage.setItem('fakeFilms', JSON.stringify(FIXED_FILMS));
}

export async function getAllFilms() {
  return getAllFilmsFake();
}

export async function getAllFilmsFake() {
  return Promise.resolve(JSON.parse(sessionStorage.getItem('fakeFilms')));
}

export async function addFilm(filmSpec) {
  return addFilmFake(filmSpec);
}

async function addFilmFake(filmSpec) {
  const currentFilms = await getAllFilmsFake();
  currentFilms.push({ id: Math.max(...currentFilms.map(film => film.id)) + 1, ...filmSpec});
  sessionStorage.setItem('fakeFilms', JSON.stringify(currentFilms));
  return Promise.resolve({ added: 1 });
}

initFakeStorage();
