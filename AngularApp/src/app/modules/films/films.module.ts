import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { MaterialModule } from '../material/material.module';

import { FimlsListComponent } from './film-list/films-list.component';
import { FilmsAddingComponent } from './films-adding/films-adding.component';
import { FilmsEditingComponent } from './films-editing/films-editing.component';
import { FimlsComponent } from './films.component';
import { FilmsRoutes } from './films.routing';
/**
 * Module for displaying all about films on the page
 */
@NgModule({
  declarations: [FimlsListComponent, FilmsAddingComponent, FimlsComponent, FilmsEditingComponent],
  imports: [CommonModule, MaterialModule, FilmsRoutes, ReactiveFormsModule, SharedModule],
  exports: [ReactiveFormsModule],
})
export class FilmsModule {}
