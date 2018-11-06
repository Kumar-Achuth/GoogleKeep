import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
  accessToken = localStorage.getItem('token');
  id = localStorage.getItem('userId');
  body: any = {}
  labelArray: any = [];
  @Input() trash;
  @Output() deleteCard = new EventEmitter();
  @Output() addEvent = new EventEmitter();
  constructor(private myHttpService: HttpService) { }

  ngOnInit() {
    this.getAllLabels();
  }
  postToTrash(trash) {
    this.myHttpService.postTrash('notes/trashNotes', {
      "isDeleted": true,
      "noteIdList": [this.trash.id]
    }, this.accessToken).subscribe(data => {
      this.deleteCard.emit({
      })
    })
  }
  goAndGetLabel(label) {
    this.addEvent.emit(label);
    this.myHttpService.goLabel('notes/'+this.trash.id+'/addLabelToNotes/'+label.id+'/add',
      { "noteId": this.trash.id, "lableId": label.id },
      this.accessToken)
      .subscribe(data => {
        this.deleteCard.emit({
        })
      })
  }
  getAllLabels() {
    let newArray = [];
    this.myHttpService.getLabels('noteLabels/getNoteLabelList', this.accessToken)
    .subscribe(data => {
      for (var i = 0; i < data['data']['details'].length; i++) {
        if (data['data']['details'][i].isDeleted == false) {
          newArray.push(data['data']['details'][i])
        }
      }
      this.labelArray = newArray;
    })
  }
}

