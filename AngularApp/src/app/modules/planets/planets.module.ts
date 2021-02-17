import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetsComponent } from './planets.component';
import { PlanetsRoutes } from './planets.routing';

/**
 * Module for displaying all about planets on the page
 */
@NgModule({
  declarations: [PlanetsListComponent, PlanetsComponent],
  imports: [CommonModule, MaterialModule, PlanetsRoutes, ReactiveFormsModule],
  exports: [ReactiveFormsModule],
})
export class PlanetsModule {}
