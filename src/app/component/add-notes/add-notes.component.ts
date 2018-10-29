import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {
  public hide : boolean = true;
  body:any={}
  color : any ;
  @Output() newEvent = new EventEmitter();
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,private router : Router) { }
accessToken = localStorage.getItem('token');

  ngOnInit() {
  }
  // close()
  // {
  //     this.hide=!this.hide; 
  // }

addNotes()
{
  this.body =
  {
    'title':document.getElementById('titleId').innerHTML,
    'description' :document.getElementById('notesId').innerHTML ,
    'labelIdList' : '',
    'checklist' : '',
    'isPined' : 'false',
    'color' : this.color
  }

  console.log(this.body);
  
this.myHttpService.postNotes('notes/addNotes',this.body,this.accessToken).subscribe(response=>{
  console.log("successfull",response);
  this.newEvent.emit({
  })
  this.hide=!this.hide; 
  this.color = "#fafafa";

},error=>{
  this.hide=!this.hide; 
  console.log("failed",error)
  this.color = "#fafafa"
})
console.log("accessToken",this.accessToken)
}
colorChanges(event){
  console.log(event);
  this.color = event;
  
}
}
