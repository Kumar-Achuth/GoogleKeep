import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  cards: any = [];
  accessToken = localStorage.getItem('token');
  constructor(private myHttpService: HttpService, private router: Router) { }
  ngOnInit() {
    this.getTrash();
  }
  deleteForever(card) {
    console.log(card);
    this.myHttpService.foreverTrash('notes/deleteForeverNotes', {
      "isDeleted": false,
      "noteIdList": [card]
    }, this.accessToken).subscribe(data => {
      console.log('response', data);
      this.getTrash()
    })
  }
  getTrash() {
    this.myHttpService.getTrashNotes('notes/getTrashNotesList', this.accessToken).subscribe(data => {
      console.log('response', data);
      for (var i = 0; i < data["data"]['data'].length; i++) {
        this.cards = (data["data"]['data']);
      }
      console.log(this.cards);
    }, error => {
      console.log(error)
        ;
    })
  }
}
