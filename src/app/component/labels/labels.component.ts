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
labelArray1  : any = [];
@Output() newEvent = new EventEmitter();
@Input() trash;
    accessToken = localStorage.getItem('token');
   id =  localStorage.getItem('userId');

  constructor(private myHttpService: HttpService,public dialogRef: MatDialogRef<NavbarComponent>) { }

  ngOnInit() {
    this.myHttpService.getLabels('noteLabels/getNoteLabelList',this.accessToken).subscribe(data=>{
      console.log("Get request is Successful",data);
      for(var i= 0 ; i< data['data']['details'].length; i++)
      {
        if(data['data']['details'][i].isDeleted == false){
          this.labelArray1.push(data['data']['details'][i])
        }
        else{
          console.log('Ok')
        }
      }
    })
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
    this.dialogRef.close();
  })
  console.log("accessToken",this.accessToken)
  }
  deleteThisLabel(id){
    this.myHttpService.deleteLabel('/noteLabels/'+id+'/deleteNoteLabel',this.accessToken).subscribe(response=>{
      console.log("successfull",response);
    })
  }
}
