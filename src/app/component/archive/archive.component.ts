import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  private cards: any = []
  private accessToken = localStorage.getItem('token');
  private pin : any =[];
  private  unPin : any=[];
  constructor(private myHttpService: HttpService) { }
  ngOnInit() {
    this.getArchiveNotes();
    this.getunPinnedArchiveNotes();
  }
  /**
   * @description Get api Call for Getting All Archived NotesList
   */
  getArchiveNotes() {
    this.myHttpService.getArchiveNotes('notes/getArchiveNotesList',
      this.accessToken).subscribe(data => {
        for (var i = 0; i < data["data"]['data'].length; i++) {
          if(data["data"]['data'][i].isPined == true){
            this.pin = (data["data"]['data']);
          }
        }
      }, error => {
      })
  }
  getunPinnedArchiveNotes() {
    this.myHttpService.getArchiveNotes('notes/getArchiveNotesList',
      this.accessToken).subscribe(data => {
        for (var i = 0; i < data["data"]['data'].length; i++) {
          if(data["data"]['data'][i].isPined == false){
            this.unPin = (data["data"]['data']);
          }
        }
      }, error => {
      })
  }
}
