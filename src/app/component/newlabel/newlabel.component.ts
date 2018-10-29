import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newlabel',
  templateUrl: './newlabel.component.html',
  styleUrls: ['./newlabel.component.css']
})
export class NewlabelComponent implements OnInit {
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
  
}
