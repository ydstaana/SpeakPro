import { TestBed, async, inject } from '@angular/core/testing';

import { ComponentGuard } from './component.guard';

describe('ComponentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentGuard]
    });
  });

  it('should ...', inject([ComponentGuard], (guard: ComponentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
