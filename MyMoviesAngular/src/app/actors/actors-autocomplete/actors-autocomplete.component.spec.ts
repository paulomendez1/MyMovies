import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsAutocompleteComponent } from './actors-autocomplete.component';

describe('ActorsAutocompleteComponent', () => {
  let component: ActorsAutocompleteComponent;
  let fixture: ComponentFixture<ActorsAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorsAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
