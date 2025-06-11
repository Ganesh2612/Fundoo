import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule , MatSidenavModule ,  MatListModule , MatIconModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
 selected = 'notes';
 isVisible=false;

 constructor(private router:Router){}

  select(item: string, route: string) {
  this.selected = item;
  this.router.navigate([`/dashboard/${route}`]);
}

}
