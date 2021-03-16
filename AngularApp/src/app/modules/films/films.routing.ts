import { Routes, RouterModule } from '@angular/router';
import { ComponentDeactivateGuard } from 'src/app/core/guards/component-deactivate.guard';
import { NotAuthGuard } from 'src/app/core/guards/not-auth.guard';

import { FimlsListComponent } from './film-list/films-list.component';
import { FilmsAddingComponent } from './films-adding/films-adding.component';
import { FilmsEditingComponent } from './films-editing/films-editing.component';
import { FimlsComponent } from './films.component';

const routes: Routes = [
  { path: '', redirectTo: '/films/list', pathMatch: 'full' },

  {
    path: '',
    component: FimlsComponent,
    children: [
      { path: 'list', component: FimlsListComponent },
      { path: 'edit/:pk', component: FilmsEditingComponent, canActivate: [NotAuthGuard], canDeactivate: [ComponentDeactivateGuard] },
      { path: 'add', component: FilmsAddingComponent, canActivate: [NotAuthGuard], canDeactivate: [ComponentDeactivateGuard] },
    ],
  },
];

export const FilmsRoutes = RouterModule.forChild(routes);
