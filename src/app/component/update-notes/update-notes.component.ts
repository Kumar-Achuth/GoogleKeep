import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteCardsComponent } from '../note-cards/note-cards.component';
import { HttpService } from '../../core/services/httpServices/http.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';

export interface DialogData {
  title: string;
  description: string;
  id: string;
  label: string;
}
@Component({
  selector: 'app-update-notes',
  templateUrl: './update-notes.component.html',
  styleUrls: ['./update-notes.component.scss']
})
export class UpdateNotesComponent implements OnInit {
  body: any = {}
  @Output() updateEvent = new EventEmitter();
  accessToken = localStorage.getItem('token');
  constructor(public dialogRef: MatDialogRef<NoteCardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private myHttpService: HttpService, ) { }
  ngOnInit() {
  }
  onNoClick(id): void {
    this.myHttpService.noteUpdate('notes/updateNotes', {
      "noteId": [this.data.id],
      "title": document.getElementById('titleId').innerHTML,
      "description": document.getElementById('notesId').innerHTML
    }, this.accessToken).subscribe(data => {
      this.dialogRef.close();
      this.updateEvent.emit({
      })
    })
    this.dialogRef.close();
  }
  deleteChips(label) {
    this.myHttpService.deleteChip('notes/'+this.data.id+'/addLabelToNotes/'+label+'/remove',
      { "noteId": this.data.id, "lableId": label },
      this.accessToken).subscribe(data => {
        this.updateEvent.emit({
        })
      })
  }
  deleteReminder(id) {
    this.myHttpService.deleteChip('notes/removeReminderNotes',
      { "noteIdList": [id]},
      this.accessToken).subscribe(data => {
        LoggerService.log('Success',data)
        this.updateEvent.emit({
        })
      })
      error=>{
        LoggerService.error(error);
      };
  }
}
