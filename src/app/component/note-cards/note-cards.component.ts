import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-cards',
  templateUrl: './note-cards.component.html',
  styleUrls: ['./note-cards.component.css']
})
export class NoteCardsComponent implements OnInit {
array : any =[]
  constructor() { }

  ngOnInit() {
    for( var i = 0; i <5; i++)
    {
    this.array.push(i)
    }
  }

}
