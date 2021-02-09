import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const MaterialComponents = [
  BrowserAnimationsModule,
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatFormFieldModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
];

/**
 * Module for import material elements
 */
@NgModule({
  exports: MaterialComponents,
  imports: MaterialComponents,
})
export class MaterialModule {}
