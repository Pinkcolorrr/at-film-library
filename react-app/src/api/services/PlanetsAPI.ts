import firebase from 'firebase/app';
import 'firebase/firestore';
import { Planet } from '../../models/Planet';
import { firebaseConverter } from '../../utils/FirebaseConverters';
import { getChunkedArray } from '../../utils/utils';
import { PlanetDTO } from '../dtos/PlanetDto';
import { PlanetMapper } from '../mappers/PlanetMapper';

const planetMapper = new PlanetMapper();

export namespace PlanetAPI {
  export async function getPlanetsByPk(
    pkArray: (number | string)[]
  ): Promise<Planet[]> {
    if (pkArray.length > 10) {
      const chunkedArr: (string | number)[][] = getChunkedArray(pkArray, 10);
      const charactersData: Planet[][] & Planet[] = [];

      for (const item of chunkedArr) {
        charactersData.push(await getPlanetsByPk(item));
      }

      return charactersData.flat(Infinity);
    }

    return await firebase
      .firestore()
      .collection('planets')
      .where('pk', 'in', pkArray)
      .withConverter(firebaseConverter<PlanetDTO>())
      .get()
      .then((planets) => {
        const planetsData: Planet[] = [];
        planets.forEach((planet) => {
          planetsData.push(planetMapper.transformResponse(planet.data()));
        });
        return planetsData;
      });
  }
}
