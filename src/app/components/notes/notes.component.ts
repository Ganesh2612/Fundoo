import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotesService } from '../../Services/notes/notes.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoteRefreshService } from '../../Services/notes/notes-refresh.service';
import { NotesIconComponent } from '../notes-icon/notes-icon.component';


@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    NotesIconComponent,
    MatSnackBarModule

  ],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {

   isExpanded = false;
  selectedColor: string = '#fff';

  noteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notesService: NotesService,
    private refreshService: NoteRefreshService,
    private snackBar: MatSnackBar,
    private elementRef: ElementRef
  ) {
    this.noteForm = this.fb.group({
      title: [''],
      description: ['']
    });
  }

@ViewChild('descInput') descInput!: ElementRef;

onFocus(): void {
  this.isExpanded = true;
  setTimeout(() => {
    this.descInput?.nativeElement.focus();
  }, 0);
}
onMouseEnter(): void {
  this.isExpanded = true;
}

onMouseLeave(): void {
  const { title, description } = this.noteForm.value;

  const trimmedTitle = (title || '').trim();
  const trimmedDescription = (description || '').trim();

  // Collapse only if no content is present
  if (!trimmedTitle && !trimmedDescription) {
    this.noteForm.reset();
    this.isExpanded = false;
    this.selectedColor = '#fff';
  }
}


  onColorChanged(color: string) {
    this.selectedColor = color;
  }

 onClose(): void {
  const { title, description } = this.noteForm.value;
  console.log(this.noteForm);
  const trimmedTitle = (title || '').trim();
  const trimmedDescription = (description || '').trim();

  if (trimmedTitle || trimmedDescription) {
    const payload = {
      title: trimmedTitle,
      description: trimmedDescription,
      color: this.selectedColor
    };

    this.notesService.notes(payload).subscribe({
      next: () => {
        this.refreshService.triggerRefresh();
        this.snackBar.open('Note created!', 'Close');
        this.noteForm.reset();
        this.isExpanded = false;
        this.selectedColor = '#fff';
      },
      error: (err: any) => {
        console.error(err);
        this.snackBar.open('Failed to create note', 'Close');
      }
    });
  } else {
    this.noteForm.reset();
    this.isExpanded = false;
    this.selectedColor = '#fff';
  }
}



 @HostListener('document:mousedown', ['$event.target'])
onClickOutside(target: HTMLElement): void {
  const clickedInside = this.elementRef.nativeElement.contains(target);
  if (!clickedInside && this.isExpanded) {
    this.onClose();
  }
}

}