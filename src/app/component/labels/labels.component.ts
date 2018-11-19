import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef }
  from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { GlobalSearchService } from '../../core/services/globalSearchService/global-search.service';
import { DeleteLabelComponent } from '../delete-label/delete-label.component';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  private body: any = {}
  private hide = true;
  private editShow: any;
  private input: any = {};
  private labelArray1: any = [];
  private accessToken = localStorage.getItem('token');
  private id = localStorage.getItem('userId');
  @ViewChild('labelsId') labelsId: ElementRef;
  @ViewChild('labelId') labelId: ElementRef;
  @Output() newEvent = new EventEmitter();
  @Input() trash;
  constructor(private data: GlobalSearchService, private myHttpService: HttpService,
    private dialogRef: MatDialogRef<NavbarComponent>, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllLabels();
  }
  /**
   * @description Detecting Duplicate labels And Discarding them
   * And Api call For adding Labels
   */
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
  /**
   * @description Api CAll for Deleting Labels 
   * @param id 
   */
  deleteThisLabel(id) {
    const dialogRef = this.dialog.open(DeleteLabelComponent, {
      width: '500px',
      height: '100px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.myHttpService.deleteLabel('/noteLabels/' + id + '/deleteNoteLabel',
          this.accessToken).subscribe(response => {
            this.getAllLabels();
            this.data.deleteMessage(true)
          })
      }
    });
  }
  /**
   * @description Api call for Updating Labels 
   * @param id 
   */
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
  /**
   * @description Get Api Call for NoteLabels
   */
  getAllLabels() {
    this.myHttpService.getLabels('noteLabels/getNoteLabelList', this.accessToken)
      .subscribe(data => {
        let newArray = [];
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            newArray.push(data['data']['details'][i])
          }
        }
        this.labelArray1 = newArray;
      })
  }
}
