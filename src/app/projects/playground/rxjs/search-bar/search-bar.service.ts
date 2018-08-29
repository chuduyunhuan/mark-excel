import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { zip } from 'lodash';



export interface Entry {
  title: string;
  summary: string;
  link: string;
}


@Injectable()
export class SearchBarService {

  constructor (
    private http: HttpClient,
  ) {
  }

  search = (words: string) => {

    const query = {
      action: 'opensearch',
      format: 'json',
      origin: '*',
      limit: '5',
      search: words,
    };

    const params = Object.entries(query).reduce(
      (params, [ key, value ]) => params.append(key, value),
      new HttpParams(),
    );


    type list = string[];
    type Result = [ string, list, list, list ];

    return this.http
      .get<Result>('https://en.wikipedia.org/w/api.php', { params })
      .map(result => (result.shift(), result))
      .flatMap(list => zip(...list))
      .map(([ title, summary, link ]) => (
            { title, summary, link } as Entry
      ))
      .toArray()
    ;
  }

}

