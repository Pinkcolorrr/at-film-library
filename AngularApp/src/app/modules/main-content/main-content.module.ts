import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipeFilter } from 'src/app/core/pipes/filter';

import { MaterialModule } from '../material/material.module';

import { CharactersComponent } from './characters/characters.component';
import { FimlsComponent } from './fimls/fimls.component';
import { PlanetsComponent } from './planets/planets.component';

/**
 * Displaying main content
 */
@NgModule({
  declarations: [FimlsComponent, CharactersComponent, PlanetsComponent, PipeFilter],
  imports: [CommonModule, MaterialModule],
})
export class MainContentModule {}
