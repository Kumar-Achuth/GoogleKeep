import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSnackBar, MatChipInputEvent } from '@angular/material';
import { Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';



export interface Fruit {
  name: string;
}




@Component({
  selector: 'app-newlabel',
  templateUrl: './newlabel.component.html',
  styleUrls: ['./newlabel.component.css']
})
export class NewlabelComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];




  public hide : boolean = true;
  body:any={}
  @Output() newEvent = new EventEmitter();
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,private router : Router) { }
accessToken = localStorage.getItem('token');
  ngOnInit() {
  }

  addNotes()
  {
    this.body =
    {
      'title':document.getElementById('titleId').innerHTML,
      'description' :document.getElementById('notesId').innerHTML ,
      'labelIdList' : '',
      'checklist' : '',
      'isPined' : 'false',
    }
  
    console.log(this.body);
    
  this.myHttpService.postNotes('notes/addNotes',this.body,this.accessToken).subscribe(response=>{
    console.log("successfull",response);
    this.newEvent.emit({
    })
      this.hide=!this.hide; 
  
  },error=>{
    console.log("failed",error)
    this.hide=!this.hide; 
  })
  console.log("accessToken",this.accessToken)
  }
  


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }




}
