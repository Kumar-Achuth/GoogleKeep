import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';

@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrls: ['./add-archive.component.scss']
})
export class AddArchiveComponent implements OnInit {
  private accessToken = localStorage.getItem('token');
  private body: any = {}
  private cards:any=[];
  @Input() archive;
  @Output() archiveEmit = new EventEmitter();
  constructor(private myHttpService: HttpService) { }
  ngOnInit() {
  }
/**
 * @description : Add Archive Api Call 
 * @param : isArchived, noteIdList
 */
  addArchive() {
    this.myHttpService.postArchive('notes/archiveNotes', {
      "isArchived": true,
      "noteIdList": [this.archive.id]
    }, this.accessToken).subscribe(data => {
      this.archiveEmit.emit({
      })
    })
  }
  /**
   * @description UnArchive Function Api
   */
  unArchive() {
    this.myHttpService.postArchive('notes/archiveNotes', {
      "isArchived": false,
      "noteIdList": [this.archive.id]
    }, this.accessToken).subscribe(data => {
      this.archiveEmit.emit({
      })
    })
  }  
}
