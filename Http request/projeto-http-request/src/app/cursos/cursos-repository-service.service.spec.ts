import { TestBed } from '@angular/core/testing';

import { CursosRepositoryServiceService } from './cursos-repository-service.service';

describe('CursosRepositoryServiceService', () => {
  let service: CursosRepositoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosRepositoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
