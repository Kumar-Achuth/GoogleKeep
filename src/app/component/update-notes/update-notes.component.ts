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
  public newList;
  public newData;
  checklist: any = false;
  checkListArray: any = [];
  public tempArray = [];
  public array1 = [];
  public array2 = [];
  @Output() updateEvent = new EventEmitter();
  accessToken = localStorage.getItem('token');
  constructor(public dialogRef: MatDialogRef<NoteCardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private myHttpService: HttpService, ) { }
  ngOnInit() {
    this.array1 = this.data['noteLabels'];
    this.array2 = this.data['reminder'];
    if (this.data['noteCheckLists'].length > 0) {
      this.checklist = true;
    }
    this.tempArray = this.data['noteCheckLists']
  }
  onNoClick(): void {
    if (this.checklist == false) {
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
    else {
      var apiData = {
        "itemName": this.checkListArray.itemName,
        "status": this.checkListArray.status
      }
      this.myHttpService.postColor("notes/" + this.data['id'] + "/checklist/" + this.checkListArray.id + "/update", JSON.stringify(apiData), this.accessToken).subscribe(response => {
        console.log(response);
        this.updateEvent.emit()
      })
      this.dialogRef.close();
    }
    error => {
      console.log(error);
    }
  }
  deleteChips(label) {
    this.myHttpService.deleteChip('notes/' + this.data.id + '/addLabelToNotes/' + label + '/remove',
      { "noteId": this.data.id, "lableId": label },
      this.accessToken).subscribe(data => {
        this.updateEvent.emit({
        })
      })
  }
  deleteReminder(id) {
    this.myHttpService.deleteChip('notes/removeReminderNotes',
      { "noteIdList": [id] },
      this.accessToken).subscribe(data => {
        LoggerService.log('Success', data)
        this.updateEvent.emit({
        })
      })
    error => {
      LoggerService.error(error);
    };
  }
  checkBox(checkList) {
    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    console.log(checkList);
    this.checkListArray = checkList;
    this.onNoClick();
  }

  editing(editedList, event) {
    console.log(editedList);
    if (event.code == "Enter") {
      this.checkListArray = editedList;
      this.onNoClick();
    }
  }

  public removedList;
  removeList(checklist) {
    console.log(checklist)
    this.removedList = checklist;
    this.removeCheckList()
  }
  removeCheckList() {
    this.myHttpService.addLabel("notes/" + this.data.id + "/checklist/" + this.removedList.id + "/remove", null, this.accessToken).subscribe((response) => {
      console.log(response);
      for (var i = 0; i < this.tempArray.length; i++) {
        if (this.tempArray[i].id == this.removedList.id) {
          this.tempArray.splice(i, 1)
        }
      }
    })
  }
  public adding = false;
  public addCheck = false;
  public status = "open"

  addList(event) {
    if (this.newList != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
    if (event.code == "Enter") {
      if (this.addCheck == true) {
        this.status = "close";
      }
      else {
        this.status = "open"
      }
      this.newData = {
        "itemName": this.newList,
        "status": this.status
      }
      this.myHttpService.addLabel("notes/" + this.data['id'] + "/checklist/add", this.newData, this.accessToken)
        .subscribe(response => {
          console.log(response);
          this.newList = null;
          this.addCheck = false;
          this.adding = false;
          console.log(response['data'].details);
          this.tempArray.push(response['data'].details)
          console.log(this.tempArray)
        })
    }
  }

}