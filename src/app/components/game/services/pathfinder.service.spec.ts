import { TestBed, inject } from '@angular/core/testing';

import { PathfinderService } from './pathfinder.service';

describe('PathfinderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathfinderService]
    });
  });

  it('should be created', inject([PathfinderService], (service: PathfinderService) => {
    expect(service).toBeTruthy();
  }));
});
