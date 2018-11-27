/************************************************************************************************
*  Execution       : 1. default node         cmd> navBar.ts 
*        
*  Purpose         : Navigation Display With The Options Available such as Archive,Trash Reminders
* 
*  @file           : navBar.ts
*  @description    : Title With Header and Menu Dsiplay with all the avilable options.
*  @module         : navBar.ts - This is optional if expeclictly its an npm or local package
*  @author         : KumarAchuth <achuthkumar146@gmail.com>
*  @since          : 20-10-2018
*
*************************************************************************************************/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LabelsComponent } from '../labels/labels.component';
import { MatDialog } from '@angular/material';
import { GlobalSearchService } from '../../core/services/globalSearchService/global-search.service';
import { environment } from '../../../environments/environment';
import { CropImageComponent } from '../crop-image/crop-image.component';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { UserService } from 'src/app/core/services/userServices/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  private token = localStorage.getItem('token');
  private labelArray: any = []
  private model: any = {}
  private ProfilePath: any;
  private globalSearch: any;
  private list = 0;
  private title = "Keep";
  private picture: any;
  private firstName: any;
  private lastName: any;
  private email: any;
  private routerColor;
  isHandset$: Observable<boolean> = this.breakpointObserver.
    observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  constructor(private userService: UserService, private notesService: NotesService,
    private snackBar: MatSnackBar, private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver, private router: Router,
    private dialog: MatDialog, private data: GlobalSearchService) { }
  ngOnInit() {
    this.labelArray = []
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.getLabels();
    this.title=localStorage.getItem('title');
    


  }
  /**
   * @description Title Display Function
   * @param title 
   */
  aptTitle(title) {
    this.title = title;
    localStorage.setItem('title',title)
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
    this.userService.logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
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
    this.notesService.getLabels()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        for (var i = 0; i < data['data']['details'].length; i++) {
          if (data['data']['details'][i].isDeleted == false) {
            newArray.push(data['data']['details'][i])
          }
          else {
          }
        }
        newArray.sort(function (a, b) {
          var A = a.label.toLowerCase(), B = b.label.toLowerCase()
          if (A < B) return -1;
          if (A > B) return 1;
          return 0;
        })
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
  routerColorActive(label){
    this.routerColor=label;
  }
  selectedFile = null;
  private image2 = localStorage.getItem('imageUrl');
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
      this.data.currentMsg.subscribe(message => this.picture = message);
      if (this.picture == true) {
        this.image2 = localStorage.getItem('imageUrl');
        this.img = environment.apiUrl + this.image2;
      }
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
