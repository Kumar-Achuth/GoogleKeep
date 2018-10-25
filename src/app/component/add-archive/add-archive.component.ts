import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrls: ['./add-archive.component.css']
})
export class AddArchiveComponent implements OnInit {
  accessToken = localStorage.getItem('token');
body : any = {}
@Input() archive;
  constructor(private myHttpService: HttpService) { }

  ngOnInit() {
  }
  addArchive(archive)
  {
console.log(this.archive);
    console.log(this.accessToken)
    this.myHttpService.postArchive('notes/archiveNotes',{
      "isArchived":true,
    "noteIdList":[this.archive.id]
  }, this.accessToken).subscribe(data => {
    console.log('response', data);
   
    })
  }
}
