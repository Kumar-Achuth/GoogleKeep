import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {
  accessToken = localStorage.getItem('token');
@Input() color;
@Output() colorEmit = new EventEmitter();
@Output() changeColor = new EventEmitter();
  constructor(private myHttpService: HttpService) { }

  ngOnInit() {
  }

  colors(id)
  {
    this.colorEmit.emit(id)
    console.log(id);
    if(this.color!=undefined)
    {
  this.myHttpService.postColor('/notes/changesColorNotes',
      {
        "color": id,
        "noteIdList": [this.color.id]
      }, this.accessToken).subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          console.log(id);
          console.log(this.color.id);
          localStorage.setItem('colorId',this.color.id);
          this.changeColor.emit({
 })
        },
        error => {
          console.log("Error", error);
        })
    }
  }
}
