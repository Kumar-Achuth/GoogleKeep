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
  body:any={};
  show : any = 0;
  color : any = "#fafafa";
  accessToken = localStorage.getItem('token');
  @Output() newEvent = new EventEmitter();
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,private router : Router) { }

  ngOnInit() {
  }
  toggle()
  {
    this.show = 1;
  }
addNotes()
{  
this.myHttpService.postNotes('notes/addNotes', {
  'title':document.getElementById('titleId').innerHTML,
  'description' :document.getElementById('notesId').innerHTML ,
  'labelIdList' : '',
  'checklist' : '',
  'isPined' : 'false',
  'color' : this.color
},this.accessToken).subscribe(response=>{
  console.log("successfull",response);
  this.newEvent.emit({
  })
  this.hide=!this.hide;
  this.color = "#fafafa";
  this.show = 0;
},error=>{ 
  console.log("failed",error)
  this.color = "#fafafa";
  this.hide=!this.hide;
  this.show = 0;
})
}
colorChanges(event){
  console.log(event);
  this.color = event;
}
onKeydown(event,key) {
  if (event.key==="Enter") {
    console.log(event);
    // this.letterArray.push({})
  }
}

// addChecklist()
// {  
// this.myHttpService.postCheckList('notes/addNotes', {
//   'title':document.getElementById('titleId').innerHTML,
//   'description' :document.getElementById('notesId').innerHTML ,
//   'labelIdList' : '',
//   'checklist' : [],
//   'isPined' : 'false',
//   'color' : this.color
// },this.accessToken).subscribe(response=>{
//   console.log("successfull",response);
//   this.newEvent.emit({
//   })
//   this.hide=!this.hide;
//   this.color = "#fafafa";
//   this.show = 0;
// },error=>{ 
//   console.log("failed",error)
//   this.color = "#fafafa";
//   this.hide=!this.hide;
//   this.show = 0;
// })
// }



}
