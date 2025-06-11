import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotesComponent } from 'src/app/components/notes/notes.component';
import { DisplayNotesComponent } from 'src/app/components/display-notes/display-notes.component';

import { ArchiveComponent } from 'src/app/components/archive/archive.component';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
   CommonModule, ToolbarComponent , SidenavComponent , MatSidenavModule, NotesComponent, DisplayNotesComponent,RouterOutlet, ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  

isSidenavOpen = false;
  isHovered = false;
     

  get sidenavOpened(): boolean {
    return this.isSidenavOpen || this.isHovered;
  }

  onMouseEnterSidenav() {
    this.isHovered = true;
  }

  onMouseLeaveSidenav() {
    this.isHovered = false;
  }
   
}
