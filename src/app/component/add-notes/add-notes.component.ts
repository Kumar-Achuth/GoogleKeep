import { Component, OnInit } from '@angular/core';
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
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,private router : Router) { }
accessToken = localStorage.getItem('token');

  ngOnInit() {
  }
  close()
  {
      this.hide=!this.hide; 
  }

addNotes()
{
  this.body =
  {
    'title':document.getElementById('titleId'),
    'description' :document.getElementById('notesId') ,
    'labelIdList' : '',
    'checklist' : '',
    'isPined' : 'false',
  }
this.myHttpService.postNotes('notes/addNotes',this.body,this.accessToken).subscribe(response=>{
  console.log("successfull",response);
    this.hide=!this.hide; 

},error=>{
  console.log("failed",error)
})
console.log("accessToken",this.accessToken)
}

}
