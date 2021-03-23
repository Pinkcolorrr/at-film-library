import firebase from 'firebase/app';
import 'firebase/firestore';
import { AnyAction, Unsubscribe } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Planet } from '../../models/Planet';
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
import { RequestOptionsDTO } from '../dtos/RequestOptionsDto';
import { firestore } from '../firebase-config';
import { PlanetMapper } from '../mappers/PlanetMapper';

/** Function for processesing response from server */
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

/** Object for work with planet API */
export const PlanetAPI = {
  /** Get all list of planets */
  async getAllPlanets(): Promise<Planet[]> {
    return firestore
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .get()
      .then((planets) => planets.docs.map((planet) => PlanetMapper.transformResponse(planet.data(), planet.id)));
  },

  /** Get planets and subscribe to their updates */
  async getPlanets(
    { chunkSize, sortTarget }: RequestOptionsDTO,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
    lastDocId?: string,
  ): Promise<Unsubscribe> {
    const planetDoc = await firestore.collection('planets').doc(lastDocId).get();

    const requset = firestore
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .orderBy(sortTarget)
      .limit(chunkSize);

    return planetDoc.data()
      ? requset.startAfter(planetDoc).onSnapshot((doc: firebase.firestore.QuerySnapshot<PlanetDTO>) => {
          snapshotResponse(doc, dispatch);
        })
      : requset.onSnapshot((doc: firebase.firestore.QuerySnapshot<PlanetDTO>) => {
          snapshotResponse(doc, dispatch);
        });
  },

  /**
   * Get related planets data
   * Frebase cannot get more then 10 item by 1 requset.
   * So we have to chunked array and make multiple requests.
   */
  async getPlanetsByPk(pkArray: (number | string)[]): Promise<Planet[]> {
    if (pkArray.length > 10) {
      const chunkedArr: (string | number)[][] = getChunkedArray(pkArray, 10);
      const promises: Promise<Planet[]>[] = [];

      for (let i = 0; i < chunkedArr.length; i++) {
        promises.push(this.getPlanetsByPk(chunkedArr[i]));
      }

      const data: Planet[][] = await Promise.all(promises);
      return data.flat(Infinity) as Planet[];
    }

    return firestore
      .collection('planets')
      .where('pk', 'in', pkArray)
      .withConverter(firebaseConverter<PlanetDTO>())
      .get()
      .then((planets) => planets.docs.map((planet) => PlanetMapper.transformResponse(planet.data(), planet.id)));
  },

  /** Get planet from db by ID */
  async getPlanetById(id: string): Promise<Planet> {
    return firestore
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .doc(id)
      .get()
      .then((planet) => PlanetMapper.transformResponse(planet.data() as PlanetDTO, planet.id));
  },

  /** Get planet from db by name */
  async getPlanetByName(name: string): Promise<Planet> {
    return firestore
      .collection('planets')
      .withConverter(firebaseConverter<PlanetDTO>())
      .where('fields.name', '==', name)
      .get()
      .then((planet) => PlanetMapper.transformResponse(planet.docs[0].data(), planet.docs[0].id));
  },
};
