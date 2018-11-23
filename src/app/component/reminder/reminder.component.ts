import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  private reminderArray: any = [];
  constructor(private notesService: NotesService) { }
  ngOnInit() {
    this.getReminders();
  }
  /**
   * @description Get Api call for NotesList with reminders
   */
  getReminders() {
    this.notesService.getReminder().subscribe(
        (data) => {
          this.reminderArray = data['data'].data;
          this.reminderArray.sort((a: any, b: any) =>
            new Date(a.reminder).getTime() - new Date(b.reminder).getTime()
          )
        })
  }
}
