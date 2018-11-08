import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  cards: any = []
  accessToken = localStorage.getItem('token');
  constructor(private myHttpService: HttpService) { }

  ngOnInit() {
    this.getArchiveNotes();
  }
  getArchiveNotes() {
    this.myHttpService.getArchiveNotes('notes/getArchiveNotesList',
      this.accessToken).subscribe(data => {
        for (var i = 0; i < data["data"]['data'].length; i++) {
          this.cards = (data["data"]['data']);
        }
      }, error => {
      })
  }
  unArchive(archive) {
    this.myHttpService.postArchive('notes/archiveNotes', {
      "isArchived": false,
      "noteIdList": [archive]
    }, this.accessToken).subscribe(data => {
      this.getArchiveNotes();
    })
  }

}
