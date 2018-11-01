import { Component, OnInit, Input,Output, EventEmitter,Inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UpdateNotesComponent } from '../update-notes/update-notes.component';

@Component({
  selector: 'app-note-cards',
  templateUrl: './note-cards.component.html',
  styleUrls: ['./note-cards.component.css']
})
export class NoteCardsComponent implements OnInit {
array : any =[]
labelArray = [];
cards : any =[];
body : any = {}
accessToken = localStorage.getItem('token');
@Input() cardsArray;
@Output() trashEvent = new EventEmitter();

  constructor(private myHttpService: HttpService, private router : Router,public dialog: MatDialog) { }
  @Output() dialogEvent = new EventEmitter();
  ngOnInit() {
   this.getAllLabels();
  }
  deleteEvent(event)
  {
    this.trashEvent.emit({
    })
  }
  openDialog(notes): void {
    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      width: 'fit-content',
      height : 'fit-content',
      backdropClass : '',
      data: notes
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllLabels();
      this.trashEvent.emit({
      })
    });
  }
  deleteChips(id,label){
    this.myHttpService.deleteChip('notes/'+id+'/addLabelToNotes/'+label+'/remove',
    {"noteId" : id, "lableId": label},
    this.accessToken).subscribe(data => {
      console.log('response', data);
      this.trashEvent.emit({
      })
    })
  }
getAllLabels(){
  // let newArray=[];
  this.myHttpService.getLabels('noteLabels/getNoteLabelList',this.accessToken).subscribe(data=>{
    let newArray=[];
    console.log("Successfull",data);        
    for(var i= 0 ; i< data['data']['details'].length; i++)
    {
      if(data['data']['details'][i].isDeleted == false){
        newArray.push(data['data']['details'][i])
      }
      else{
        console.log('Ok')
      }
    }
    this.labelArray=newArray;
  }) 
}
  
}
