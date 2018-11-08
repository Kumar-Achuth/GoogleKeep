import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss']
})
export class AddReminderComponent implements OnInit {
  @Input() reminder;
  show = 0;
  @Output() remindEmit = new EventEmitter();
  accessToken = localStorage.getItem('token');
  constructor(private myHttpService: HttpService) { }
  ngOnInit() {
  }
  /**
   * @description Add to reminder api call 
   */
  addReminder() {
    let currentDate = new Date();
    this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(currentDate.getFullYear(), currentDate.getMonth(),
          currentDate.getDate()+1, 8, 0, 0, 0)
      }, this.accessToken).subscribe(data => {
        this.show=1;
        console.log('Post is successfull ', data);
        this.remindEmit.emit({
        })
      })
  }

  addTomorrowReminder() {
    let currentDate = new Date();
    this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(currentDate.getFullYear(), currentDate.getMonth(),
          currentDate.getDate() + 1, 8, 0, 0, 0)
      }, this.accessToken).subscribe(data => {
        // this.show=1;
        console.log('Post is successfull ', data);
        this.remindEmit.emit({
        })
      })
  }
  addWeeklyReminder() {
    let currentDate = new Date();
    this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(currentDate.getFullYear(), currentDate.getMonth(),
          currentDate.getDate() + 7, 8, 0, 0, 0)
      }, this.accessToken).subscribe(data => {
        this.show=1;
        console.log('Post is successfull ', data);
        this.remindEmit.emit({
        })
      })
  }
}
