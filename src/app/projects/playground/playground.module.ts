import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';

import { PlaygroundRoutingModule, declarations } from './playground.routing';



@NgModule({
  imports: [
    SharedModule,

    PlaygroundRoutingModule,
  ],
  declarations: [
    ...declarations,
  ],
})
export class PlaygroundModule { }

