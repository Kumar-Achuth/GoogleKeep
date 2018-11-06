import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {
  public hide: boolean = true;
  body: any = {}
  @Output() newEvent = new EventEmitter();
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,
    private router: Router) { }
  accessToken = localStorage.getItem('token');
  ngOnInit() {
  }
}
