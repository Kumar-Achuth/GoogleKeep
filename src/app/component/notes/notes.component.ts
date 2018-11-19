import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  private cards: any = [];
  private pinnedNotes: any = [];
  private accessToken = localStorage.getItem('token');
  constructor(private myHttpService: HttpService, private router: Router) { }
  ngOnInit() {
    this.getNotes();
    this.getPinedNotes();
  }
  /**
   * Get api call for getting notes 
   */
  getNotes() {
    this.myHttpService.getNotes('notes/getNotesList', this.accessToken)
      .subscribe(data => {
        this.cards = [];
        for (var i = data["data"]['data'].length - 1; i >= 0; i--) {
          if (data["data"]['data'][i].isDeleted == false &&
            data["data"]['data'][i].isArchived == false &&
            data["data"]['data'][i].isPined == false) {
            this.cards.push(data["data"]['data'][i])
          }
        }
      },
        error => {
          ;
        })
  }
  /**
   * @description Get Api call for getting pinned Notes
   */
  getPinedNotes() {
    this.myHttpService.getNotes('notes/getNotesList', this.accessToken)
      .subscribe(data => {
        this.pinnedNotes = [];
        for (var i = data["data"]['data'].length - 1; i >= 0; i--) {
          if (data["data"]['data'][i].isDeleted == false &&
            data["data"]['data'][i].isArchived == false &&
            data["data"]['data'][i].isPined == true) {
            this.pinnedNotes.push(data["data"]['data'][i])
          }
        }
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
}
