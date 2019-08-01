import { TestBed, async, inject } from '@angular/core/testing';

import { UserpremiumGuard } from './userpremium.guard';

describe('UserpremiumGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserpremiumGuard]
    });
  });

  it('should ...', inject([UserpremiumGuard], (guard: UserpremiumGuard) => {
    expect(guard).toBeTruthy();
  }));
});
