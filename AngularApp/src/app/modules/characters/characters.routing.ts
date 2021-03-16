import { Routes, RouterModule } from '@angular/router';

import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersComponent } from './characters.component';

const routes: Routes = [
  { path: '', redirectTo: '/characters/list', pathMatch: 'full' },

  { path: '', component: CharactersComponent, children: [{ path: 'list', component: CharactersListComponent }] },
];

export const CharactersRoutes = RouterModule.forChild(routes);
