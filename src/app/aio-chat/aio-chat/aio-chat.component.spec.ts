import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AioChatComponent } from './aio-chat.component';

describe('AioChatComponent', () => {
  let component: AioChatComponent;
  let fixture: ComponentFixture<AioChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AioChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AioChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
