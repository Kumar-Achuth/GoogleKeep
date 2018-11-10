import { Component, OnInit, Inject } from '@angular/core';
import { GlobalSearchService } from '../../core/services/globalSearchService/global-search.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpService } from '../../core/services/httpServices/http.service';
import { environment } from '../../../environments/environment';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit {

  public croppedImage: any = '';
  imageChangedEvent: any = '';
  constructor(
    public dialogRefPic: MatDialogRef<NavbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private myHttpService: HttpService,
    private dataService: GlobalSearchService) { }

  ngOnInit() {
  }
  imageCropped(event: any) {
    this.croppedImage = event.file;
  }


  public image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;


  onUpload() {
    var token = localStorage.getItem('token');
    console.log(this.croppedImage);
    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this.myHttpService.httpAddImage('user/uploadProfileImage', uploadData, token).subscribe(res => {
      this.img = environment.apiUrl + res['status'].imageUrl;
      localStorage.setItem("imageUrl", res['status'].imageUrl);
      this.dialogRefPic.close()
      this.dataService.changeMsg(true);
    }, error => {


    })

  }

}

