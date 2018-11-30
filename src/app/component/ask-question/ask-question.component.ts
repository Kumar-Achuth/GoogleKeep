import { Component, OnInit,OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from 'src/app/core/services/loggerService/logger.service';
import { QuestionAnswersService } from 'src/app/core/services/questionAnswerServices/question-answers.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  private image = localStorage.getItem('imageUrl')
  private img = environment.apiUrl;
  private profile = environment.apiUrl+this.image;
  private url=this.router.url;
  private title;
  private answer;
  private reply = 0;
  private description : any=[];
  private labelList: any=[];
  private checkList : any=[];
  private isQuestionAsked :any=0;
  private message;
  private liked=0;
  private userReply=0;
  private result;
  private qArray;
  private ownerName;
  private owner;
  private photo; 
  private firstName = localStorage.getItem('firstName');
  private date;
  private parentId;
  private replyArray;
  private askedNote=this.url.split('/')
  constructor(private notesService : NotesService,private router:Router,
    private askService : QuestionAnswersService) { }

  ngOnInit(){     
    this.getAskedNotes();
  }
  getAskedNotes(){   
    this.notesService.getAskedNotes(this.askedNote[3])
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(data => {
      this.result = data['data']['data'][0];
      this.title=this.result.title;
      this.description=data['data']['data'][0].description;
      this.checkList=data['data']['data'][0].checkList;
      this.qArray=this.result["questionAndAnswerNotes"];
      this.replyArray = this.result["questionAndAnswerNotes"][0];
      this.ownerName=this.qArray[0]['user'].firstName;
      this.date = this.result["questionAndAnswerNotes"][0].createdDate;
      if(this.result['questionAndAnswerNotes'][0] != undefined)
      {
       this.message=this.result['questionAndAnswerNotes'][0].message;
       this.parentId=this.result['questionAndAnswerNotes'][0].id;
      }
      LoggerService.log('response',data)
    })
  }
  askQuestion(ask){
    this.askService.askIt({
      "message": ask,
      "notesId": this.askedNote[3]
    })
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(data => {
      LoggerService.log('response', data)
      this.message = ask;
    })
  }
  replyNow(){
    this.reply=1;
  }
  /**
   * @description Like Question Api Call
   */
  like(id){
    this.askService.likeIt(id,{
      "like":true
    })
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(data => {
      LoggerService.log('I am Liked', data)  
    })
  }
  replyBack(){
    this.userReply=1
  }
  /**
   * @description Rating the Question and Answer Api
   */
  rate(item,event){
    this.askService.rateIt(item,{
      "rate":event
    })
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(data => {
      LoggerService.log('I am Rated', data)  
    })
  }
  /**
   * @description Reply For the Question Asked Api
   * @param replyMessage 
   */
  replyHere(replyMessage, id){
    // let id = this.result['questionAndAnswerNotes'][0].id;
    this.askService.replyIt(id,{
      "message":replyMessage
    })
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(data => {
      this.reply=0;
      replyMessage=data["data"]["details"].message;
      this.answer=data["data"]["details"].message;
      LoggerService.log('I am Replied', data)  
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  } 
}
