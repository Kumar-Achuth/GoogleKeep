import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {
  private messageSource = new Subject();
  private msgSource = new BehaviorSubject(false);
  currentMsg = this.msgSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  deletedLabel = this.messageSource.asObservable();
  viewList = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  deleteMessage(message: boolean) {
    this.messageSource.next(message)
  }
  sendMessage(message: boolean) {
    this.messageSource.next(message)
  }
  changeMsg(message: boolean) {
    this.msgSource.next(message);
  }
}
