import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { firebaseConfig } from './core/firebaseConfig';
import { AuthGuard } from './core/services/auth-guard.service';
import { AuthModule } from './modules/auth/auth.module';
import { MainContentModule } from './modules/main-content/main-content.module';
import { MaterialModule } from './modules/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    MainContentModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
