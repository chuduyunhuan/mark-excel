import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RxJSComponent } from './rxjs.component';

import { SummaryComponent } from './summary/summary.component';
import { SearchBarComponent } from './search-bar/search-bar.component';



const routes: Routes = [
  {
    path: '',
    component: RxJSComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'summary',
      },
      {
        path: 'summary',
        component: SummaryComponent,
      },
      {
        path: 'search-bar',
        component: SearchBarComponent,
      },
    ],
  },
];


export const declarations = [
  // tslint:disable:ter-indent

  RxJSComponent,
    SummaryComponent,
    SearchBarComponent,

  // tslint:enable:ter-indent
];


@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class RxJSRoutingModule { }

