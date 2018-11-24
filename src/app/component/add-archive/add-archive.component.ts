/************************************************************************************************
*  Execution       :   1. default node         cmd> addArchive.ts 
*        
*  Purpose         : To display small card & hiddencards & change color when clicked 
* 
*  Description    
* 
*  @file           : addArchive.ts
*  @overview       : To display small card & hiddencards & change color when clicked
*  @module         : addArchive.ts - This is optional if expeclictly its an npm or local package
*  @author         : KumarAchuth <achuthkumar146@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/

import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrls: ['./add-archive.component.scss']
})
export class AddArchiveComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  private cards:any=[];
  @Input() archive;
  @Output() archiveEmit = new EventEmitter();
  constructor(private notesService: NotesService) { }
  ngOnInit() {
  }
/**
 * @description : Add Archive Api Call 
 * @param : isArchived, noteIdList
 */
  addArchive() {
    this.notesService.postArchive({
      "isArchived": true,
      "noteIdList": [this.archive.id]
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.archiveEmit.emit({
      })
    })
  }
  /**
   * @description UnArchive Function Api
   */
  unArchive() {
    this.notesService.postArchive({
      "isArchived": false,
      "noteIdList": [this.archive.id]
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.archiveEmit.emit({
      })
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }  
}
