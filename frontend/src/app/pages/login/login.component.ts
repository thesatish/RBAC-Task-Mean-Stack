import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  loginForm: FormGroup;
  errorMsg: string = "";

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder, private toastService: ToastService,) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.login();
    }
  }

  login() {
    this.authService.loginUser(this.loginForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastService.showToast('success', "Login Success...", "", 1000);
        }
        if (res.data.data.token) {
          this.router.navigate(['/dashboard']);
        } else {
          // this.router.navigate(['/user/login']);
        }
      },
      (err: any) => {
        this.errorMsg = err.message || "Server maintenance. Please try again later";
        this.toastService.showAlert('error', '', this.errorMsg);
      }
    );
  }



}
