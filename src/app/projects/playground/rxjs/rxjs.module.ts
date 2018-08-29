import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { RxJSRoutingModule, declarations } from './rxjs.routing';



@NgModule({
  imports: [
    SharedModule,

    RxJSRoutingModule,
  ],
  declarations: [
    ...declarations,
  ],
})
export class RxJSModule { }

