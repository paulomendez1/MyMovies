import { TestBed } from '@angular/core/testing';

import { MovieTheatersService } from './movie-theaters.service';

describe('MovieTheatersService', () => {
  let service: MovieTheatersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieTheatersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
