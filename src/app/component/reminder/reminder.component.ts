import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { MatSnackBar } from '@angular/material';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  private body: any = {};
  private accessToken = localStorage.getItem('token');
  private reminderArray: any = [];
  constructor(private myHttpService: HttpService) { }
  ngOnInit() {
    this.getReminders();
  }
  /**
   * @description Get Api call for NotesList with reminders
   */
  getReminders() {
    this.myHttpService.getRemind('notes/getReminderNotesList/',
      this.accessToken).subscribe(
        (data) => {
          this.reminderArray = data['data'].data;
          this.reminderArray.sort((a: any, b: any) =>
            new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
          )
        }),
      error => {
      }
  }
}
