/************************************************************************************************
*  Execution       : 1. default node         cmd> collaboratorPage.ts 
*        
*  Purpose         : To Share Notes with other users 
* 
*  @file           : collaboratorPage.ts
*  @description    : Add Collaborator Api
*  @module         : collaboratorPage.ts - This is optional if expeclictly its an npm or local package
*  @author         : KumarAchuth <achuthkumar146@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { DialogData, UpdateNotesComponent } from '../update-notes/update-notes.component';
import { UserService } from 'src/app/core/services/userServices/user.service';
import { environment } from 'src/environments/environment';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-collaborator-page',
  templateUrl: './collaborator-page.component.html',
  styleUrls: ['./collaborator-page.component.scss']
})
export class CollaboratorPageComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  private image = localStorage.getItem('imageUrl')
  private img = environment.apiUrl + this.image;
  private searchNames: any = [];
  private userList = [];
  private collaborator: any = [];
  private email = localStorage.getItem('email');
  private firstName = localStorage.getItem('firstName');
  private lastName = localStorage.getItem('lastName')
  private userId = localStorage.getItem('userId');
  private owner = this.data["user"];
  private photo = environment.apiUrl + this.owner.imageUrl
  constructor(private userService: UserService, private notesService: NotesService,
    private dialog: MatDialog, private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CollaboratorPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }


  ngOnInit() {
    this.users();
  }
  /**
   * @description Dialog box close Function And Open Update Notes Dialog Box open 
   */
  cancel(): void {
    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      width: 'fit-content',
      maxWidth:'auto',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(() => {
    });
    this.dialogRef.close();
  }
  /**
   * @description Add Collaborator Api Call 
   */
  save(item) {
    this.notesService.postCollaborator(this.data.id, {
      "email": item.email,
      "firstName": item.firstName,
      "lastName": item.lastName,
      "userId": item.userId
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
      })
  }
  /**
   * @description Delete Collaborator Api Call 
   */
  deleteCollaborator(item) {
    this.notesService.collaboratorDelete(this.data.id, item.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        for (let i = 0; i < this.collaborator.length; i++) {
          if (item.userId == this.collaborator[i].userId) {
            this.collaborator.splice(i, 1);
          }
        }
      })
  }
  /**
   * @description Search User List Api Call
   */
  search() {
    this.userService.searchUserList({
      'searchWord': this.searchNames,
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.userList = response['data']['details'];
      })
  }
  /**
   * @description Remove Duplicates From The List
   * @param user 
   */
  enterNewLine(user) {
    for (let j = 0; j < this.collaborator.length; j++) {
      if (this.searchNames == this.collaborator[j].email) {
        this.snackBar.open("Collaborator already exists", "fail", {
          duration: 3000
        })
        this.searchNames = null;
        return false;
      }
    }
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].email == user) {
        this.collaborator.push(this.userList[i]);
      }
    }
    this.searchNames = [];
  }
  select(email) {
    this.searchNames = email;
  }
  users() {
    this.collaborator=[];
    for (let i = 0; i < this.data['collaborators'].length; i++) {
      this.collaborator.push(this.data['collaborators'][i]);
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  } 
}
