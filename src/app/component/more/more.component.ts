import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
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
  /**
   * @description Post To Trash Api 
   * @param trash 
   */
  postToTrash(trash) {
    this.myHttpService.postTrash('notes/trashNotes', {
      "isDeleted": true,
      "noteIdList": [this.trash.id]
    }, this.accessToken).subscribe(data => {
      this.deleteCard.emit({
      })
    })
  }
  /**
   * @description Adding Labels to the Note Cards Api call
   * @param label 
   */
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
  /**
   * @description Api call to get all the labels 
   */
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

