import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTrashComponent } from './delete-trash.component';

describe('DeleteTrashComponent', () => {
  let component: DeleteTrashComponent;
  let fixture: ComponentFixture<DeleteTrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
