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
likeIt(parentId,body){
  return this.http.postJSON('questionAndAnswerNotes/like/'+parentId+'',body)
}
rateIt(parentId,body){
  return this.http.postJSON('questionAndAnswerNotes/rate/'+parentId+'',body)
}
replyIt(parentId,body){
  return this.http.postJSON('questionAndAnswerNotes/reply/'+parentId+'',body)
}
}
