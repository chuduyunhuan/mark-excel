import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'berry-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],

  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[class.content-container]': 'true',
  },
})
export class HomeComponent implements OnInit {

  constructor (private readonly http: HttpClient) { }

  cols: string[] = [];
  data: object[] = [];

  ngOnInit () {
    this.http.get<ExcelData>('/api/get-excel')
      .subscribe(res => {
        this.data = res.data;
        this.cols = Object.keys(res.cols);
      });
  }

}

export interface ExcelData {
  cols: object;
  data: object[];
}

