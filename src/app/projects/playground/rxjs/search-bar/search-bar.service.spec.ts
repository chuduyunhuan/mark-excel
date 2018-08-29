import { TestBed, inject } from '@angular/core/testing';

import { SharedSpecModule } from 'app/shared';

import { SearchBarService } from './search-bar.service';



describe('SearchBarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedSpecModule,
      ],
      providers: [ SearchBarService ],
    });
  });

  it('should be created', inject([ SearchBarService ], (service: SearchBarService) => {
    expect(service).toBeTruthy();
  }));
});

