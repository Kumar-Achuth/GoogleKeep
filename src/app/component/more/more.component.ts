/************************************************************************************************
*  Execution       : 1. default node         cmd> more.ts 
*        
*  Purpose         : Menu For More Options Display 
* 
*  @file           : more.ts
*  @description    : Label List Display and Delete Note options inside More Icons
*  @module         : more.ts - This is optional if expeclictly its an npm or local package
*  @author         : KumarAchuth <achuthkumar146@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  private id = localStorage.getItem('userId');
  private body: any = {}
  private labelArray: any = [];
  @Input() trash;
  @Output() deleteCard = new EventEmitter();
  @Output() addEvent = new EventEmitter();
  constructor(private myHttpService: HttpService,private notesService:NotesService) { }

  ngOnInit() {
    this.getAllLabels();
  }
  /**
   * @description Post To Trash Api 
   * @param trash 
   */
  postToTrash(trash) {
    this.notesService.postTrash({
      "isDeleted": true,
      "noteIdList": [this.trash.id]
    }).pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
      this.deleteCard.emit({
      })
    })
  }
  /**
   * @description Adding Labels to the Note Cards Api call
   * @param label 
   */
  goAndGetLabel(label) {
    this.addEvent.emit(label);
    this.notesService.goLabel(this.trash.id,label.id,
      { "noteId": this.trash.id,"lableId": label.id })
      .pipe(takeUntil(this.destroy$))  
      .subscribe(data => {
        this.deleteCard.emit({
        })
      })
  }
  /**
   * @description Api call to get all the labels 
   */
  getAllLabels() {
    let newArray = [];
    this.notesService.getLabels()
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
      for (var i = 0; i < data['data']['details'].length; i++) {
        if (data['data']['details'][i].isDeleted == false) {
          newArray.push(data['data']['details'][i])
        }
      }
      this.labelArray = newArray;
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

