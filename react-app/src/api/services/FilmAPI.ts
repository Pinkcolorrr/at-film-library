import firebase from 'firebase/app';
import 'firebase/firestore';
import { AnyAction, Unsubscribe } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Film } from '../../models/Film';
import { addFilmsInStore } from '../../store/Films/filmsThunks';
import { firebaseConverter } from '../../utils/FirebaseConverters';
import { FilmDTO } from '../dtos/FilmDto';
import { FilmMapper } from '../mappers/FilmMapper';

const filmMapper = new FilmMapper();

export const FilmAPI = {
  getAllFilms(dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Unsubscribe {
    return firebase
      .firestore()
      .collection('films')
      .withConverter(firebaseConverter<FilmDTO>())
      .onSnapshot((doc: firebase.firestore.QuerySnapshot<FilmDTO>): void => {
        const filmsData: Film[] = [];

        doc.forEach((film) => filmsData.push(filmMapper.transformResponse(film.data(), film.id)));
        dispatch(addFilmsInStore(filmsData));
      });
  },

  async getFilmById(id: string): Promise<Film> {
    return await firebase
      .firestore()
      .collection('films')
      .withConverter(firebaseConverter<FilmDTO>())
      .doc(id)
      .get()
      .then((film) => filmMapper.transformResponse(film.data() as FilmDTO, film.id));
  },
};
