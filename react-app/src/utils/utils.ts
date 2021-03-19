/**
 * Is used for split string by character.
 * As result we will get the second item from array after splitting the input string
 */
export function getStringSecondPart(str: string, splitBy: string): string {
  return str.split(splitBy)[1];
}

/** Divide big array into chunks */
export function getChunkedArray<T>(array: Array<T>, chunkSize: number): T[][] {
  const chunkedArr: T[][] = [];
  const copied: T[] = [...array];
  const numOfChild = Math.ceil(copied.length / chunkSize);
  for (let i = 0; i < numOfChild; i++) {
    chunkedArr.push(copied.splice(0, chunkSize));
  }
  return chunkedArr;
}

/**
 * Сompare dataList with data and pkList with keys.
 * If key is matches add filed "name" in results
 * Return results
 */
export const getNamesByPk = <T extends { pk: string; name: string }>(dataList: T[], pkList: string[]): string[] =>
  dataList.filter((data) => pkList.includes(data.pk)).map((d) => d.name);

/**
 * Сompare dataList with data and nameList with names.
 * If name is matches add filed "pk" in results
 * Return results
 */
export const getPkByNames = <T extends { name: string; pk: string }>(dataList: T[], nameList: string[]): string[] =>
  dataList.filter((data) => nameList.includes(data.name)).map((d) => d.pk);

/** Convert string to number, but if conversion is not possible, returned undefined instead NaN */
export const getNumberFromString = (string: string): number | undefined =>
  Number.isNaN(string) ? undefined : Number(string);
