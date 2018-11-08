import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef }
  from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatDialogRef } from '@angular/material';
import { GlobalSearchService } from '../../services/global-search.service';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  body: any = {}
  hide = true;
  editShow: any;
  input: any = {};
  labelArray1: any = [];

  @ViewChild('labelsId') labelsId: ElementRef;
  @ViewChild('labelId') labelId: ElementRef;


  @Output() newEvent = new EventEmitter();
  @Input() trash;
  accessToken = localStorage.getItem('token');
  id = localStorage.getItem('userId');

  constructor(public data: GlobalSearchService, private myHttpService: HttpService,
    public dialogRef: MatDialogRef<NavbarComponent>) { }

  ngOnInit() {
    this.getAllLabels();
  }
  addLabels() {
    var duplicate = this.labelId.nativeElement.innerHTML;
    for (var i = 0; i < this.labelArray1.length; i++) {
      if (this.labelArray1[i].label == duplicate) {
        alert(' Duplicate Values Not Allowed ')
        return false;
      }
    }
    this.body =
      {
        "label": this.labelId.nativeElement.innerHTML,
        "isDeleted": false,
        "userId": this.id
      }
    this.myHttpService.addLabel('/noteLabels', this.body, this.accessToken)
      .subscribe(response => {
        this.getAllLabels();
      }, error => {
      })
  }
  deleteThisLabel(id) {
    this.myHttpService.deleteLabel('/noteLabels/' + id + '/deleteNoteLabel',
      this.accessToken).subscribe(response => {
        this.getAllLabels();
        this.data.deleteMessage(true)
      })
  }

  updateTheLabel(id) {
    this.myHttpService.getUpdatedLabel('/noteLabels/' + id + '/updateNoteLabel', {
      "label": this.labelsId.nativeElement.innerHTML,
      "isDeleted": false,
      "id": id,
      "userId": this.id
    }, this.accessToken).subscribe(response => {
      this.getAllLabels();
    })
  }
  edit(id) {
    this.editShow = id;
  }

  clear() {
    this.labelId.nativeElement.innerHTML = '';
  }
  close() {
    this.dialogRef.close();
  }
  getAllLabels() {
    this.myHttpService.getLabels('noteLabels/getNoteLabelList', this.accessToken)
      .subscribe(data => {
        let newArray = [];
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            newArray.push(data['data']['details'][i])
          }
          else {
            console.log('Ok')
          }
        }
        this.labelArray1 = newArray;
      })
  }


}
