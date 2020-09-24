import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';


import { AppComponent } from './app.component';
import { NotpagesfoundComponent } from './notpagesfound/notpagesfound.component';



@NgModule({
  declarations: [
    AppComponent,    
    NotpagesfoundComponent        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
