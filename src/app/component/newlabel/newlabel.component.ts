import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { Params, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-newlabel',
  templateUrl: './newlabel.component.html',
  styleUrls: ['./newlabel.component.scss']
})
export class NewlabelComponent implements OnInit {
  private params: any;
  private label: any;
  private labelArray: any = [];  private accessToken = localStorage.getItem('token');

  constructor(private myHttpService: HttpService, private router: ActivatedRoute) { }
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

