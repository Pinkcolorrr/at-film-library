/**
 * Divide big array into chunks
 */
export function getChunkedArray(array: Array<any>, chunkSize: number): Array<any> {
  const chunkedArr = [];
  const copied = [...array];
  const numOfChild = Math.ceil(copied.length / chunkSize);
  for (let i = 0; i < numOfChild; i++) {
    chunkedArr.push(copied.splice(0, chunkSize));
  }
  return chunkedArr;
}
