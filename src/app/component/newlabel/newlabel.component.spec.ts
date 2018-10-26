import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewlabelComponent } from './newlabel.component';

describe('NewlabelComponent', () => {
  let component: NewlabelComponent;
  let fixture: ComponentFixture<NewlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
