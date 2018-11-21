import { Component, OnInit, Inject,OnDestroy } from '@angular/core';
import { GlobalSearchService } from '../../core/services/globalSearchService/global-search.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/httpServices/http.service';
import { environment } from '../../../environments/environment';
import { NavbarComponent } from '../navbar/navbar.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 

  private croppedImage: any = '';
  private imageChangedEvent: any = '';
  constructor(
    private dialogRefPic: MatDialogRef<NavbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private myHttpService: HttpService,
    private dataService: GlobalSearchService) { }

  ngOnInit() {
  }
  /**
   * @description Profile Pic Cropping 
   * @param event 
   */
  imageCropped(event: any) {
    this.croppedImage = event.file;
  }
  private image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;
  /**
   * @description Api CAll fro Profile Picture Upload
   */
  onUpload() {
    var token = localStorage.getItem('token');
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.myHttpService.httpAddImage('user/uploadProfileImage',
     uploadData, token)
     .pipe(takeUntil(this.destroy$))
     .subscribe(res => {
      this.img = environment.apiUrl + res['status'].imageUrl;
      localStorage.setItem("imageUrl", res['status'].imageUrl);
      this.dialogRefPic.close()
      this.dataService.changeMsg(true);
    }, error => {
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
}
}

