import firebase from 'firebase/app';
import 'firebase/firestore';
import { AnyAction, Unsubscribe } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Film } from '../../models/Film';
import { addFilmsInStore } from '../../store/Films/filmsThunks/storeThunks';
import { firebaseConverter } from '../../utils/FirebaseConverters';
import { FilmDTO } from '../dtos/FilmDto';
import { firestore } from '../firebase-config';
import { FilmMapper } from '../mappers/FilmMapper';

/** Object for work with film API */
export const FilmAPI = {
  /** Get all list of films and subscribe to updates */
  getAllFilms(dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Unsubscribe {
    return firestore
      .collection('films')
      .withConverter(firebaseConverter<FilmDTO>())
      .onSnapshot((doc: firebase.firestore.QuerySnapshot<FilmDTO>): void => {
        const filmsData: Film[] = [];

        doc.forEach((film) => filmsData.push(FilmMapper.transformResponse(film.data(), film.id)));
        dispatch(addFilmsInStore(filmsData));
      });
  },

  /** Get film from db by ID */
  async getFilmById(id: string): Promise<Film> {
    return firestore
      .collection('films')
      .withConverter(firebaseConverter<FilmDTO>())
      .doc(id)
      .get()
      .then((film) => FilmMapper.transformResponse(film.data() as FilmDTO, film.id));
  },

  /** Add film in db */
  async addFilm(film: FilmDTO): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> {
    return firestore.collection('films').add(film);
  },

  /** Edit film in db by id */
  async editFilm(film: FilmDTO, id: string): Promise<void> {
    firestore.collection('films').doc(id).set(film);
  },

  /** Remove film from db by id */
  async removeFilm(id: string): Promise<void> {
    firestore.collection('films').doc(id).delete();
  },
};
