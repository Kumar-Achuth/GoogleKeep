import { Component, OnInit,Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
 cards : any =[]
 accessToken= localStorage.getItem('token');
  constructor(private myHttpService: HttpService) { }

  ngOnInit() {

    this.myHttpService.getArchiveNotes('notes/getArchiveNotesList',this.accessToken).subscribe(data => {
      console.log('response', data);
      for (var i = 0; i < data["data"]['data'].length; i++) {
      
        this.cards = (data["data"]['data']);
      }
      console.log(this.cards);
    }, error=>{
      console.log(error)
  ;    })
  }


}
