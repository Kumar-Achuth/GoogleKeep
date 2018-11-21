import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { Params, ActivatedRoute } from '@angular/router';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators'

@Component({
  selector: 'app-newlabel',
  templateUrl: './newlabel.component.html',
  styleUrls: ['./newlabel.component.scss']
})
export class NewlabelComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  private params: any;
  private label: any;
  private labelArray: any = []; 
  private accessToken = localStorage.getItem('token');

  constructor(private notesService: NotesService, private router: ActivatedRoute) { }
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
    this.notesService.getindividualLabel(label)
    .pipe(takeUntil(this.destroy$))  
    .subscribe(
        (data) => {
          this.labelArray = data['data'].data;
        }),
      () => {
      }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}

