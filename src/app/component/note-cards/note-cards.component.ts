import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-cards',
  templateUrl: './note-cards.component.html',
  styleUrls: ['./note-cards.component.css']
})
export class NoteCardsComponent implements OnInit {
array : any =[]
cards : any =[];
accessToken = localStorage.getItem('token');
@Input() cardsArray;

  constructor(private myHttpService: HttpService, private router : Router) { }

  ngOnInit() {
   
  }

  


}
