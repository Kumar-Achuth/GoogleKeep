import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteTrashComponent } from '../delete-trash/delete-trash.component';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  private cards: any = [];
  constructor(private notesService:NotesService, private dialog: MatDialog, 
    private router: Router) { }
  ngOnInit() {
    this.getTrash();
  }
  /**
   * @description : Delete Notes Forever APi call
   * @param card 
   */
  deleteForever(card) {
    const dialogRef = this.dialog.open(DeleteTrashComponent, {
      width: '500px',
      height: '100px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notesService.foreverTrash({
          "isDeleted": false,
          "noteIdList": [card]
        }).subscribe(data => {
          this.getTrash()
        })
      }
    });
  }
  /**
   * @description Get trash notes Api call
   */
  getTrash() {
    this.notesService.getTrashNotes()
      .subscribe(data => {
        for (var i = 0; i < data["data"]['data'].length; i++) {
          this.cards = (data["data"]['data']);
        }
      }, error => {
        ;
      })
  }
  /**
   * @description Restore Cards back to notes function
   * @param card 
   */
  postToTrash(card) {
    this.notesService.postTrash( {
      "isDeleted": false,
      "noteIdList": [card]
    }).subscribe(data => {
      this.getTrash()
    })
  }
 }

