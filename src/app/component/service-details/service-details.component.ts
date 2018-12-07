import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NoteCardsComponent } from '../note-cards/note-cards.component';
import { DialogData } from '../update-notes/update-notes.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.scss']
})
export class ServiceDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NoteCardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router,
    private dialog: MatDialog,) { }

  ngOnInit() {
  }
remove(){
  this.dialogRef.close();
}
proceed(){
  this.router.navigate(['/signup'])
  this.dialogRef.close();
}
}
