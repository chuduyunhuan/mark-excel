import { Component, OnInit } from '@angular/core';

import { ContentArea } from '../../@shared/layout-utils';



@Component({
  selector: 'berry-summary',
  templateUrl: './summary.component.html',
  styleUrls: [ './summary.component.scss' ],
})
export class SummaryComponent extends ContentArea implements OnInit {

  constructor (
  ) {
    super();
  }

  ngOnInit () {
  }

}

