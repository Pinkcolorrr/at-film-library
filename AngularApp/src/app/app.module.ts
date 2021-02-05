import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideBarComponent } from './components/aside-bar/aside-bar.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { AuthModule } from './modules/auth/auth.module';
import { MaterialModule } from './modules/material/material.module';
import { firebaseConfig } from './shared/firebaseConfig';
import { AuthGuard } from './shared/services/auth-guard.service';

/**
 * Root app-module
 */
@NgModule({
  declarations: [AppComponent, TopMenuComponent, AsideBarComponent],
  /**
   *  Prettier not allow to split line
   */
  // tslint:disable-next-line: max-line-length
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, AuthModule, MaterialModule, AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
