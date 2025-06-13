import { Component ,Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesIconComponent } from "../notes-icon/notes-icon.component";
import { MatIconModule } from '@angular/material/icon';
import { NotesService } from 'src/app/Services/notes/notes.service';
import { NoteRefreshService } from 'src/app/Services/notes/notes-refresh.service';
import { MatCardModule } from '@angular/material/card';
import { ViewService } from 'src/app/Services/view/view.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [CommonModule, NotesIconComponent,MatIconModule,MatCardModule],
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
 @Input() viewMode: 'grid' | 'list' = 'grid';
  trashedNotes: any[] = [];
  hoveredNoteId: string | null = null;

  constructor(
    private notesService: NotesService,
    private refreshService: NoteRefreshService,
    private viewModeService: ViewService
  ) {}

  toggleViewMode() {
  const newMode = this.viewModeService.getViewMode() === 'grid' ? 'list' : 'grid';
  this.viewModeService.setViewMode(newMode);
}
   ngOnInit(): void {
    this.viewModeService.viewMode$.subscribe(mode => {
      this.viewMode = mode;
    });
   
     this.loadTrashedNotes();
  }

  

 

onMouseEnter(id: string) {
  this.hoveredNoteId = id;
}

onMouseLeave() {
  this.hoveredNoteId = null;
}

  loadTrashedNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (res: any) => {
        this.trashedNotes = res.data.data.filter(
          (note: any) => note.isDeleted === true
        );
      },
      error: (err: any) => {
        console.error('Failed to load trashed notes', err);
      }
    });
  }

  onRestoreNote(noteId: string): void {
    const payload = {
      noteIdList: [noteId],
      isDeleted: false // RESTORE from trash
    };

    this.notesService.trashNote(payload).subscribe({
      next: () => {
        // Remove from trash view
        this.trashedNotes = this.trashedNotes.filter(note => note.id !== noteId);
        this.refreshService.triggerRefresh();
      },
      error: (err: any) => {
        console.error('Failed to restore note:', err);
      }
    });
  }
// emptyRecycleBin(): void {
//   const dialogRef = this.dialog.open(RecycleBinComponent, {
//     panelClass: 'custom-dialog-container'
//   });

//   dialogRef.afterClosed().subscribe((confirmed: boolean) => {
//     if (confirmed) {
//       const ids = this.trashedNotes.map(note => note.id);
//       const payload = { noteIdList: ids };

//       this.notesService.deleteNoteForever(payload).subscribe({
//         next: () => {
//           this.refreshService.triggerRefresh();
//         },
//         error: (err:any) => {
//           console.error('Failed to delete notes:', err);
//         }
//       });
//     }
//   });
// }

  onDeleteForever(noteId: string): void {
    const payload = {
      noteIdList: [noteId]
    };

    this.notesService.deleteNoteForever(payload).subscribe({
      next: () => {
        this.trashedNotes = this.trashedNotes.filter(note => note.id !== noteId);
        this.refreshService.triggerRefresh();
      },
      error: (err: any) => {
        console.error('Failed to delete note forever:', err);
      }
    });
  }
}
