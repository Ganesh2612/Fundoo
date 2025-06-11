import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../Services/notes/notes.service';
import { MatCardModule } from '@angular/material/card';
import { NoteRefreshService } from '../../Services/notes/notes-refresh.service';

import { MatIconModule } from '@angular/material/icon';
import { Input } from '@angular/core';
import { NotesIconComponent } from '../notes-icon/notes-icon.component';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-display-notes',
  standalone: true,
  imports: [CommonModule, MatCardModule, NotesIconComponent, MatIconModule, NotesComponent],
  templateUrl: './display-notes.component.html',
  styleUrls: ['./display-notes.component.scss']
})
export class DisplayNotesComponent implements OnInit {
  @Input() viewMode: 'grid' | 'list' = 'grid';
  notes: any[] = []; 
  hoveredNoteId: string | null = null;

  constructor(
    private notesService: NotesService,
    private refreshService: NoteRefreshService
  ) {}

  ngOnInit(): void {
    this.fetchNotes(); 
    this.refreshService.refreshNeeded.subscribe(() => {
      this.fetchNotes();
    });
  }

  fetchNotes(): void {
    this.notesService.getNotes().subscribe({
      next: (res: any) => {
        this.notes = res.data.data.filter((note: any) => !note.isArchived && !note.isDeleted);
      },
      error: (err: any) => {
        console.error('Error fetching notes:', err);
      }
    });
  }

  onMouseEnter(noteId: string): void {
    this.hoveredNoteId = noteId;
  }

  onMouseLeave(): void {
    this.hoveredNoteId = null;
  }

  onArchiveNote(noteId: string): void {
    const payload = {
      noteIdList: [noteId],
      isArchived: true
    };

    this.notesService.archiveNote(payload).subscribe({
      next: () => {
        this.refreshService.triggerRefresh(); // Refresh notes
      },
      error: (err: any) => {
        console.error('Archive failed:', err);
      }
    });
  }
}


