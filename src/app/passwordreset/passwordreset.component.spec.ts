import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { passwordresetComponent } from './passwordreset.component';

describe('passwordresetComponent', () => {
  let component: passwordresetComponent;
  let fixture: ComponentFixture<passwordresetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ passwordresetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(passwordresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
