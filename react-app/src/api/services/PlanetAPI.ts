import firebase from 'firebase/app';
import 'firebase/firestore';
import { AnyAction, Unsubscribe } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Planet } from '../../models/Planet';
import { RequestOptions } from '../../models/RequestOptions';
import {
  setIsHaveMorePlanets,
  pushPlanetsInStore,
  setPlanetsInStore,
  removePlanetsFromStore,
  setLastPlanetId,
} from '../../store/Planets/planetsThunks/storeThunks';
import { firebaseConverter } from '../../utils/FirebaseConverters';
import { getChunkedArray } from '../../utils/utils';
import { PlanetDTO } from '../dtos/PlanetDto';
import { PlanetMapper } from '../mappers/PlanetMapper';

function snapshotResponse(
  doc: firebase.firestore.QuerySnapshot<PlanetDTO>,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
): void {
  if (doc.size === 0) {
    dispatch(setIsHaveMorePlanets(false));
    return;
  }

  const addedDocs: Planet[] = [];
  const modifiedDocs: Planet[] = [];
  const removedDocs: Planet[] = [];

  doc.docChanges().forEach((planet) => {
    switch (planet.type) {
      case 'modified': {
        modifiedDocs.push(PlanetMapper.transformResponse(planet.doc.data(), planet.doc.id));
        break;
      }
      case 'removed': {
        removedDocs.push(PlanetMapper.transformResponse(planet.doc.data(), planet.doc.id));
        break;
      }
      case 'added':
      default: {
        addedDocs.push(PlanetMapper.transformResponse(planet.doc.data(), planet.doc.id));
        break;
      }
    }
  });

  if (addedDocs.length) {
    dispatch(setLastPlanetId(doc.docs[doc.docs.length - 1].id));
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
      const chunkedArr: (string | number)[][] = getChunkedArray<number | string>(pkArray, 10);
      const planetsData: Planet[][] & Planet[] = [];

      for (let i = 0; i < chunkedArr.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        planetsData.push(await this.getPlanetsByPk(chunkedArr[i]));
      }

      return planetsData.flat(Infinity);
    }

    return firebase
      .firestore()
      .collection('planets')
      .where('pk', 'in', pkArray)
      .withConverter(firebaseConverter<PlanetDTO>())
      .get()
      .then((planets) => planets.docs.map((planet) => PlanetMapper.transformResponse(planet.data(), planet.id)));
  },

  async getPlanetById(id: string): Promise<Planet> {
    return firebase
      .firestore()
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .doc(id)
      .get()
      .then((planet) => PlanetMapper.transformResponse(planet.data() as PlanetDTO, planet.id));
  },

  async getPlanetByName(name: string): Promise<Planet> {
    return firebase
      .firestore()
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .where('fields.name', '==', name)
      .get()
      .then((planet) => PlanetMapper.transformResponse(planet.docs[0].data(), planet.docs[0].id));
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
        snapshotResponse(doc, dispatch);
      });
  },

  async getNextPlanets(
    { chunkSize, sortTarget }: RequestOptions,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
    lastDocId: string,
  ): Promise<Unsubscribe> {
    const planetDoc = await firebase.firestore().collection('planets').doc(lastDocId).get();

    return firebase
      .firestore()
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .orderBy(sortTarget)
      .startAfter(planetDoc)
      .limit(chunkSize)
      .onSnapshot((doc: firebase.firestore.QuerySnapshot<PlanetDTO>) => {
        snapshotResponse(doc, dispatch);
      });
  },
};
