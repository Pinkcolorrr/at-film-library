import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { CharactersModule } from './modules/characters/characters.module';
import { FilmsModule } from './modules/films/films.module';
import { PlanetsModule } from './modules/planets/planets.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/notfound', pathMatch: 'full' },
];

/**
 * Routing module
 */
@NgModule({
  imports: [RouterModule.forRoot(routes), FilmsModule, CharactersModule, PlanetsModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
