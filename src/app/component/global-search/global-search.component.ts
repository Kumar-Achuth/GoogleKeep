import { Component, OnInit,OnDestroy } from '@angular/core';
import { GlobalSearchService } from '../../core/services/globalSearchService/global-search.service';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 

  private cards: any[];
  private accessToken = localStorage.getItem('token');
  private globalSearch: any;

  constructor(private notesService: NotesService, private data: GlobalSearchService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.globalSearch = message;
    })
    this.getNotes();
  }
  /**
   * @description Get Notes Api 
   */
  getNotes() {
    this.notesService.getNotes()
    .pipe(takeUntil(this.destroy$))  
    .subscribe(data => {
        this.cards = [];
        for (var i = data["data"]['data'].length - 1; i >= 0; i--) {
          if (data["data"]['data'][i].isDeleted == false &&
            data["data"]['data'][i].isArchived == false) {
            this.cards.push(data["data"]['data'][i])
          }
        }
      }, error => {
      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
}
}
