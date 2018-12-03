import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskQuestionComponent } from './ask-question.component';

describe('QandAComponent', () => {
  let component: AskQuestionComponent;
  let fixture: ComponentFixture<AskQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    let likeArray=[{
      like:Boolean,
      userId:"hgfyuhjfgvhyj78688"
    }]
    let ques={
      like: likeArray
    }
    expect(component.like(ques)).toBeTruthy();
  });


  it('should create', () => {
    let likeArray = [{
      like: String,
      userId: "jyhjyuh546576678768fgf"
    }]
    let ques = {
      like: likeArray
    }
    expect(component.like(ques)).toBeFalsy();
  });


  it('should create', () => {
    let likeArray = [{
      like: Boolean,
      userId: localStorage.getItem('id')
    }]
    let ques = {
      like: likeArray
    }
    expect(component.like(ques)).toBeTruthy();
  });


  it('should create', () => {
    let likeArray = [{
      like: String,
      userId: "jyhjyuh546576678768fgf"
    }]
    let ques = {
      like: likeArray
    }
    expect(component.like(ques)).toBeFalsy();
  });

  it('should create', () =>{
    let body =[{
      "message" : "dshjbgfj",
      "notesId": String
    }]
   expect(component.askQuestion(body)).toBeTruthy()
   let requestBody = {
     "message":"",
     "notesID" : String
   }
   expect(component.askQuestion(requestBody)).toBeFalsy();
  })
  
  it('should create', () => {
  let RequestBody = {
      "message": "anyString",
    }
    expect(component.askQuestion(RequestBody.message.length)).toBeGreaterThan(0);
    let replyBody={
      "message": "anyString", 
    }
    let id =String
    expect(component.replyHere(replyBody,id)).toBeTruthy();
    let reply={
      "message": "", 
    }
    expect(component.replyHere(reply.message.length,id)).toBeLessThanOrEqual(0);
    expect(component.replyHere(reply,id)).toBeFalsy();
  });
});
