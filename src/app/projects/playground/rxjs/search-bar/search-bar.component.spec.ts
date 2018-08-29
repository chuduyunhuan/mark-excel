import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSpecModule } from 'app/shared';

import { RxJSModule } from '../rxjs.module';

import { SearchBarComponent } from './search-bar.component';




describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedSpecModule,

        RxJSModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

