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
  this.myHttpService.getNotes('notes/getNotesList',this.accessToken).subscribe(data => {
    console.log('response', data);
    for (var i = 0; i < data["data"]['data'].length; i++) {
      
      this.cards.push(data["data"]['data'][i]);
    }
    console.log(this.cards);
  }, error=>{
    console.log(error)
;    })
 }
 eventEntry()
 {
   if(event)
  this.myHttpService.getNotes('notes/getNotesList',this.accessToken).subscribe(data => {
    console.log('response', data);
    for (var i = 0; i < data["data"]['data'].length; i++) {
      
      this.cards.push(data["data"]['data'][i]);
    }
    console.log(this.cards);
  }, error=>{
    console.log(error)
;    })
 }
}
