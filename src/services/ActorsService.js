import { sortBy } from "lodash";
import { getAllFilmsFake } from "./FilmService";

export async function getAllActors() {
  return getAllActorsFake();
}

const images = {
  'Jonathan Pryce': "https://mr.comingsoon.it/imgdb/persone/79985_ico.jpg",
  'Kim Greist': "https://64.media.tumblr.com/118fb2349e3b6419483599415ddb0b88/tumblr_pwhlrhfA6V1vi27yvo3_500.jpg",
  'Robert de Niro': "https://qph.cf2.quoracdn.net/main-qimg-bc0e66d553c518852ab26e0b0faebe4f-lq",
  'Michael Palin': "https://www.lismore-immrama.com/images/michaelpalin.jpg",
  'Keanu Reeves': "https://qph.cf2.quoracdn.net/main-qimg-78a45f543a05c451eb58787958fafe14-lq",
  'Carrie-Anne Moss': "https://upload.wikimedia.org/wikipedia/en/7/7a/MatrixTrinity.jpg",
  'Laurence Fishburne': "https://upload.wikimedia.org/wikipedia/en/a/ab/Morpheus.jpg",
  'Hugo Weaving': "https://upload.wikimedia.org/wikipedia/en/1/1f/Agent_Smith_%28The_Matrix_series_character%29.jpg",
  'Anthony Hopkins': "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Anthony_Hopkins-Tuscan_Sun_Festival.jpg/330px-Anthony_Hopkins-Tuscan_Sun_Festival.jpg"
};

async function getAllActorsFake() {
  const filmsData = sortBy(await getAllFilmsFake(), ['year']);
  const actorsData = filmsData.reduce((list, film) => {
    return film.mainActors.reduce((innerList, actorName) => {
      const currentRecord = innerList.find(actor => actor.name === actorName);
      if (currentRecord) {
        currentRecord.films.push(film);
        return innerList;
      } else {
        return [...innerList, 
          { id: innerList.length + 1, name: actorName, image: images[actorName], films: [film] }
        ];
      }
    }, list)
  }, []);
  return Promise.resolve(actorsData);
}

