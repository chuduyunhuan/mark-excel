import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { appInitProviders } from './app.init';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';



@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    HttpClientJsonpModule,

    SharedModule,

    AppRoutingModule,
  ],

  providers: [
    ...appInitProviders,
  ],

  declarations: [
    AppComponent,
  ],

  bootstrap: [
    AppComponent,
  ],

})
export class AppModule { }

