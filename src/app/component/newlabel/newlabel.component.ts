import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { Params, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-newlabel',
  templateUrl: './newlabel.component.html',
  styleUrls: ['./newlabel.component.scss']
})
export class NewlabelComponent implements OnInit {
  params: any;
  label: any;
  labelArray: any = [];
  constructor(private myHttpService: HttpService, private router: ActivatedRoute) { }
  accessToken = localStorage.getItem('token');
  ngOnInit() {
    this.router.params.subscribe(
      (params: Params) => {
        this.label = params['label']
        this.getNoteLabels(this.label)
      })
  }
  /**
   * @description Get Api to get all the notes according to labels
   */
  getNoteLabels(label) {
    this.myHttpService.getindividualLabel('notes/getNotesListByLabel/' + label + '',
      null, this.accessToken).subscribe(
        (data) => {
          this.labelArray = data['data'].data;
        }),
      () => {
      }
  }
}

