import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
   token= localStorage.getItem('token');
   labelArray : any =[]
  model : any = {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    // token = localStorage.getItem('token');

  constructor(private myHttpService: HttpService,private snackBar: MatSnackBar, public route:ActivatedRoute,private breakpointObserver: BreakpointObserver, private router : Router,public dialog: MatDialog) {}
  
  doLogout()
  {
    console.log(this.token);
    this.myHttpService.postLogout('user/logout', this.token).subscribe(response=>{
      console.log("Successfull",response);
      this.snackBar.open("Logout ", "Successful",{
        duration : 1000
        })
      localStorage.removeItem('token');
      localStorage.removeItem('firstName');
      localStorage.removeItem('email');
      localStorage.removeItem('lastName');
      localStorage.removeItem('userId');

      this.router.navigateByUrl('/login');
      console.log("I am removed", this.token);
    },error=>{
      console.log("Failed")
    })
  }
  firstName : any;
  lastName : any;
  email : any;
 
  ngOnInit()
  {
    this.labelArray=[]
      this.firstName = localStorage.getItem('firstName');
      this.lastName = localStorage.getItem('lastName');
      this.email = localStorage.getItem('email');
  this.getLabels();
  
     
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '250px',
      height : 'fit-content',
      backdropClass : '',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLabels();
      console.log('The dialog was closed');
      // this.trashEvent.emit({})
      // this.animal = result;
    });
  }

// arr = [];
  getLabels(){
    let newArray=[];
    this.myHttpService.getLabels('noteLabels/getNoteLabelList',this.token).subscribe(data=>{
      console.log("Successfull",data);        
      for(var i= 0 ; i< data['data']['details'].length; i++)
      {
        if(data['data']['details'][i].isDeleted == false){
          newArray.push(data['data']['details'][i])
        }
        else{
          console.log('Ok')
        }
      }
      this.labelArray=newArray;
      console.log(data['data'].details)
    })

    
  }
  }
