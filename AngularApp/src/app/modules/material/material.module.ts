import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 *  Prettier not allow to split line
 */
// tslint:disable-next-line: max-line-length
const MaterialComponents = [BrowserAnimationsModule, MatToolbarModule, MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatFormFieldModule];

/**
 * Module for import material elements
 */
@NgModule({
  exports: MaterialComponents,
  imports: MaterialComponents,
})
export class MaterialModule {}
