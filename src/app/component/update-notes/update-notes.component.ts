import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteCardsComponent } from '../note-cards/note-cards.component';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';

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
  private body: any = {}
  private newList;
  private newData;
  private checklist: any = false;
  private checkListArray: any = [];
  private tempArray = [];
  private array1 = [];
  private array2 = [];
  private adding = false;
  private addCheck = false;
  private status = "open"
  @Output() updateEvent = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<NoteCardsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private notesService:NotesService ) { }
  ngOnInit() {
    this.array1 = this.data['noteLabels'];
    this.array2 = this.data['reminder'];
    if (this.data['noteCheckLists'].length > 0) {
      this.checklist = true;
    }
    this.tempArray = this.data['noteCheckLists']
  }
  /**
   * @description Update Notes Api call Without CheckList
   */
  onNoClick(): void {
    if (this.checklist == false) {
      this.notesService.noteUpdate({
        "noteId": [this.data.id],
        "title": document.getElementById('titleId').innerHTML,
        "description": document.getElementById('notesId').innerHTML
      }).subscribe(data => {
        this.dialogRef.close();
        this.updateEvent.emit({
        })
      })
      this.dialogRef.close();
    }
    /**
   * @description Update Notes Api call With CheckList
   */
    else {
      var apiData = {
        "title": document.getElementById('titleId').innerHTML,
        "itemName": this.checkListArray.itemName,
        "status": this.checkListArray.status
      }
      this.notesService.updateCheckList(this.data['id'], this.checkListArray.id ,
       JSON.stringify(apiData)).subscribe(response => {
        this.updateEvent.emit()
      })
      this.dialogRef.close();
    }
  }
  /**
   * @description Upadte Label Api 
   * @param label 
   */
  deleteChips(label) {
    this.notesService.deleteChip( this.data.id ,label,
      { "noteId": this.data.id, "lableId": label }).subscribe(data => {
        this.updateEvent.emit({
        })
      })
  }
  /**
   * @description Update Reminder
   * @param id
   */
  deleteReminder(id) {
    this.notesService.deleteReminder({ "noteIdList": [id] }).subscribe(data => {
        LoggerService.log('Success', data)
        this.updateEvent.emit({
        })
      })
    error => {
      LoggerService.error(error);
    };
  }
  /**
   * @description CheckBox Array Display Function
   * @param checkList 
   */
  checkBox(checkList) {
    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    this.checkListArray = checkList;
    this.onNoClick();
  }
  /**
   * @description Edited CheckList Updation function
   * @param editedList 
   * @param event 
   */
  editing(editedList, event) {
    if (event.code == "Enter") {
      this.checkListArray = editedList;
      this.onNoClick();
    }
  }
  public removedList;
  /**
   * @description CheckList remove Update 
   * @param checklist 
   */
  removeList(checklist) {
    this.removedList = checklist;
    this.removeCheckList()
  }
  /**
   * @description : Remove checklists from updated notes
   */
  removeCheckList() {
    this.notesService.removeCheckList( this.data.id,this.removedList.id,null).subscribe((response) => {
      for (var i = 0; i < this.tempArray.length; i++) {
        if (this.tempArray[i].id == this.removedList.id) {
          this.tempArray.splice(i, 1)
        }
      }
    })
  }
 /**
  * @description Adding checklist inside the checklist
  * @param event 
  */
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
      this.notesService.addCheckList( this.data['id'],this.newData)
        .subscribe(response => {
          this.newList = null;
          this.addCheck = false;
          this.adding = false;
          this.tempArray.push(response['data'].details)
        })
    }
  }

}