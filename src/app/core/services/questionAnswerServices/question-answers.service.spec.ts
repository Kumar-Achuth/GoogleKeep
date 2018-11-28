import { TestBed } from '@angular/core/testing';

import { QuestionAnswersService } from './question-answers.service';

describe('QuestionAnswersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionAnswersService = TestBed.get(QuestionAnswersService);
    expect(service).toBeTruthy();
  });
});
