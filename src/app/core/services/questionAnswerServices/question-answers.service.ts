import { Injectable } from '@angular/core';
import { HttpService } from '../httpServices/http.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionAnswersService {

  constructor(private http: HttpService) { }
/********************************Question And Answers Services********************** */
askIt(body){
  return this.http.postJSON('questionAndAnswerNotes/addQuestionAndAnswer',body)
}
}
