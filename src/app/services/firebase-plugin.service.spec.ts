import { TestBed } from '@angular/core/testing';

import { FirebasePluginService } from './firebase-plugin.service';

describe('FirebasePluginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebasePluginService = TestBed.get(FirebasePluginService);
    expect(service).toBeTruthy();
  });
});
