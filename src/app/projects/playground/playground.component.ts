import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { environment } from './@shared/environment';



@Component({
  selector: 'berry-playground',
  templateUrl: './playground.component.html',
  styleUrls: [ './playground.component.scss' ],
})
export class PlaygroundComponent implements OnInit {

  constructor (
    private readonly title: Title,
  ) {
    this.title.setTitle('Playground');
  }


  readonly info = environment.info;

  readonly vo = {
    aboutOpen: false,
  };


  ngOnInit () {
  }

}

