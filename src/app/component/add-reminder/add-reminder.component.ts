import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { throwMatDuplicatedDrawerError } from '@angular/material';
import { FormControl } from '@angular/forms';

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
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 AM' },
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM' }];
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
        "reminder": new Date(currentDate.getFullYear(),
          currentDate.getMonth(),
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
        "reminder": new Date(currentDate.getFullYear(),
          currentDate.getMonth(),
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
        "reminder": new Date(currentDate.getFullYear(),
          currentDate.getMonth(),
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
  backPressDatepicker() {
    this.show = true;
  }
  reminderBody = {
    "date": new FormControl(new Date()),
    "time": ""
  }
  /**
   * @description Api call for Customized Reminder
   * @param date 
   * @param timing 
   */
  customReminder(date, timing) {
    timing.match('^[0-2][0-3]:[0-5][0-9]$');
    if (timing == '8:00 AM') {
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(),
          date.getDate(), 8, 0, 0, 0)
      }
      this.myHttpService.httpAddReminder('notes/addUpdateReminderNotes',
        this.accessToken, this.body).subscribe((result) => {
          this.remindEmit.emit()
        })
    } else if (timing == '1:00 PM') {
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(),
          date.getDate(), 13, 0, 0, 0)
      }
      this.myHttpService.httpAddReminder('notes/addUpdateReminderNotes',
        this.accessToken, this.body).subscribe((result) => {
          this.remindEmit.emit()
        })
    } else if (timing == '6:00 PM') {
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(),
          date.getDate(), 18, 0, 0, 0)
      }
      this.myHttpService.httpAddReminder('notes/addUpdateReminderNotes',
        this.accessToken, this.body).subscribe((result) => {
          this.remindEmit.emit()
        })
    } else if (timing == '9:00 PM') {
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(),
          date.getDate(), 21, 0, 0, 0)
      }
      this.myHttpService.httpAddReminder('notes/addUpdateReminderNotes',
        this.accessToken, this.body).subscribe((result) => {
          this.remindEmit.emit()
        })
    } else if (timing == this.reminderBody.time) {
      var x;
      var splitTime = this.reminderBody.time.split("", 8);
      var hour = Number(splitTime[0] + splitTime[1]);
      var minute = Number(splitTime[3] + splitTime[4]);
      var ampm = (splitTime[6] + splitTime[7]);

      if (ampm == 'AM' || ampm == 'am') {
        this.body = {
          "noteIdList": [this.reminder.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(),
            date.getDate(), hour, minute, 0, 0)
        }
        this.myHttpService.httpAddReminder('notes/addUpdateReminderNotes',
          this.accessToken, this.body).subscribe((result) => {
            this.remindEmit.emit()
          })
      } else if (ampm == 'PM' || ampm == 'pm') {
        this.body = {
          "noteIdList": [this.reminder.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(),
            date.getDate(), hour + 12, minute, 0, 0)
        }
        this.myHttpService.httpAddReminder('notes/addUpdateReminderNotes',
          this.accessToken, this.body).subscribe((result) => {
            this.remindEmit.emit()
          })
      }
    }
  }
}
