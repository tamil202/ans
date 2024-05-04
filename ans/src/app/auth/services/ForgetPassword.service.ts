import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map } from 'rxjs';
import { Login, Password } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class ForgetService {
  constructor(private http: HttpClient) {}

  Forget: any = [
    {
      id: 1,
      type: 'email',
      placeholder: 'email',
      name: 'email',
    },
    {
      id: 2,
      type: 'text',
      placeholder: 'Enter OTP',
      name: 'otp',
    },
  ];

  email: any = '';
  verifiyemail = (data: Login) => {
    const { email } = data;
    try {
      this.email = email;
      const res = from(
        this.http.post<any>('http://localhost:3000/forgetpassword', data)
      );
      return res;
    } catch (error) {
      return;
    }
  };

  verifiyOtp = (data: Login) => {
    try {
      const res = from(
        this.http.post<any>('http://localhost:3000/verifiyotp/verify', data)
      );
      return res;
    } catch (error) {
      return;
    }
  };

  updatepassword = (data: Password) => {
    const { password, confirmpassword } = data;
    let value: Password = {
      email: this.email,
      password,
      confirmpassword,
    };
    try {
      return this.http
        .post<any>(`http://localhost:3000/updatepassword/update`, value)
        .pipe(
          map((e) => {
            return e;
          })
        );
    } catch (error) {
      return;
    }
  };
}
