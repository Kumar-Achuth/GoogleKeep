import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  private  unPin : any=[];
  constructor(private notesService: NotesService) { }
  ngOnInit() {
    this.getunPinnedArchiveNotes();
  }
  /**
   * @description Get Archived Notes Api
   */
  getunPinnedArchiveNotes() {
    this.notesService.getArchiveNotes().subscribe(data => {
        for (var i = 0; i < data["data"]['data'].length; i++) {
          if(data["data"]['data'][i].isPined == false &&
          data["data"]['data'][i].isDeleted == false ){
            this.unPin = (data["data"]['data']);
          }
        }
      }, error => {
      })
  }
  
}
