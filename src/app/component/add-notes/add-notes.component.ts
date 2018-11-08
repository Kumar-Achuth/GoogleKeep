import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit {
  public hide: boolean = true;
  public labelId = [];
  public labelName = [];
  body: any = {};
  data: any;
  show: any = 0;
  color: any = "#fafafa";
  listing = true;
  public i = 0;
  dataArray = [];
  accessToken = localStorage.getItem('token');
  @Output() newEvent = new EventEmitter();
  labelArray: any[];
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,
    private router: Router) { }
  ngOnInit() {
    this.getAllLabels();
  }
  toggle() {
    this.show = 1;
  }
  addNotes() {
    this.myHttpService.postNotes('notes/addNotes', {
      'title': document.getElementById('titleId').innerHTML,
      'description': document.getElementById('notesId').innerHTML,
      'labelIdList': JSON.stringify(this.labelId),
      'checklist': '',
      'isPined': 'false',
      'color': this.color
    }, this.accessToken).subscribe(response => {
      this.newEvent.emit({
      })
      this.labelName = [];
      this.hide = !this.hide;
      this.color = "#fafafa";
      this.show = 0
    }, error => {
      console.log("failed", error)
      this.color = "#fafafa";
      this.hide = !this.hide;
      this.labelName = [];
      this.show = 0
    })
  }
  colorChanges(event) {
    this.color = event;
  }
  onKeydown(event, key) {
    if (event.key === "Enter") {
      console.log(event);
    }
  }
  instantLabel(event) {
    if (this.labelName.indexOf(event) < 0) {
      this.labelId.push(event.id);
      this.labelName.push(event);
    } else {
      this.labelId.splice(this.labelId.indexOf(event), 1)
      this.labelName.splice(this.labelName.indexOf(event), 1)
    }
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
  enter() {
    this.i++;
    if (this.data != null) {
      console.log(event, "keydown");
      var obj = {
        "index": this.i,
        "data": this.data
      }
      this.dataArray.push(obj);
      this.data = null

    }
  }
  ondelete(deletedObj) {
    console.log("Ondelete function runnig");
    for (var i = 0; i < this.dataArray.length; i++) {
      if (deletedObj.index == this.dataArray[i].index) {
        this.dataArray.splice(i, 1);
        break;
      }
    }
    console.log(this.dataArray);
  }

  editing(event, edited) {

    if (event.code == "Enter") {
      console.log("enter pressed");
      for (var i = 0; i < this.dataArray.length; i++) {
        if (edited.index == this.dataArray[i].index) {
          this.dataArray[i].data == edited.data
        }
      }
      console.log(this.dataArray);

    }
  }


}
