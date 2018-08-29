import {
  OnInit, OnDestroy,
  ViewChild, HostBinding,
  ElementRef, Renderer2,

} from '@angular/core';



export class ContentContainer {

  @HostBinding('class.content-container') private _CCC = true;

}


export class ContentArea {

  @HostBinding('class.content-area') private _CCA = true;

}


export class SubNavContainer extends ContentContainer implements OnInit, OnDestroy {

  constructor (
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    super();
  }


  @ViewChild('subNav') private subNav: ElementRef;


  ngOnInit () {
    this.renderer.insertBefore(
      this.el.nativeElement.parentNode,
      this.subNav.nativeElement,
      this.el.nativeElement,
    );
  }

  ngOnDestroy () {
    this.renderer.removeChild(
      this.el.nativeElement.parentNode,
      this.subNav.nativeElement,
    );
  }
}

