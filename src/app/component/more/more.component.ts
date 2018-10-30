import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
  accessToken= localStorage.getItem('token');
  id =  localStorage.getItem('userId');
body : any = {}
labelArray : any = [];
 @Input() trash;
 @Output() deleteCard = new EventEmitter();

  constructor(private myHttpService: HttpService) {}

  ngOnInit() {

    this.myHttpService.getLabels('noteLabels/getNoteLabelList',this.accessToken).subscribe(data=>{
      console.log("Successfull",data);        
      for(var i= 0 ; i< data['data']['details'].length; i++)
      {
        if(data['data']['details'][i].isDeleted == false){
          this.labelArray.push(data['data']['details'][i])
        }
        else{
          console.log('Ok')
        }
      }
    })

  }
  postToTrash(trash)
  {
console.log(this.trash);
    console.log(this.accessToken)
    this.myHttpService.postTrash('notes/trashNotes',{
      "isDeleted":true,
      "noteIdList":[this.trash.id]
  }, this.accessToken).subscribe(data => {
    console.log('response', data);
    this.deleteCard.emit({
    })
    })
  }

  // getAll(id){
  //   this.myHttpService.getLabels('noteLabels/getNoteLabelList',this.accessToken).subscribe(data=>{
  //     console.log("Successfull",data);        
  //     for(var i= 0 ; i< data['data']['details'].length; i++)
  //     {
  //       if(data['data']['details'][i].isDeleted == false){
  //         this.labelArray.push(data['data']['details'][i])
  //       }
  //       else{
  //         console.log('Ok')
  //       }
  //     }
  //   })
  // }

goAndGetLabel(label){
  this.myHttpService.goLabel('notes/'+this.trash.id+'/addLabelToNotes/'+label+'/add',{"noteId" : this.trash.id, "lableId": label}, this.accessToken).subscribe(data => {
  console.log('response', data);
})
}




  }

