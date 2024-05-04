import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/Register.service';
import { Router } from '@angular/router';

import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  constructor(
    private registerservice: RegisterService,
    private toast: ToastrService,
    private router: Router
  ) {}
  registervalue: any = [];
  ngOnInit(): void {
    // Dynamic form
    this.registervalue = this.registerservice.resgister;
    this.registervalue.forEach((element: any) => {
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
    this.router.navigate(['login']);
  };

  submit = () => {
    this.registerservice.createData(this.formData.value)?.subscribe(
      (res: any) => {
        this.toast.success(res.message);
        this.router.navigate(['login']);
      },
      (error) => {
        this.toast.error('User Already Exists');
        this.router.navigate(['login']);
      }
    );
  };
}
