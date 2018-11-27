import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Form is valid', async(()=>{
    (component.model.FirstName).setValue("Kumar")
    (component.model.LastName).setValue("Achuth")
    (component.model.FirstName).setValue("Kumar")
    (component.model.LastName).setValue("Achuth")
    (component.model.Email).setValue("achuth@xyz.com")
    (component.model.password).setValue("aa")
    (component.model.password).setValue("A@aaaaaa")
    expect(component.model.Email).toBeTruthy();
  }))
  it('Form is not valid', async(()=>{
    (component.model.FirstName).setValue("")
    (component.model.LastName).setValue("")
    (component.model.FirstName).setValue("")
    (component.model.LastName).setValue("")
    (component.model.Email).setValue("")
    (component.model.password).setValue("")
    (component.model.password).setValue("")
    (component.model.Email).toBeFalsy();
  }))
});
