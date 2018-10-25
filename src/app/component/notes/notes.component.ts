import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  cards : any = [];
  accessToken = localStorage.getItem('token');
  constructor(private myHttpService: HttpService, private router : Router) { }

  ngOnInit() {
    this.getNotes();
  }
 getNotes()
 {
   this.cards = [];
  this.myHttpService.getNotes('notes/getNotesList',this.accessToken).subscribe(data => {
    console.log('response', data);
    for (var i = data["data"]['data'].length-1; i >= 0; i--) {
      if(data["data"]['data'][i].isDeleted==false && data["data"]['data'][i].isArchived==false)
      {
        this.cards.push(data["data"]['data'][i])
      }
      // this.cards = (data["data"]['data']);
    }
    console.log(this.cards);
  }, error=>{
    console.log(error)
;    })
 }
 eventEntry(event)
 {
   if(event)
   {
   this.getNotes();
   }

 }
}
