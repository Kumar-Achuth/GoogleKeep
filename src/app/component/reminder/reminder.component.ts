import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators'
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit , OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
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
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
