import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
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
  public labelId =[];
  public labelName=[];
  body:any={};
  data : any ;
    show : any = 0;
  color : any = "#fafafa";
  accessToken = localStorage.getItem('token');
  // id = localStorage.getItem('id');
  @Output() newEvent = new EventEmitter();
  labelArray: any[];
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,private router : Router) { }

  ngOnInit() {
this.getAllLabels();
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
  'labelIdList' : JSON.stringify(this.labelId),
  'checklist' : '',
  'isPined' : 'false',
  'color' : this.color
},this.accessToken).subscribe(response=>{
  console.log("successfull",response);
 
  this.newEvent.emit({
  })
  this.labelName=[];
  this.hide=!this.hide;
  this.color = "#fafafa";
  this.show = 0;
},error=>{ 
  console.log("failed",error)
  this.color = "#fafafa";
  this.hide=!this.hide;
  this.labelName=[];
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

instantLabel(event){
  console.log(event)
  if(this.labelName.indexOf(event)<0){
  this.labelId.push(event.id);
  this.labelName.push(event);
  console.log(this.labelName)
  console.log(event.id);
  
  }else{
  this.labelId.splice(this.labelId.indexOf(event),1)
  this.labelName.splice(this.labelName.indexOf(event),1)
  }
  }
  getAllLabels(){
    let newArray=[];
    this.myHttpService.getLabels('noteLabels/getNoteLabelList',this.accessToken).subscribe(data => {
      console.log("Successfull", data);
      for (var i = 0; i < data['data']['details'].length; i++) {
        if (data['data']['details'][i].isDeleted == false) {
          newArray.push(data['data']['details'][i])
        }
        else {
          console.log('Ok')
        }
      } 
      this.labelArray=newArray;
    })
  }

// clickFunc(temp){
//   if (!this.array2.some((data) => data == temp.label))
//   {
//   this.array1.push(temp.id);
//   this.array2.push(temp.label);
//   }
//   else{
//   const index = this.array2.indexOf(temp.label, 0);
//   if (index > -1) {
//   this.array2.splice(index, 1);
//   }
//   }
//   }
}
