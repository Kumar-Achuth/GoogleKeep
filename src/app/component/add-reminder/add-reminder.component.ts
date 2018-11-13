import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { throwMatDuplicatedDrawerError } from '@angular/material';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss']
})
export class AddReminderComponent implements OnInit {
  @Input() reminder;
  @Output() remindEmit = new EventEmitter();
  accessToken = localStorage.getItem('token');
  body = {};
  show = true;
  public currentDate = new Date();
  reminders: any[] = [
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 AM'},
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM'}];
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
          currentDate.getDate(), 8, 0, 0, 0)
      }, this.accessToken).subscribe(data => {
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
        console.log('Post is successfull ', data);
        this.remindEmit.emit({
        })
      })
  }
  addWeeklyReminder(reminder) {
    let currentDate = new Date();
    this.myHttpService.postArchive('notes/addUpdateReminderNotes',
      {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(currentDate.getFullYear(), currentDate.getMonth(),
          currentDate.getDate() + 7, 8, 0, 0, 0)
      }, this.accessToken).subscribe(data => {
        console.log('Post is successfull ', data);
        this.remindEmit.emit({
        })
      })
  }


  datePickReminder() {
    this.show = !this.show;
  }
}
