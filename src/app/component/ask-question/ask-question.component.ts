import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private profile = environment.apiUrl + this.image;
  private url = this.router.url;
  private title;
  private answer;
  private reply = 0;
  private description: any = [];
  private labelList: any = [];
  private checkList = [];
  private isQuestionAsked: any = 0;
  private message;
  private liked = 0;
  private userReply = 0;
  private result;
  private qArray;
  private ownerName;
  private owner;
  private photo;
  private firstName = localStorage.getItem('firstName');
  private date;
  private parentId;
  private replyArray;
  private showIt = false;
  private hideThem = 0;
  public editorContent: string
  private askedNote = this.url.split('/')
  constructor(private notesService: NotesService, private router: Router,
    private askService: QuestionAnswersService) { }

  ngOnInit() {
    console.log();
    this.getAskedNotes();
  }
  public options: Object = {
    charCounterCount: false,
    toolbarButtons: 	['fullscreen', 'bold', 'italic', 'underline', '|','fontSize', 'color', 'inlineClass', 'inlineStyle', 'paragraphStyle', 'lineHeight', '|',
     'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote',  '|', 'emoticons', 'fontAwesome',
     'specialCharacters', 'selectAll', 'clearFormatting', '|', 'undo', 'redo'],
    toolbarButtonsXS: ['undo', 'redo' , '-', 'bold', 'italic', 'underline']

  };
  viewReply() {
    this.showIt = true;
    this.hideThem = 1;
  }
  hideReply() {
    this.showIt = false;
    this.hideThem = 0;
  }
  /**
   * @description Get The Question Asked and Note
   */
  getAskedNotes() {
    this.notesService.getAskedNotes(this.askedNote[3])
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.result = data['data']['data'][0];
        this.title = this.result.title;
        this.description = data['data']['data'][0].description;
        this.qArray = this.result["questionAndAnswerNotes"];
        this.replyArray = this.result["questionAndAnswerNotes"][0];
        if (this.result['questionAndAnswerNotes'][0] != undefined) {
          this.message = this.result['questionAndAnswerNotes'][0].message;
          this.parentId = this.result['questionAndAnswerNotes'][0].id;
        }
        for (var i = 0; i < data['data']['data'][0].noteCheckLists.length; i++) {
          if (data['data']['data'][0].noteCheckLists[i].isDeleted == false) {
            this.checkList.push(data['data']['data'][0].noteCheckLists[i])
          }
        }
        LoggerService.log('response', data)
      })
  }
  /**
   * @description Post Question Api call
   * @param ask 
   */
  askQuestion() {
    let displayQuestion = {
      "message": this.editorContent,
      "notesId": this.askedNote[3]
    }
    this.askService.askIt(displayQuestion)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('response', data)
        this.message = this.editorContent;
        this.getAskedNotes();
      })
  }
  replyNow() {
    this.reply = 1;
  }
  /**
   * @description Like Question Api Call
   */
  like(id) {
    this.askService.likeIt(id, {
      "like": true
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        LoggerService.log('I am Liked', data)
      })
  }
  replyBack() {
    this.userReply = 1
  }
  /**
   * @description Rating the Question and Answer Api
   */
  rate(item, event) {
    this.askService.rateIt(item, {
      "rate": event
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
  replyHere(replyMessage, id) {
    // let id = this.result['questionAndAnswerNotes'][0].id;
    this.askService.replyIt(id, {
      "message": replyMessage
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.reply = 0;
        replyMessage = data["data"]["details"].message;
        this.answer = data["data"]["details"].message;
        LoggerService.log('I am Replied', data)
        this.getAskedNotes();

      })
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
