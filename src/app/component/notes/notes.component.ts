import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesInformation } from 'src/app/core/models/notes-information';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  private cards: NotesInformation[] = [];
  private pinnedNotes: any = [];
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
        console.log(this.cards)
      },
        error => {
          ;
        })
  }
  /**
   * @description Get Api call for getting pinned Notes
   */
  getPinedNotes() {
    this.notesService.getNotes()
      .subscribe(data => {
        this.pinnedNotes = [];
        for (var i = data["data"]['data'].length - 1; i >= 0; i--) {
          if (data["data"]['data'][i].isDeleted == false &&
            data["data"]['data'][i].isArchived == false &&
            data["data"]['data'][i].isPined == true) {
            this.pinnedNotes.push(data["data"]['data'][i])
          }
        }
        console.log(this.pinnedNotes)
      },
        error => {
          ;
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
}
