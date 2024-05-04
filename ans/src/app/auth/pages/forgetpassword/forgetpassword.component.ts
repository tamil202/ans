import { Component, OnInit } from '@angular/core';
import { ForgetService } from '../../services/ForgetPassword.service';
import { Router } from '@angular/router';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
})
export class ForgetpasswordComponent {
  constructor(
    private toast: ToastrService,
    private router: Router,
    private forgetservice: ForgetService
  ) {}

  Forgetvalue: any = [];
  ngOnInit(): void {
    // Dynamic form
    this.Forgetvalue = this.forgetservice.Forget;
    this.Forgetvalue.forEach((element: any) => {
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
    this.forgetservice.verifiyemail(this.formData.value)?.subscribe(
      (res) => {
        this.nextvalue += 1;
        this.toast.success('OTP send our Mail');
      },
      (error) => {
        this.toast.error('No User Found');
      }
    );
  };
  cancel = () => {
    this.nextvalue -= 1;
  };
  verifiy = () => {
    this.forgetservice.verifiyOtp(this.formData.value)?.subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.router.navigate(['changepassword']);
          this.toast.success(res.message);
        } else {
          return res.error('Invalid');
        }
      },
      (error) => {
        this.toast.error('Invaild OTP');
      }
    );
  };
}
