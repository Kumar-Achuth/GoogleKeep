import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.css']
})
export class AddReminderComponent implements OnInit {
  @Input() reminder;
  @Output() remindEmit = new EventEmitter();
  accessToken = localStorage.getItem('token');
  constructor(private myHttpService: HttpService) { }
  ngOnInit() {
  }
  addReminder() {
    this.myHttpService.postArchive('notes/' + this.reminder.id + '/addUpdateReminderNotes', {
      "title": this.reminder.title,
      "description": this.reminder.description,
      "reminder": [
        "2018-11-05T11:35:08.678Z"
      ],
    }, this.accessToken).subscribe(data => {
      console.log('Post is successfull ', data);
      this.remindEmit.emit({
      })
    })
  }
}
