import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexGenresComponent } from './index-genres.component';

describe('IndexGenresComponent', () => {
  let component: IndexGenresComponent;
  let fixture: ComponentFixture<IndexGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexGenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
