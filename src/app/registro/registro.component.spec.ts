import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { registroComponent } from './registro.component';

describe('registroComponent', () => {
  let component: registroComponent;
  let fixture: ComponentFixture<registroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ registroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(registroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
