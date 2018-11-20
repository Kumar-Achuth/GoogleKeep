import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoggerService } from '../../core/services/loggerService/logger.service';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  @Input() pinNote;
  @Output() pinEvent = new EventEmitter();
  constructor(private notesService: NotesService, ) { }

  ngOnInit() {
  }
  /**
   * @description Post Api call for pinning the notse
   */
  pinIt() {
    this.notesService.pin({
        "noteIdList": [this.pinNote.id],
        "isPined": true
      },
      ).subscribe(data => {
        LoggerService.log('Success', data)
        this.pinEvent.emit({
        })
      })
    error => {
      LoggerService.error(error);
    };
  }
   /**
   * @description Post Api call for Unpinning the notse
   */
  unPinIt() {
    this.notesService.pin({
        "noteIdList": [this.pinNote.id],
        "isPined": false
      }).subscribe(data => {
        LoggerService.log('Success', data)
        this.pinEvent.emit({
        })
      })
    error => {
      LoggerService.error(error);
    };
  }
}
