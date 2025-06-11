import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesService } from 'src/app/Services/notes/notes.service';

import { MatIconModule } from '@angular/material/icon';
import { NotesIconComponent } from '../notes-icon/notes-icon.component';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [CommonModule ,MatCardModule,
    MatIconModule,NotesIconComponent],
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent {
archivedNotes: any[] = [];

  constructor(private notesService: NotesService) {}

 ngOnInit(): void {
  this.loadArchivedNotes();
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



}
