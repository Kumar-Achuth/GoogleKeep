import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrls: ['./add-archive.component.scss']
})
export class AddArchiveComponent implements OnInit {
  accessToken = localStorage.getItem('token');
  body: any = {}
  @Input() archive;
  @Output() archiveEmit = new EventEmitter();
  constructor(private myHttpService: HttpService) { }
  ngOnInit() {
  }
  addArchive() {
    this.myHttpService.postArchive('notes/archiveNotes', {
      "isArchived": true,
      "noteIdList": [this.archive.id]
    }, this.accessToken).subscribe(data => {
      this.archiveEmit.emit({
      })
    })
  }
}
