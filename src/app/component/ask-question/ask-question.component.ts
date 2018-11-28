import { Component, OnInit,OnDestroy } from '@angular/core';
import { NotesService } from 'src/app/core/services/noteServices/notes.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from 'src/app/core/services/loggerService/logger.service';
import { QuestionAnswersService } from 'src/app/core/services/questionAnswerServices/question-answers.service';
@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  private url=this.router.url;
  private title;
  private description : any=[];
  private labelList: any=[];
  private checkList : any=[];
  private isQuestionAsked :any=0;
  private message ;
  private result;
  private askedNote=this.url.split('/')
  constructor(private notesService : NotesService,private router:Router,
    private askService : QuestionAnswersService) { }

  ngOnInit() {     
    this.getAskedNotes();
  }
  getAskedNotes(){
    
    this.notesService.getAskedNotes(this.askedNote[3])
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(data => {
      this.result = data['data']['data'][0];
      this.title=this.result.title;
      this.description=data['data']['data'][0].description;
      this.labelList=data['data']['data'][0].noteLabels[0].label
      this.checkList=data['data']['data'][0].checkList;
      if(this.result['questionAndAnswerNotes'][0] != undefined)
      {
       this.message=this.result['questionAndAnswerNotes'][0].message;
      }
      LoggerService.log('response',data)
    })
  }
  askQuestion(ask){
    this.askService.askIt({
      "message": ask,
      "notesId": this.askedNote[3]
    })
    .subscribe(data => {
      LoggerService.log('response', data)
      this.message = ask;
    })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  } 
}
