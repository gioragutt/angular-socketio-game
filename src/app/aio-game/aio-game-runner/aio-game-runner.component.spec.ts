import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AioGameRunnerComponent } from './aio-game-runner.component';

describe('AioGameRunnerComponent', () => {
  let component: AioGameRunnerComponent;
  let fixture: ComponentFixture<AioGameRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AioGameRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AioGameRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
