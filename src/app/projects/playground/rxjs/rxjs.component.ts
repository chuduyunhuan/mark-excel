import { Component, ElementRef, Renderer2 } from '@angular/core';

import { SubNavContainer } from '../@shared/layout-utils';



@Component({
  selector: 'berry-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: [ './rxjs.component.scss' ],
})
export class RxJSComponent extends SubNavContainer {

  constructor (
    el: ElementRef,
    renderer: Renderer2,
  ) {
    super(el, renderer);
  }

}

