import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import { DialogData } from '../update-notes/update-notes.component';

@Component({
  selector: 'app-delete-label',
  templateUrl: './delete-label.component.html',
  styleUrls: ['./delete-label.component.scss']
})
export class DeleteLabelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LabelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }
  /**
   * @description Go BAck to Previous Html Screen
   */
  cancel() {
    this.dialogRef.close();
  }
}
