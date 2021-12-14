import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovieTheatreComponent } from './edit-movie-theatre.component';

describe('CreateMovieTheatreComponent', () => {
  let component: EditMovieTheatreComponent;
  let fixture: ComponentFixture<EditMovieTheatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMovieTheatreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
