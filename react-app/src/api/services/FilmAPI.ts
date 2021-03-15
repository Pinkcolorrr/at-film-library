import firebase from 'firebase/app';
import 'firebase/firestore';
import { AnyAction, Unsubscribe } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Film } from '../../models/Film';
import { addFilmsInStore } from '../../store/Films/filmsThunks/storeThunks';
import { firebaseConverter } from '../../utils/FirebaseConverters';
import { FilmDTO } from '../dtos/FilmDto';
import { FilmMapper } from '../mappers/FilmMapper';

export const FilmAPI = {
  getAllFilms(dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Unsubscribe {
    return firebase
      .firestore()
      .collection('films')
      .withConverter(firebaseConverter<FilmDTO>())
      .onSnapshot((doc: firebase.firestore.QuerySnapshot<FilmDTO>): void => {
        const filmsData: Film[] = [];

        doc.forEach((film) => filmsData.push(FilmMapper.transformResponse(film.data(), film.id)));
        dispatch(addFilmsInStore(filmsData));
      });
  },

  async getFilmById(id: string): Promise<Film> {
    return firebase
      .firestore()
      .collection('films')
      .withConverter(firebaseConverter<FilmDTO>())
      .doc(id)
      .get()
      .then((film) => FilmMapper.transformResponse(film.data() as FilmDTO, film.id));
  },
};
