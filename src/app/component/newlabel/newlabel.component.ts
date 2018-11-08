import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { MatSnackBar, MatChipInputEvent } from '@angular/material';
import { Router, Params, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-newlabel',
  templateUrl: './newlabel.component.html',
  styleUrls: ['./newlabel.component.scss']
})
export class NewlabelComponent implements OnInit {
  params: any;
  label: any;
  labelArray: any = [];
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,
    private router: ActivatedRoute) { }
  accessToken = localStorage.getItem('token');
  ngOnInit() {
    this.router.params.subscribe(
      (params: Params) => {
        this.label = params['label']
        this.getNoteLabels(this.label)
      })
  }
  getNoteLabels(label) {
    this.myHttpService.getindividualLabel('notes/getNotesListByLabel/' + label + '',
      null, this.accessToken).subscribe(
        (data) => {
          this.labelArray = data['data'].data;
        }),
      error => {
      }
  }
}

