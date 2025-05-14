import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from '../shared/shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule, provideRouter } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['logout'], {
      isLoggedIn: signal(true)
    });

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],imports:[CommonModule,RouterModule, SharedModule],providers:[provideHttpClient(),provideRouter([])],schemas:[CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
