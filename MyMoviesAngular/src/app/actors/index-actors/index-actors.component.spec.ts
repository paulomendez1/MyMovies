import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexActorsComponent } from './index-actors.component';

describe('IndexActorsComponent', () => {
  let component: IndexActorsComponent;
  let fixture: ComponentFixture<IndexActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexActorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
