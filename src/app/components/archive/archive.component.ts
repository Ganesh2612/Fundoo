import { Component, OnInit ,Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from 'src/app/Services/notes/notes.service';

import { MatIconModule } from '@angular/material/icon';
import { NotesIconComponent } from '../notes-icon/notes-icon.component';
import { MatCardModule } from '@angular/material/card';
import { NoteRefreshService } from 'src/app/Services/notes/notes-refresh.service';


@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule ,MatCardModule,
    MatIconModule,NotesIconComponent],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit{
  @Input() viewMode: 'grid' | 'list' = 'grid';
archivedNotes: any[] = [];
 notes: any[] = []; 
  hoveredNoteId: string | null = null;
  constructor(private notesService: NotesService,
    private refreshService:NoteRefreshService
  ) {}

 ngOnInit(): void {
  this.loadArchivedNotes();
}
 onMouseEnter(noteId: string): void {
    this.hoveredNoteId = noteId;
  }

  onMouseLeave(): void {
    this.hoveredNoteId = null;
  }

loadArchivedNotes() {
  this.notesService.getNotes().subscribe({
    next: (res: any) => {
      this.archivedNotes = res.data.data.filter(
        (note: any) => note.isArchived && !note.isDeleted
      );
    },
    error: (err: any) => console.error('Failed to load archived notes', err),
  });
}

onArchiveNote(noteId: string): void {
  const payload = {
    noteIdList: [noteId],
    isArchived: false // UNARCHIVE
  };

  this.notesService.archiveNote(payload).subscribe({
    next: () => {
      // Remove it from archived list
      this.archivedNotes = this.archivedNotes.filter(note => note.id !== noteId);

      // Optional: notify other components to refresh their data
      this.refreshService.triggerRefresh();
    },
    error: (err: any) => {
      console.error('Failed to unarchive note:', err);
    }
  });
}


}
