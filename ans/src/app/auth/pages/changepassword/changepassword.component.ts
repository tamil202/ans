import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { ForgetService } from '../../services/ForgetPassword.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './changepassword.component.html',
})
export class ChangepasswordComponent {
  constructor(
    private forgetpasswordservice: ForgetService,
    private router: Router,
    private toast: ToastrService
  ) {}
  // Dynameic form handle
  formData: FormGroup = new FormGroup({});

  emailpassword: any = ['password', 'confirmpassword'];
  ngOnInit(): void {
    this.emailpassword.forEach((element: any) => {
      this.formData.addControl(
        element,
        new FormControl('', [Validators.required])
      );
    });
  }
  pass: boolean = true;
  cnf: boolean = false;
  next = () => {
    this.pass = false;
    this.cnf = true;
  };
  cancel = () => {
    this.pass = true;
    this.cnf = false;
  };
  error: boolean = false;
  submit = () => {
    if (
      this.formData.get('password')?.value ===
      this.formData.get('confirmpassword')?.value
    ) {
      this.forgetpasswordservice.updatepassword(this.formData.value)?.subscribe(
        (res) => {
          this.toast.success('password updated'),
            this.router.navigate(['login']);
        },
        (error) => this.toast.error('some thing went wrong')
      );
    } else {
      this.error = true;
    }
  };
}
