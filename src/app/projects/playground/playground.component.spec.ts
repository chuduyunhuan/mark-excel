import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSpecModule } from 'app/shared';

import { PlaygroundComponent } from './playground.component';



describe('PlaygroundComponent', () => {
  let component: PlaygroundComponent;
  let fixture: ComponentFixture<PlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedSpecModule,
      ],
      declarations: [
        PlaygroundComponent,
      ],
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

