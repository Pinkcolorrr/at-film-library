import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { firebaseConfig } from './core/firebaseConfig';
import { MaterialModule } from './modules/material/material.module';

/**
 * Root app-module
 */
@NgModule({
  declarations: [AppComponent, TopMenuComponent, AsideBarComponent, HomeComponent, NotFoundComponent],

  imports: [BrowserModule, AppRoutingModule, MaterialModule, AngularFireModule.initializeApp(firebaseConfig), BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
