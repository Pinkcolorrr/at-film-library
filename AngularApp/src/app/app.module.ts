import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { firebaseConfig } from './core/firebaseConfig';
import { AuthModule } from './modules/auth/auth.module';
import { CharactersModule } from './modules/characters/characters.module';
import { FilmsModule } from './modules/films/films.module';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './shared/shared.module';

/**
 * Root app-module
 */
@NgModule({
  declarations: [AppComponent, TopMenuComponent, AsideBarComponent, HomeComponent, NotFoundComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    MaterialModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FilmsModule,
    CharactersModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
