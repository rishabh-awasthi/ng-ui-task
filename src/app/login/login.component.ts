import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../shared/services/api.service';

import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (this.apiService.checkLoggedIn()) this.router.navigate(["/dashboard"]);

    this.loginForm = this.fb.group({
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['cityslicka', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) return;
    this.spinnerService.show();
    const { email, password } = this.loginForm.value;

    this.apiService.login(email, password).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.spinnerService.hide();
        if (res?.token) {
          this.apiService.setTokenAndEmail(res?.token, email);          
          console.log('Login successful');
          this.router.navigate(['/dashboard']);
        }
        this.error = '';
      } else {
        this.spinnerService.hide();
        this.error = 'Invalid credentials';
      }
    });
  }
}
