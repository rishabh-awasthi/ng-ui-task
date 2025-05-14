import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { signal } from '@angular/core';

describe('ApiService', () => {
  let mockApiService: jasmine.SpyObj<ApiService>;
  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['logout'], {
      isLoggedIn: signal(true)
    });

  
    TestBed.configureTestingModule({ providers: [{ provide: ApiService, useValue: mockApiService }]
    });
  });

  it('should be created', () => {
    expect(mockApiService).toBeTruthy();
  });
});
