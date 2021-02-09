import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/services/auth-guard.service';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { CharactersComponent } from './modules/main-content/characters/characters.component';
import { FimlsComponent } from './modules/main-content/fimls/fimls.component';
import { PlanetsComponent } from './modules/main-content/planets/planets.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'films', component: FimlsComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: '**', redirectTo: 'films', pathMatch: 'full' },
];

/**
 * Routing module
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
