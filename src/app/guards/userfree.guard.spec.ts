import { TestBed, async, inject } from '@angular/core/testing';

import { UserfreeGuard } from './userfree.guard';

describe('UserfreeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserfreeGuard]
    });
  });

  it('should ...', inject([UserfreeGuard], (guard: UserfreeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
