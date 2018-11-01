import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
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
editShow : any;
input : any = {};
labelArray1  : any = [];

@ViewChild('labelsId') labelsId: ElementRef;
@ViewChild('labelId') labelId: ElementRef;


@Output() newEvent = new EventEmitter();
@Input() trash;
    accessToken = localStorage.getItem('token');
   id =  localStorage.getItem('userId');

  constructor(private myHttpService: HttpService,public dialogRef: MatDialogRef<NavbarComponent>) { }

  ngOnInit() {
 this.getAllLabels();
  }
  addLabels()
  {
    this.body =
    {
        "label": this.labelId.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": this.id
    }
    console.log(this.body); 
  this.myHttpService.addLabel('/noteLabels',this.body,this.accessToken).subscribe(response=>{
    console.log("successfull",response);
    // this.dialogRef.close();
    this.getAllLabels();
    // this.newEvent.emit({
    // })
  },error=>{
    console.log("failed",error)
    // this.dialogRef.close();
  })
  console.log("accessToken",this.accessToken)
  }
  deleteThisLabel(id){
    this.myHttpService.deleteLabel('/noteLabels/'+id+'/deleteNoteLabel',this.accessToken).subscribe(response=>{
      this.getAllLabels();
      console.log("successfull",response);
    })
  }
 
  updateTheLabel(id){
    this.myHttpService.getUpdatedLabel('/noteLabels/'+id+'/updateNoteLabel', {
      "label" : this.labelsId.nativeElement.innerHTML,
      "isDeleted": false,
      "id": id,
      "userId": this.id
    },this.accessToken).subscribe(response=>{
      console.log("successfull",response);
    })
  }


  edit(id){
    this.editShow=id;
  }

  clear(){
    this.labelId.nativeElement.innerHTML='';
 }
 close(){
  this.dialogRef.close();
 }
getAllLabels(){
  let  newArray=[];
  this.myHttpService.getLabels('noteLabels/getNoteLabelList',this.accessToken).subscribe(data=>{
    console.log("Get request is Successful",data);
    for(var i= 0 ; i< data['data']['details'].length; i++)
    {
      if(data['data']['details'][i].isDeleted == false){
        newArray.push(data['data']['details'][i])
        
      }
      else{
        console.log('Ok')
      }
    }
    this.labelArray1 = newArray;
  })
}


}
