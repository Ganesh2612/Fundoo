import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineNotesComponent } from './combine-notes.component';

describe('CombineNotesComponent', () => {
  let component: CombineNotesComponent;
  let fixture: ComponentFixture<CombineNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CombineNotesComponent]
    });
    fixture = TestBed.createComponent(CombineNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
