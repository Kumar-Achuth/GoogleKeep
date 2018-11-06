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
    let currentDate = new Date();
    this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),8,0,0,0)
      }, this.accessToken).subscribe(data => {
        console.log('Post is successfull ', data);
        this.remindEmit.emit({
        })
      })
  }
}
