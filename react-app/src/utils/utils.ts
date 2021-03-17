/** Is used for remove slash "/" and get current url */
export function getStringSecondPart(str: string, splitBy: string): string {
  return str.split(splitBy)[1];
}

/** Divide big array into chunks */
export function getChunkedArray<T>(array: Array<T>, chunkSize: number): T[][] {
  const chunkedArr: T[][] = [];
  const copied: T[] = [...array];
  const numOfChild: number = Math.ceil(copied.length / chunkSize);
  for (let i = 0; i < numOfChild; i++) {
    chunkedArr.push(copied.splice(0, chunkSize));
  }
  return chunkedArr;
}

/**
 * Сompare dataArray with data and pkArray with keys.
 * If key is matches add filed "name" in resultArray
 * Return resultArray
 */
export function getNamesByPk<T extends { pk: string; name: string }>(dataArray: T[], pkArray: string[]): string[] {
  return dataArray
    .filter((item) => {
      for (let i = 0; i < pkArray.length; i++) {
        if (item.pk === pkArray[i]) {
          return true;
        }
      }
      return false;
    })
    .map((elem) => elem.name);
}
