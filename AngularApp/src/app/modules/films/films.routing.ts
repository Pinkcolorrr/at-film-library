import { Routes, RouterModule } from '@angular/router';

import { FimlsListComponent } from './film-list/films-list.component';
import { FimlsComponent } from './films.component';

const routes: Routes = [
  { path: 'films', redirectTo: '/films/list', pathMatch: 'full' },

  { path: 'films', component: FimlsComponent, children: [{ path: 'list', component: FimlsListComponent }] },
];

export const FilmsRoutes = RouterModule.forChild(routes);
