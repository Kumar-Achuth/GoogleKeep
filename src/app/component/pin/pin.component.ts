import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { LoggerService } from '../../core/services/loggerService/logger.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  accessToken = localStorage.getItem('token');
  @Input() pinNote;
  @Output() pinEvent = new EventEmitter();
  constructor(private myHttpService: HttpService, ) { }

  ngOnInit() {
  }
  /**
   * @description Post Api call for pinning the notse
   */
  pinIt() {
    this.myHttpService.deleteChip('notes/pinUnpinNotes',
      {
        "noteIdList": [this.pinNote.id],
        "isPined": true
      },
      this.accessToken).subscribe(data => {
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
    this.myHttpService.deleteChip('notes/pinUnpinNotes',
      {
        "noteIdList": [this.pinNote.id],
        "isPined": false
      },
      this.accessToken).subscribe(data => {
        LoggerService.log('Success', data)
        this.pinEvent.emit({
        })
      })
    error => {
      LoggerService.error(error);
    };
  }
}
