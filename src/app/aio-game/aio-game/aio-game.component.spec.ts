import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AioGameComponent } from './aio-game.component';

describe('AioGameComponent', () => {
  let component: AioGameComponent;
  let fixture: ComponentFixture<AioGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AioGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AioGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
