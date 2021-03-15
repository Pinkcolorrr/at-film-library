import firebase from 'firebase/app';
import 'firebase/firestore';
import { AnyAction, Unsubscribe } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Planet } from '../../models/Planet';
import { RequestOptions } from '../../models/RequestOptions';
import {
  setIsHaveMoreData,
  pushPlanetsInStore,
  removePlanetsFromStore,
  setPlanetsInStore,
} from '../../store/Planets/planetsThunks';
import { firebaseConverter } from '../../utils/FirebaseConverters';
import { getChunkedArray, PaginationControl } from '../../utils/utils';
import { PlanetDTO } from '../dtos/PlanetDto';
import { PlanetMapper } from '../mappers/PlanetMapper';

const planetMapper = new PlanetMapper();
const paginationControl = new PaginationControl();

function snapshotRequset(
  doc: firebase.firestore.QuerySnapshot<PlanetDTO>,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
): void {
  if (doc.size === 0) {
    dispatch(setIsHaveMoreData(false));
    return;
  }

  const addedDocs: Planet[] = [];
  const modifiedDocs: Planet[] = [];
  const removedDocs: Planet[] = [];

  doc.docChanges().forEach((planet) => {
    switch (planet.type) {
      case 'modified': {
        modifiedDocs.push(planetMapper.transformResponse(planet.doc.data(), planet.doc.id));
        break;
      }
      case 'removed': {
        removedDocs.push(planetMapper.transformResponse(planet.doc.data(), planet.doc.id));
        break;
      }
      case 'added':
      default: {
        addedDocs.push(planetMapper.transformResponse(planet.doc.data(), planet.doc.id));
        break;
      }
    }
  });

  if (addedDocs.length) {
    paginationControl.setLastDoc(doc.docs[doc.docs.length - 1]);
    dispatch(pushPlanetsInStore(addedDocs));
  }
  if (modifiedDocs.length) {
    dispatch(setPlanetsInStore(modifiedDocs));
  }
  if (removedDocs.length) {
    dispatch(removePlanetsFromStore(removedDocs));
  }
}

export const PlanetAPI = {
  async getPlanetsByPk(pkArray: (number | string)[]): Promise<Planet[]> {
    if (pkArray.length > 10) {
      const chunkedArr: (string | number)[][] = getChunkedArray(pkArray, 10);
      const charactersData: Planet[][] & Planet[] = [];

      for (const item of chunkedArr) {
        charactersData.push(await this.getPlanetsByPk(item));
      }

      return charactersData.flat(Infinity);
    }

    return firebase
      .firestore()
      .collection('planets')
      .where('pk', 'in', pkArray)
      .withConverter(firebaseConverter<PlanetDTO>())
      .get()
      .then((planets) => {
        const planetsData: Planet[] = [];
        planets.forEach((planet) => {
          planetsData.push(planetMapper.transformResponse(planet.data(), planet.id));
        });
        return planetsData;
      });
  },

  async getPlanetById(id: string): Promise<Planet> {
    return firebase
      .firestore()
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .doc(id)
      .get()
      .then((planet) => planetMapper.transformResponse(planet.data() as PlanetDTO, planet.id));
  },

  async getPlanetByName(name: string): Promise<Planet> {
    return firebase
      .firestore()
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .where('fields.name', '==', name)
      .get()
      .then((planet) => planetMapper.transformResponse(planet.docs[0].data(), planet.docs[0].id));
  },

  getInitialPlanets(
    { chunkSize, sortTarget }: RequestOptions,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  ): Unsubscribe {
    return firebase
      .firestore()
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .orderBy(sortTarget)
      .limit(chunkSize)
      .onSnapshot((doc: firebase.firestore.QuerySnapshot<PlanetDTO>) => {
        snapshotRequset(doc, dispatch);
      });
  },

  getNextPlanets(
    { chunkSize, sortTarget }: RequestOptions,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  ): Unsubscribe {
    return firebase
      .firestore()
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .orderBy(sortTarget)
      .startAfter(paginationControl.getLastDoc())
      .limit(chunkSize)
      .onSnapshot((doc: firebase.firestore.QuerySnapshot<PlanetDTO>) => {
        snapshotRequset(doc, dispatch);
      });
  },
};
