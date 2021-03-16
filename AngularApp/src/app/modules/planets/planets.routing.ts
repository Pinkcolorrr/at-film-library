import { Routes, RouterModule } from '@angular/router';

import { PlanetsListComponent } from './planets-list/planets-list.component';
import { PlanetsComponent } from './planets.component';

const routes: Routes = [
  { path: '', redirectTo: '/planets/list', pathMatch: 'full' },

  { path: '', component: PlanetsComponent, children: [{ path: 'list', component: PlanetsListComponent }] },
];

export const PlanetsRoutes = RouterModule.forChild(routes);
