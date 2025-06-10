import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesIconComponent } from './notes-icon.component';

describe('NotesIconComponent', () => {
  let component: NotesIconComponent;
  let fixture: ComponentFixture<NotesIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotesIconComponent]
    });
    fixture = TestBed.createComponent(NotesIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
