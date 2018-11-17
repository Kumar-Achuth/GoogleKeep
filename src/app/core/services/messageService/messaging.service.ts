import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
  })
export class MessagingService {
  messaging;
  currentMessage = new BehaviorSubject(null)
  constructor() { 
    firebase.initializeApp({
      'messagingSenderId': '263147610417'
    })
  this.messaging = firebase.messaging()
  }
  /**
   * @description Push Notification Request And Token Set Function
   */
  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(pushToken => {
        localStorage.setItem('pushToken',pushToken)
        console.log(pushToken)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }
}