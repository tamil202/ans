import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/Login.service';
import { Router } from '@angular/router';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private toast: ToastrService,
    private router: Router,
    private loginservice: LoginService
  ) {}

  loginvalue: any = [];
  ngOnInit(): void {
    // Dynamic form
    this.loginvalue = this.loginservice.login;
    this.loginvalue.forEach((element: any) => {
      this.formData.addControl(
        element.name,
        new FormControl('', [Validators.required])
      );
    });
  }

  // dynamic form handling
  formData: FormGroup = new FormGroup({});

  // next button handle
  nextvalue: any = 1;
  next = () => {
    this.nextvalue += 1;
  };
  cancel = () => {
    this.nextvalue -= 1;
  };
  navigate = () => {
    this.router.navigate(['register']);
  };
  forget = () => {
    this.router.navigate(['forgetpassword']);
  };
  submit = () => {
    this.loginservice.loginData(this.formData.value)?.subscribe(
      (res: any) => {
        res.message._previousDataValues.userId
        if (res.status == 404) {
          this.toast.error('Invalid User');
        } else {
          this.toast.success('Login SuccessFully');
          localStorage.setItem('userid', res.message._previousDataValues.userId);
          localStorage.setItem('email', res.message._previousDataValues.email);
          this.router.navigate(['home/auth/home']);
        }
      },
      (error) => {
        return this.toast.error('Invalid User');
      }
    );
  };
}
