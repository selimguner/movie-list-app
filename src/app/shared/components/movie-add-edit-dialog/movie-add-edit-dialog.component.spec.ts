import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddEditDialogComponent } from './movie-add-edit-dialog.component';

describe('MovieAddEditDialogComponent', () => {
  let component: MovieAddEditDialogComponent;
  let fixture: ComponentFixture<MovieAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieAddEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
