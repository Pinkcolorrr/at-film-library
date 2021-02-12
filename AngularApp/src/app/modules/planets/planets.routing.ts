import { Routes, RouterModule } from '@angular/router';

import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetsComponent } from './planets.component';

const routes: Routes = [
  { path: 'planets', redirectTo: '/planets/list', pathMatch: 'full' },

  { path: 'planets', component: PlanetsComponent, children: [{ path: 'list', component: PlanetsListComponent }] },
];

export const PlanetsRoutes = RouterModule.forChild(routes);
