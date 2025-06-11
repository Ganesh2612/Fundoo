import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';
import { DisplayNotesComponent } from '../display-notes/display-notes.component';
import { NotesService } from 'src/app/Services/notes/notes.service';
import { NoteRefreshService } from 'src/app/Services/notes/notes-refresh.service';

@Component({
  selector: 'app-combine-notes',
  standalone: true,
  imports: [CommonModule,NotesComponent,DisplayNotesComponent],
  templateUrl: './combine-notes.component.html',
  styleUrls: ['./combine-notes.component.scss']
})
export class CombineNotesComponent {
  viewMode: 'grid' | 'list' = 'grid';
 onViewModeChange(mode: 'grid' | 'list') {
  this.viewMode = mode;
  }
  notes:[]=[];
   constructor(
      private notesService: NotesService,
      private refreshService: NoteRefreshService
    ) {}
  ngOnInit(): void {
      this.fetchNotes(); 
    
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

}
