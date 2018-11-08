import { Component, OnInit } from '@angular/core';
import { GlobalSearchService } from '../../core/services/globalSearchService/global-search.service';
import { HttpService } from '../../core/services/httpServices/http.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit {

  cards: any[];
  accessToken = localStorage.getItem('token');
  globalSearch: any;

  constructor(public myHttpService: HttpService, public data: GlobalSearchService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.globalSearch = message;
    })
    this.getNotes();
  }
  getNotes() {
    this.myHttpService.getNotes('notes/getNotesList', this.accessToken)
      .subscribe(data => {
        this.cards = [];
        for (var i = data["data"]['data'].length - 1; i >= 0; i--) {
          if (data["data"]['data'][i].isDeleted == false &&
            data["data"]['data'][i].isArchived == false) {
            this.cards.push(data["data"]['data'][i])
          }
        }
      }, error => {
        console.log(error) ;
      })
  }
}
