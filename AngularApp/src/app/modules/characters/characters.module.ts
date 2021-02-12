import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { MaterialModule } from '../material/material.module';

import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersComponent } from './characters.component';
import { CharactersRoutes } from './characters.routing';

/**
 * Module for displaying all about characters on the page
 */
@NgModule({
  declarations: [CharactersComponent, CharactersListComponent],
  imports: [CommonModule, MaterialModule, CharactersRoutes, SharedModule],
})
export class CharactersModule {}
