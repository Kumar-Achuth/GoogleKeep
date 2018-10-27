import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})
export class LabelsComponent implements OnInit {
body : any ={}
hide = true;
@Output() newEvent = new EventEmitter();
@Input() trash;
    accessToken = localStorage.getItem('token');
   id =  localStorage.getItem('userId');

  constructor(private myHttpService: HttpService,public dialogRef: MatDialogRef<NavbarComponent>) { }

  ngOnInit() {
  }
  addLabels()
  {
    this.body =
    {
        "label": document.getElementById('labelId').innerHTML,
        "isDeleted": false,
        "userId": this.id
    }
    console.log(this.body); 
  this.myHttpService.addLabel('/noteLabels',this.body,this.accessToken).subscribe(response=>{
    console.log("successfull",response);
    this.dialogRef.close();
    this.newEvent.emit({
    })
  },error=>{
    console.log("failed",error)
  })
  console.log("accessToken",this.accessToken)
  }
}
