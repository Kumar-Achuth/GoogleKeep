import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { CollaboratorPageComponent } from '../collaborator-page/collaborator-page.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
@Input() collaborator;
@Output() collabEvent=new EventEmitter();
constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }
  /**
   * @description Open The Collaborator Page component
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(CollaboratorPageComponent,{
      width: '500px',
      maxWidth:'auto',
      data: this.collaborator
    });
    dialogRef.afterClosed().subscribe(result => {
      this.collabEvent.emit({
      })
    });
  }

}
