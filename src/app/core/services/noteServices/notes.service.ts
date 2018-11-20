import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HttpService } from '../httpServices/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpService) { }
  getUpdatedLabel(id,body){
    return this.http.postUpdatedLabel('/noteLabels/' + id + '/updateNoteLabel',body)
  }
  getLabels(){
    return this.http.getTheLabels('noteLabels/getNoteLabelList')
  }
  deleteLabel(id){
    return this.http.deleteTheLabel('/noteLabels/' + id + '/deleteNoteLabel')
  }


  postNotes(body){
    return this.http.addNotes('notes/addNotes',body)
  }
}
