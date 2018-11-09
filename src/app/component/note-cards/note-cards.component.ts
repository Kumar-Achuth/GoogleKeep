import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { GlobalSearchService } from '../../core/services/globalSearchService/global-search.service';
import { LoggerService} from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-note-cards',
  templateUrl: './note-cards.component.html',
  styleUrls: ['./note-cards.component.scss']
})
export class NoteCardsComponent implements OnInit {
  array: any = []
  labelArray = [];
  cards: any = [];
  body: any = {};
  toggle: any = false;
  reminderArray: any = [];
  accessToken = localStorage.getItem('token');
  @Input() cardsArray;
  @Output() trashEvent = new EventEmitter();
  @Input() globalSearch;

  constructor(private myHttpService: HttpService, private router: Router,
    public dialog: MatDialog, public data: GlobalSearchService) {
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
  deleteEvent(event) {
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
    dialogRef.afterClosed().subscribe(result => {
      this.getAllLabels();
      this.trashEvent.emit({
      })
    });
  }
  deleteChips(id, label) {
    this.myHttpService.deleteChip('notes/' + id + '/addLabelToNotes/' + label + '/remove',
      { "noteId": id, "lableId": label },
      this.accessToken).subscribe(data => {
        this.trashEvent.emit({
        })
      })
  }
  getAllLabels() {
    let newArray = [];
    this.myHttpService.getLabels('noteLabels/getNoteLabelList', this.accessToken)
      .subscribe(data => {
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            newArray.push(data['data']['details'][i])
          }
        }
        this.labelArray = newArray;
      })
  }
  switchView() {
    {
      this.data.viewList.subscribe(message => {
        this.toggle = message;
      })
    }
  }
  deleteReminder(id) {
    this.myHttpService.deleteChip('notes/removeReminderNotes',
      { "noteIdList": [id]},
      this.accessToken).subscribe(data => {
        LoggerService.log('Success',data)
        this.trashEvent.emit({
        })
      })
      error=>{
        LoggerService.error(error);
      };
      
  }
 

}
