import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';
import { GlobalSearchService } from '../../core/services/globalSearchService/global-search.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';

@Component({
  selector: 'app-note-cards',
  templateUrl: './note-cards.component.html',
  styleUrls: ['./note-cards.component.scss']
})
export class NoteCardsComponent implements OnInit {
  private array: any = []
  private labelArray = [];
  private cards: any = [];
  private body: any = {};
  private toggle: any = false;
  private checkListArray: any = [];
  private reminderArray: any = [];
  private pinnedNotes: any = [];
  private today = new Date();
  private tomorrow = new Date(this.today.getFullYear(),this.today.getMonth(),this.today.getDate()+1)
  private accessToken = localStorage.getItem('token');
  @Input() cardsArray;
  @Output() trashEvent = new EventEmitter();
  @Input() globalSearch;
  constructor(private myHttpService: HttpService, private router: Router,
    private dialog: MatDialog,   private newService: NotesService,  private data: GlobalSearchService) {
    this.data.deletedLabel.subscribe(message => {
      if (message) {
        this.trashEvent.emit({
        })
      }
    })
  }
  @Output() dialogEvent = new EventEmitter();
  ngOnInit() {
    this.switchView()
    this.getAllLabels();
  }
  deleteEvent() {
    this.trashEvent.emit({
    })
  }
  openDialog(notes): void {
    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      width: 'fit-content',
      height: 'fit-content',
      backdropClass: '',
      data: notes
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllLabels();
      this.trashEvent.emit({});
    });
  }
  /**
   * @description Delete Api call for deleting the labels from the notes
   * @param id 
   * @param label 
   */
  deleteChips(id, label) {
    this.myHttpService.deleteChip('notes/' + id + '/addLabelToNotes/' + label + '/remove',
      { "noteId": id, "lableId": label },
      this.accessToken).subscribe(() => {
          this.trashEvent.emit({});
        })
  }
  getAllLabels() {
    let newArray = [];
    this.newService.getLabels()
      .subscribe(data => {
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            newArray.push(data['data']['details'][i])
          }
        }
        this.labelArray = newArray;
      })
  }
  /**
   * @description Function to get the list view and grid view 
   */
  switchView() {
    {
      this.data.viewList.subscribe(message => {
        this.toggle = message;
      })
    }
  }
  select(labels) {
    let label = labels.label;
    this.router.navigate(['home/newLabel/' + label])
  }
  /**
   * @description Api call for deleting the reminders from the note cards
   * @param id 
   */
  deleteReminder(id) {
    this.myHttpService.deleteChip('notes/removeReminderNotes',
      { "noteIdList": [id] },
      this.accessToken).subscribe(data => {
        LoggerService.log('Success', data)
        this.trashEvent.emit({
        })
      })
    error => {
      LoggerService.error(error);
    };
  }
  checkBox(checkList, note) {
    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }
    this.checkListArray = checkList;
    this.checkListApi(note.id);
  }
  /**
   * @description Api call for Checklist info on the notecards
   * @param id 
   */
  checkListApi(id) {
    var apiData = {
      "itemName": this.checkListArray.itemName,
      "status": this.checkListArray.status
    }
    this.myHttpService.postColor("notes/" + id + "/checklist/" + this.checkListArray.id + "/update",
      JSON.stringify(apiData), this.accessToken).subscribe(response => {
      })
  }
  reminderStrike(cuttOff) {
    var currentReminderTime = new Date().getTime();
    var timeValue = new Date(cuttOff).getTime();
    if (timeValue > currentReminderTime) {
      return true;
    }
    else {
      return false;
    }
  }
}
