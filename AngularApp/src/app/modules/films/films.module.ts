import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { FimlsListComponent } from './film-list/films-list.component';
import { FilmsDetailsComponent } from './films-details/films-details.component';
import { FimlsComponent } from './films.component';
import { FilmsRoutes } from './films.routing';

/**
 * Module for displaying all about films on the page
 */
@NgModule({
  declarations: [FimlsListComponent, FilmsDetailsComponent, FimlsComponent],
  imports: [CommonModule, MaterialModule, FilmsRoutes, ReactiveFormsModule],
  exports: [ReactiveFormsModule],
})
export class FilmsModule {}
