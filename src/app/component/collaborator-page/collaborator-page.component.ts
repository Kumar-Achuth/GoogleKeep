import { Component, OnInit, Inject,OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogData, UpdateNotesComponent } from '../update-notes/update-notes.component';
import { UserService } from 'src/app/core/services/userServices/user.service';
import { LoggerService } from 'src/app/core/services/loggerService/logger.service';
import { environment } from 'src/environments/environment';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-collaborator-page',
  templateUrl: './collaborator-page.component.html',
  styleUrls: ['./collaborator-page.component.scss']
})
export class CollaboratorPageComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 

  image =localStorage.getItem('imageUrl')
  img = environment.apiUrl + this.image;
  private searchNames:any=[];
  private userList=[];
  private collaborator:any=[];
  email= localStorage.getItem('email');
  firstName=localStorage.getItem('firstName');
  lastName=localStorage.getItem('lastName')
  userId=localStorage.getItem('userId');
  constructor(private userService:UserService,private notesService : NotesService,
     private dialog: MatDialog, 
    public dialogRef: MatDialogRef<CollaboratorPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit() {
  }
  /**
   * @description Dialog box close Function And Open Update Notes Dialog Box open 
   */
  cancel(): void {
    const dialogRef = this.dialog.open(UpdateNotesComponent, {
      width: 'fit-content',
      data: this.data
    });
    dialogRef.afterClosed().subscribe(() => {
    });
    this.dialogRef.close();  
  }
  /**
   * @description Add Collaborator Api Call 
   */
  save(index){
    // LoggerService.log('res',this.userList)
    this.notesService.postCollaborator(this.data.id,{
      "email": index.email ,
      "firstName":index.firstName,
      "lastName": index.lastName,
       "userId":index.userId
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(response =>{
      this.dialogRef.close();
      LoggerService.log('Success',response)
    })
  }
/**
 * @description Search User List Api Call
 */
  search(){
    this.userService.searchUserList({
      'searchWord': this.searchNames,
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe(response =>{
      LoggerService.log('Success',response);
      this.userList=response['data']['details'];
    })
  }

  select(email)
  {
    this.searchNames = email;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
}
}
