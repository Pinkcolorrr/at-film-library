import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

/**
 * Pipe for filtering material table
 */
@Pipe({
  name: 'filterMatTableData',
})
export class PipeFilterMatTableData implements PipeTransform {
  /**
   * Transform enter DataSource array to sorted
   */
  public transform(fiterData: MatTableDataSource<[]>, filterValue?: string): MatTableDataSource<[]> {
    if (fiterData != null) {
      fiterData.filter = filterValue || '';
      return fiterData;
    }
    return new MatTableDataSource();
  }
}
