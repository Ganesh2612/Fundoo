import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NotesComponent } from '../Components/notes/notes.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
   CommonModule, ToolbarComponent , SidenavComponent , MatSidenavModule,NotesComponent]
  ,
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
