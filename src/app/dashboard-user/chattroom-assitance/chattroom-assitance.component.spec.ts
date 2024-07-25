import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChattroomAssitanceComponent } from './chattroom-assitance.component';

describe('ChattroomAssitanceComponent', () => {
  let component: ChattroomAssitanceComponent;
  let fixture: ComponentFixture<ChattroomAssitanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChattroomAssitanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChattroomAssitanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
