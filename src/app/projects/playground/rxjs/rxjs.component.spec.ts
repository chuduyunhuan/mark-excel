import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSpecModule } from 'app/shared';

import { RxJSComponent } from './rxjs.component';

describe('RxJSComponent', () => {
  let component: RxJSComponent;
  let fixture: ComponentFixture<RxJSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedSpecModule,
      ],
      declarations: [ RxJSComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxJSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

