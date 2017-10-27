import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { confirmationComponent } from './confirmation.component';

describe('confirmationComponent', () => {
  let component: confirmationComponent;
  let fixture: ComponentFixture<confirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ confirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(confirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
