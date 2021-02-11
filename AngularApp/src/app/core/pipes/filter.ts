import { Pipe, PipeTransform } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'filter',
})
export class PipeFilter implements PipeTransform {
  /**
   * Transform enter DataSource array to sorted
   */
  public transform(fiterData: MatTableDataSource<[]>, filterValue?: string): MatTableDataSource<[]> {
    if (fiterData != null) {
      fiterData.filter = filterValue || '';
    }
    return fiterData;
  }
}
