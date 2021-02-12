import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { MaterialModule } from '../material/material.module';

import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetsComponent } from './planets.component';
import { PlanetsRoutes } from './planets.routing';

/**
 * Module for displaying all about planets on the page
 */
@NgModule({
  declarations: [PlanetsListComponent, PlanetsComponent],
  imports: [[CommonModule, MaterialModule, PlanetsRoutes, SharedModule]],
})
export class PlanetsModule {}
