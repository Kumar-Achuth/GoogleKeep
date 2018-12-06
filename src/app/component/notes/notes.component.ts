/************************************************************************************************
*  Execution       : 1. default node         cmd> notes.ts 
*        
*  Purpose         : Get the Added Notes Instantly and Display them 
* 
*  @file           : notes.ts
*  @description    : Get all the pinned and un-pinned Notes and display them
*  @module         : notes.ts - This is optional if expeclictly its an npm or local package
*  @author         : KumarAchuth <achuthkumar146@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotesInformation } from 'src/app/core/models/notes-information';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators'
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  private cards: NotesInformation[] = [];
  private pinnedNotes: any = [];
  private show = false;
  constructor(private notesService: NotesService, private router: Router) { }
  ngOnInit() {
    this.getNotes();
    this.getPinedNotes();
  }
  /**
   * Get api call for getting notes 
   */
  getNotes() {
    this.notesService.getNotes()
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
        this.cards = [];
        var noteList:NotesInformation[]=data["data"]['data'];
        for (var i = noteList.length - 1; i >= 0; i--) {
          if (noteList[i].isDeleted == false &&
            noteList[i].isArchived == false &&
            noteList[i].isPined == false) {
            this.cards.push(noteList[i])
          }
        }
        this.show=true;
      })
  }

  /**
   * @description Get Api call for getting pinned Notes
   */
  getPinedNotes() {
    this.notesService.getNotes()
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
        this.pinnedNotes = [];
        for (var i = data["data"]['data'].length - 1; i >= 0; i--) {
          if (data["data"]['data'][i].isDeleted == false &&
            data["data"]['data'][i].isArchived == false &&
            data["data"]['data'][i].isPined == true) {
            this.pinnedNotes.push(data["data"]['data'][i])
          }
        }
        this.show=true;
      })
  }
  eventEntry(event) {
    if (event) {
      this.getNotes();
      this.getPinedNotes();
    }
  }
  new(event:NotesInformation){
    this.cards.splice(0,0,event)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
