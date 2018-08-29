import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ContentArea } from '../../@shared/layout-utils';

import { Observable } from 'rxjs/Observable';

import { SearchBarService, Entry } from './search-bar.service';



@Component({
  selector: 'berry-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: [ './search-bar.component.scss' ],
  providers: [
    SearchBarService,
  ],
})
export class SearchBarComponent extends ContentArea implements OnInit {

  constructor (
    private searchBarService: SearchBarService,
  ) {
    super();
  }


  loading = false;

  readonly typingCtrl = new FormControl();

  readonly hint$ = this.typingCtrl.valueChanges
    .map(value => `${ value }`.trim())

    .debounceTime(350)
    .distinctUntilChanged()

    .switchMap(value => {
      if (value.length < 3) {
        return Observable.of([] as Entry[]);
      }

      this.loading = true;

      return this.searchBarService
        .search(value)
        .do(list => this.loading = false)
      ;
    })
  ;


  ngOnInit () {
  }

}

