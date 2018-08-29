import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaygroundComponent } from './playground.component';

import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {
    path: '',
    component: PlaygroundComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'rxjs',
        loadChildren: './rxjs/rxjs.module#RxJSModule',
      },
    ],
  },
];


export const declarations = [
  PlaygroundComponent,
  HomeComponent,
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class PlaygroundRoutingModule { }

