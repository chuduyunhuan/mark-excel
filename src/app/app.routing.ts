import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'playground',
  },

  {
    path: 'playground',
    loadChildren: 'app/projects/playground/playground.module#PlaygroundModule',
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }

