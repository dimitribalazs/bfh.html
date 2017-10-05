export abstract class DatabaseService {
  /**
   * Copy data from source to destination
   *
   * @param {TSource} source
   * @param {TDestination} destination
   */
  copyData<TSource, TDestination>(source: TSource, destination: TDestination): void {
    Object.keys(source).map((value: string, index: number) => {
      //update
      if (source.hasOwnProperty(value)) {
        destination[value] = source[value];
      }
    });
  }
}
