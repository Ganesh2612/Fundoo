import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-recycle-bin',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatDialogModule],
  templateUrl: './recycle-bin.component.html',
  styleUrls: ['./recycle-bin.component.scss']
})
export class RecycleBinComponent {
 constructor(private dialogRef: MatDialogRef<RecycleBinComponent>) {}
   
  emptybin() {
    this.dialogRef.close(true);
  }
   
  cancel() {
    this.dialogRef.close(false);
  }
}
