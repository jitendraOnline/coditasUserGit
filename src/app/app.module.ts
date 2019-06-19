import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './view-user/user-details/user-details.component';
import { MaterialModuleModule } from './shared-module/material-module.module';

@NgModule({
  declarations: [
    AppComponent,
    ViewUserComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  MaterialModuleModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
