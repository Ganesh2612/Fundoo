import { Component, Input,Output,EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from 'src/app/Services/notes/notes.service';
import { NoteRefreshService } from '../../Services/notes/notes-refresh.service';
@Component({
  selector: 'app-notes-icon',
  standalone: true,
  imports: [CommonModule,MatIconModule],
  templateUrl: './notes-icon.component.html',
  styleUrls: ['./notes-icon.component.scss']
})
export class NotesIconComponent {
  constructor(
    private notesService: NotesService,
    private refreshService: NoteRefreshService
  ) {}

  @Input() showReminder = true;
  @Input() showCollaborator = true;
  @Input() showColor = true;
  @Input() showImage = true;
  @Input() showArchive = true;
  @Input() showTrash = true;
  @Input() showMore = true;
  @Input() showUndo = true;
  @Input() showRedo = true;
    
  @Input() note: any;
  @Output() colorChanged = new EventEmitter<string>();

colors: string[] = [
  '#ffffff', '#f28b82', '#fbbc04', '#fff475',
  '#ccff90', '#a7ffeb', '#cbf0f8', '#aecbfa',
  '#d7aefb', '#fdcfe8', '#e6c9a8', '#e8eaed'
];

showColorPicker = false;

toggleColorPicker(): void {
  this.showColorPicker = !this.showColorPicker;
}

selectColor(color: string): void {
  if (this.note?.id) {
    // For display-note (update via API)
    this.notesService.changeNoteColor(this.note.id, color).subscribe({
      next: () => {
        this.note.color = color;
        this.colorChanged.emit(color); // still emit for parent (optional)
        this.showColorPicker = false;
      },
      
    });
  } else {
    // For create-note
    this.colorChanged.emit(color); // ✅ emit directly
    this.showColorPicker = false;
  }
}
@Output() archiveClicked = new EventEmitter<void>();

onArchive() {
  this.archiveClicked.emit();
}


}
