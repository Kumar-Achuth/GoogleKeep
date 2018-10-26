import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

    accessToken = localStorage.getItem('token');

  constructor(private myHttpService: HttpService,public dialogRef: MatDialogRef<NavbarComponent>) { }

  ngOnInit() {
  }
  addLabels()
  {
    this.body =
    {
        "label": document.getElementById('labelId').innerHTML,
        "isDeleted": true,
        "userId": "string" 
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
