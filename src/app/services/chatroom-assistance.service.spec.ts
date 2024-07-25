import { TestBed } from '@angular/core/testing';

import { ChatroomAssistanceService } from './chatroom-assistance.service';

describe('ChatroomAssistanceService', () => {
  let service: ChatroomAssistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatroomAssistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
