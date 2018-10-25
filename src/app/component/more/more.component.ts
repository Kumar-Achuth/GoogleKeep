import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
  accessToken= localStorage.getItem('token');
body : any = {}
 @Input() trash;
 @Output() deleteCard = new EventEmitter();

  constructor(private myHttpService: HttpService) {}

  ngOnInit() {
  }
  postToTrash(trash)
  {
console.log(this.trash);
    console.log(this.accessToken)
    this.myHttpService.postTrash('notes/trashNotes',{
      "isDeleted":true,
    "noteIdList":[this.trash.id]
  }, this.accessToken).subscribe(data => {
    console.log('response', data);
    this.deleteCard.emit({
    })
    })
  }
  }


