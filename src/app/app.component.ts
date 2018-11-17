import { Component } from '@angular/core';
import { MessagingService } from './core/services/messageService/messaging.service';
// import { HttpService } from './services/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'googleKeep';
  message;
  constructor(private msgService: MessagingService) { }

ngOnInit()
{
  this.msgService.getPermission()
  this.message = this.msgService.currentMessage
}
}
