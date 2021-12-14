import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexMovieTheatresComponent } from './index-movie-theatres.component';

describe('IndexMovieTheatresComponent', () => {
  let component: IndexMovieTheatresComponent;
  let fixture: ComponentFixture<IndexMovieTheatresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexMovieTheatresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexMovieTheatresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
