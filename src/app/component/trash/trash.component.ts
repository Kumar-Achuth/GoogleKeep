import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/services/httpServices/http.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteTrashComponent } from '../delete-trash/delete-trash.component';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  cards: any = [];
  accessToken = localStorage.getItem('token');
  constructor(private myHttpService: HttpService, public dialog: MatDialog, private router: Router) { }
  ngOnInit() {
    this.getTrash();
  }
  deleteForever(card) {
    const dialogRef = this.dialog.open(DeleteTrashComponent, {
      width: '500px',
      height: '100px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.myHttpService.foreverTrash('notes/deleteForeverNotes', {
          "isDeleted": false,
          "noteIdList": [card]
        }, this.accessToken).subscribe(data => {
          this.getTrash()
        })
      }
    });
  }
  getTrash() {
    this.myHttpService.getTrashNotes('notes/getTrashNotesList', this.accessToken)
      .subscribe(data => {
        for (var i = 0; i < data["data"]['data'].length; i++) {
          this.cards = (data["data"]['data']);
        }
      }, error => {
        ;
      })
  }
  postToTrash(card) {
    this.myHttpService.postTrash('notes/trashNotes', {
      "isDeleted": false,
      "noteIdList": [card]
    }, this.accessToken).subscribe(data => {
      this.getTrash()
    })
  }
}

