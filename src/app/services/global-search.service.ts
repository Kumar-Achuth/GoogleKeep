import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {
  private messageSource = new Subject();
  currentMessage = this.messageSource.asObservable();
  deletedLabel=this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }
  deleteMessage(message : boolean){
    this.messageSource.next(message)
  }

}
