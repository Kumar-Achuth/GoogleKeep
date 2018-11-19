import { Component, OnInit, Inject } from '@angular/core';
import { TrashComponent } from '../trash/trash.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../update-notes/update-notes.component';

@Component({
  selector: 'app-delete-trash',
  templateUrl: './delete-trash.component.html',
  styleUrls: ['./delete-trash.component.scss']
})
export class DeleteTrashComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteTrashComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData) { }

  ngOnInit() {
  }
  cancel() {
    this.dialogRef.close();
  }
}
