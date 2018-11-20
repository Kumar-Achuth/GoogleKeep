import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';

@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrls: ['./add-archive.component.scss']
})
export class AddArchiveComponent implements OnInit {
  private cards:any=[];
  @Input() archive;
  @Output() archiveEmit = new EventEmitter();
  constructor(private notesService: NotesService) { }
  ngOnInit() {
  }
/**
 * @description : Add Archive Api Call 
 * @param : isArchived, noteIdList
 */
  addArchive() {
    this.notesService.postArchive({
      "isArchived": true,
      "noteIdList": [this.archive.id]
    }).subscribe(data => {
      this.archiveEmit.emit({
      })
    })
  }
  /**
   * @description UnArchive Function Api
   */
  unArchive() {
    this.notesService.postArchive({
      "isArchived": false,
      "noteIdList": [this.archive.id]
    }).subscribe(data => {
      this.archiveEmit.emit({
      })
    })
  }  
}
