import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss']
})
export class ChangeColorComponent implements OnInit {
  accessToken = localStorage.getItem('token');
@Input() color;
@Output() colorEmit = new EventEmitter();
@Output() changeColor = new EventEmitter();
  constructor(private myHttpService: HttpService) { }
  colorArray = [[{ 'color': '#ffffff', 'name': 'White' },
  { 'color': '#f28b82', 'name': 'Red' },
  { 'color': '#fbbc04', 'name': 'Orange' },
  { 'color': '#fff475', 'name': 'Yellow' }],

  [{ 'color': '#ccff90', 'name': 'Green' },
  { 'color': '#a7ffeb', 'name': 'Teal' },
  { 'color': '#cbf0f8', 'name': 'Blue' },
  { 'color': '#aecbfa', 'name': 'Dark blue' }],

  [{ 'color': '#d7aefb', 'name': 'Purple' },
  { 'color': '#fdcfe8', 'name': 'Pink' },
  { 'color': '#e6c9a8', 'name': 'Brown' },
  { 'color': '#e8eaed', 'name': 'Gray' }]]

  ngOnInit() {
  }

  colorsEdit(id)
  {
    this.colorEmit.emit(id)
    if(this.color!=undefined)
    {
  this.myHttpService.postColor('/notes/changesColorNotes',
      {
        "color": id,
        "noteIdList": [this.color.id]
      }, this.accessToken).subscribe(
        (data) => {
          localStorage.setItem('colorId',this.color.id);
          this.changeColor.emit({
 })
        },
        error => {
        })
    }
  }
}
