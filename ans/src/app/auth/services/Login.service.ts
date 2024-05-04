import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map } from 'rxjs';
import { Login } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login: any = [
    {
      id: 1,
      type: 'email',
      placeholder: 'email',
      name: 'email',
    },
    {
      id: 2,
      type: 'password',
      placeholder: 'password',
      name: 'password',
    },
  ];

  loginData = (data: Login) => {
    try {
      const res = from(
        this.http.post<any>('http://localhost:3000/LoginUser', data)
      );
      return res;
    } catch (error) {
      return;
    }
  };
}
