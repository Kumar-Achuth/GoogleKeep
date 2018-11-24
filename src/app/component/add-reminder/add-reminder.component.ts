/************************************************************************************************
*  Execution       : 1. default node         cmd> addReminder.ts 
*        
*  Purpose         : To Add Reminders to notes
* 
*  @file           : addReminder.ts
*  @description    : To Add Reminders to notes
*  @module         : addReminder.ts - This is optional if expeclictly its an npm or local package
*  @author         : KumarAchuth <achuthkumar146@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit, Input, Output,OnDestroy, EventEmitter } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss']
})
export class AddReminderComponent implements OnInit ,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
 
  private body = {};
  private show = true;
  private currentDate = new Date();
  private reminders: any[] = [
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 AM' },
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM' }];
  constructor(private notesService: NotesService) { }
  @Input() reminder;
  @Output() dateEmit= new EventEmitter();
  @Output() remindEmit = new EventEmitter();
  ngOnInit() {
  }
  /**
   * @description Add to reminder api call 
   */
  addReminder() {
    let currentDate = new Date();
    var dates =  new Date(currentDate.getFullYear(),currentDate.getMonth(),
    currentDate.getDate(), 20, 0, 0, 0);
    this.dateEmit.emit(dates)
    this.notesService.reminder(
      {
        "noteIdList": [this.reminder.id],
        "reminder": dates,
          
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.remindEmit.emit({
        })
      })
  }
  addTomorrowReminder() {
    let currentDate = new Date();
    var dates2= new Date(currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 1, 8, 0, 0, 0)
    this.dateEmit.emit(dates2);
    this.notesService.reminder(
      {
        "noteIdList": [this.reminder.id],
        "reminder": dates2
      }).pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.remindEmit.emit({
        })
      })
  }
  addWeeklyReminder(reminder) {
    let currentDate = new Date();
    var dates3=new Date(currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 7, 8, 0, 0, 0);
    this.dateEmit.emit(dates3);
    this.notesService.reminder(
      {
        "noteIdList": [this.reminder.id],
        "reminder": dates3
      }).pipe(takeUntil(this.destroy$))
      .subscribe(data => {
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
  private reminderBody = {
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
      var dates4=  new Date(date.getFullYear(), date.getMonth(),
      date.getDate(), 8, 0, 0, 0);
      this.dateEmit.emit(dates4);
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder":dates4
      }
      this.notesService.reminder(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
          this.remindEmit.emit()
        })
    } else if (timing == '1:00 PM') {
      var dates5=new Date(date.getFullYear(), date.getMonth(),
      date.getDate(), 13, 0, 0, 0);
      this.dateEmit.emit(dates5);
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder": dates5
      }
      this.notesService.reminder(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
          this.remindEmit.emit()
        })
    } else if (timing == '6:00 PM') {
    var  dates6=new Date(date.getFullYear(), date.getMonth(),
      date.getDate(), 18, 0, 0, 0)
      this.dateEmit.emit(dates6)
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder":dates6
      }
      this.notesService.reminder(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
          this.remindEmit.emit()
        })
    } else if (timing == '9:00 PM') {
      var dates7=new Date(date.getFullYear(), date.getMonth(),
      date.getDate(), 21, 0, 0, 0)
      this.dateEmit.emit(dates7)
      this.body = {
        "noteIdList": [this.reminder.id],
        "reminder": dates7
      }
      this.notesService.reminder( this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
          this.remindEmit.emit()
        })
    } else if (timing == this.reminderBody.time) {
      var x;
      var splitTime = this.reminderBody.time.split("", 8);
      var hour = Number(splitTime[0] + splitTime[1]);
      var minute = Number(splitTime[3] + splitTime[4]);
      var ampm = (splitTime[6] + splitTime[7]);

      if (ampm == 'AM' || ampm == 'am') {
        var dates8=new Date(date.getFullYear(), date.getMonth(),
        date.getDate(), hour, minute, 0, 0);
        this.dateEmit.emit(dates8)
        this.body = {
          "noteIdList": [this.reminder.id],
          "reminder": dates8
        }
        this.notesService.reminder(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
            this.remindEmit.emit()
          })
      } else if (ampm == 'PM' || ampm == 'pm') {
        var date9=  new Date(date.getFullYear(), date.getMonth(),
        date.getDate(), hour + 12, minute, 0, 0);
        this.dateEmit.emit(date9)
        this.body = {
          "noteIdList": [this.reminder.id],
          "reminder":date9
        }
        this.notesService.reminder(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
            this.remindEmit.emit()
          })
      }
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
}
}
