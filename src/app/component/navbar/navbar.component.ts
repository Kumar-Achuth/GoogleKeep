import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../core/services/httpServices/http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GlobalSearchService } from '../../core/services/globalSearchService/global-search.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  token = localStorage.getItem('token');
  labelArray: any = []
  model: any = {}
  ProfilePath: any;
  globalSearch: any;
  list = 0;
  isHandset$: Observable<boolean> = this.breakpointObserver.
    observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,
    public route: ActivatedRoute, private breakpointObserver: BreakpointObserver,
    private router: Router, public dialog: MatDialog, public data: GlobalSearchService) { }

  doLogout() {
    console.log(this.token);
    this.myHttpService.postLogout('user/logout', this.token).subscribe(response => {
      this.snackBar.open("Logout ", "Successful", {
        duration: 1000
      })
      localStorage.removeItem('token');
      localStorage.removeItem('firstName');
      localStorage.removeItem('email');
      localStorage.removeItem('lastName');
      localStorage.removeItem('userId');

      this.router.navigateByUrl('/login');
    }, error => {
    })
  }
  firstName: any;
  lastName: any;
  email: any;

  ngOnInit() {
    this.labelArray = []
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.getLabels();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '250px',
      height: 'fit-content',
      backdropClass: '',
      data: ''
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLabels();
    });
  }
  getLabels() {
    let newArray = [];
    this.myHttpService.getLabels('noteLabels/getNoteLabelList', this.token)
      .subscribe(data => {
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            newArray.push(data['data']['details'][i])
          }
          else {
            console.log('Ok')
          }
        }
        this.labelArray = newArray;
      })
  }
  goSearch() {
    this.router.navigate(['home/globalSearch']);
  }
  lookFor() {
    this.data.changeMessage(this.globalSearch)
  }
  select(labels) {
    let label = labels.label;
    this.router.navigate(['home/newLabel/' + label])
  }
  listView() {
    this.data.sendMessage(true);
    this.list = 1;
  }
  gridView() {
    this.data.sendMessage(false);
    this.list = 0;
  }

  selectedFile = null;
  selectFile(event) {
    this.selectedFile = event.path[0].files[0];
    console.log(event.target.value);
    this.ProfilePath = event.target.value;
    console.log(this.selectedFile.name);
  }
  image = {};
  public image2 = localStorage.getItem('imageUrl');
  img = "http://34.213.106.173/" + this.image2;

  Upload() {
    var token = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
    this.myHttpService.httpAddImage('user/uploadProfileImage', uploadData, token).subscribe(res => {
      console.log("url: ", res['status'].imageUrl)
      console.log(this.ProfilePath);
    }, error => {
      console.log(error);
    })
  }
}
