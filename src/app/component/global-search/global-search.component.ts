import { Component, OnInit } from '@angular/core';
import { GlobalSearchService } from '../../services/global-search.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.css']
})
export class GlobalSearchComponent implements OnInit {
 
  cards: any[];
  accessToken = localStorage.getItem('token');
  globalSearch: any;

  constructor( public myHttpService : HttpService, public data : GlobalSearchService) { }

ngOnInit() {
    this.data.currentMessage.subscribe(message=>{
      this.globalSearch=message;
    })
    this.getNotes();
  }
getNotes()
  {
   //  this.cards = [];
   this.myHttpService.getNotes('notes/getNotesList',this.accessToken).subscribe(data => {
     this.cards = [];
     console.log('response', data);
     for (var i = data["data"]['data'].length-1; i >= 0; i--) {
       if(data["data"]['data'][i].isDeleted==false && data["data"]['data'][i].isArchived==false)
       {
         this.cards.push(data["data"]['data'][i])
       }
     }
     console.log(this.cards);
   }, error=>{
     console.log(error)
 ;    })
  }
}
