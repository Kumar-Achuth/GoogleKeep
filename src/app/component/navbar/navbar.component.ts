import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../core/services/httpServices/http.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import { MatDialog } from '@angular/material';
import { GlobalSearchService } from '../../core/services/globalSearchService/global-search.service';
import { environment } from '../../../environments/environment';
import { CropImageComponent } from '../crop-image/crop-image.component';


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
  title = "Keep";
  public picture: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.
    observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private myHttpService: HttpService, private snackBar: MatSnackBar,
    public route: ActivatedRoute, private breakpointObserver: BreakpointObserver,
    private router: Router, public dialog: MatDialog, public data: GlobalSearchService) {}
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
  aptTitle(title){
    this.title=title;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LabelsComponent, {
      width: '250px',
      height: 'fit-content',
      backdropClass: '',
      data: ''
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getLabels();
    });
  }
  /**
    * @description Api call for Logout 
    */
  doLogout() {
    console.log(this.token);
    this.myHttpService.postLogout('user/logout', this.token).subscribe(() => {
      this.snackBar.open("Logout ", "Successful", {
        duration: 1000
      });
      localStorage.removeItem('token');
      localStorage.removeItem('firstName');
      localStorage.removeItem('email');
      localStorage.removeItem('lastName');
      localStorage.removeItem('userId');
      this.router.navigateByUrl('/login');
    }, () => {
      })
  }
/**
 * @description Api call to get all the labels in the notes
 */
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
  public image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;
/**
 * @description Function to select the required Path for image selection 
 * @param event 
 */
  onFileUpload(event) {
    this.profileCropOpen(event);
    this.selectedFile = event.path[0].files[0];
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);
  }
  image = {};
  /**
   * @description Profice Picture Dialaog Box Open function 
   * @param data 
   */
  profileCropOpen(data): void { 
    const dialogRefPic = this.dialog.open(CropImageComponent, {
      width: '450px',
      data: data
    });
    dialogRefPic.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.data.currentMsg.subscribe(message => this.picture = message);
      console.log("pic", this.picture);
      if (this.picture == true) {
        this.image2 = localStorage.getItem('imageUrl');
        this.img = environment.apiUrl + this.image2;
      }
    });
  }
}
